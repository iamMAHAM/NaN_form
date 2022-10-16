<template>
  <Modal ref="modal"/>
  <div class="profile-container">
    <Loader v-if="iLoad"/>
    <div class="main-container" v-if="!iLoad">
      <div class="profile-content" v-if="!iLoad">
        <div class="profile-img">
          <img :src="user?.avatar" />
          <div class="name">
            <h2>{{ user?.fullName }}</h2>
            <span>{{ role }}</span>
            <span>{{ verified }}
              <i class="material-symbols-outlined verified"
              style="vertical-align: middle"
              v-if="user?.isVerified"
            >
              verified
            </i>
          </span>
          </div>
        </div>
        <div v-if="infos">
          <button
            class="edit"
            @click="editProfile"
          >
            <span
              style="
                vertical-align: middle;
                margin: 0;
                color: var(--white);
                font-size: 1.7rem;
              "
            >
              {{ rightText}}
            </span>
            <i
              class="material-symbols-outlined"
            >
              {{ rightIcon }}
            </i>
          </button>
          <button
            class="edit"
            v-if="flag"
            @click="cancel"
          >
            <span
              style="
                vertical-align: middle;
                color: var(--white);
                margin: 0;
                font-size: 1.7rem;
              "
            >
              Annuler
            </span>
            <i class="material-symbols-outlined" style="color: var(--red);">close</i>
          </button>
    
        </div>
        <button v-if="home && user?.isAwaitingVerification && !user.isVerified">
          vérification en cours...
    
          <Loader :view="1" :height="15" :width="15"/>
        </button>
        <button
            class="edit"
            v-if="home && !user.isVerified && !user?.isAwaitingVerification" 
            @click="verifyUser"
          >
            <span
              style="
                vertical-align: middle;
                color: var(--white);
                margin: 0;
                font-size: 1.7rem;
              "
            >
              {{ verify ? 'Annuler' : 'Verifier Identité'}}
            </span>
            <i class="material-symbols-outlined"
              :style="{
                color: verify ? 'red' : 'var(--greenfun)'
              }"
            >
              {{ verify ? 'close' :  'fingerprint'}}
            </i>
        </button>
        <button
            class="edit"
            v-if="home && user.isVerified && isLogged" 
            @click="like"
          >
            <span
              style="
                vertical-align: middle;
                color: var(--white);
                margin: 0;
                font-size: 1.7rem;
              "
            >
              {{ !isLiked ? 'j\'aime' : 'j\'aime déjà'}}
            </span>
            <i class="material-symbols-outlined"
              :style="{
                color: !isLiked ? 'var(--greenfun)' : 'red'
              }"
            >
              {{ !isLiked ? 'thumb_up_off' :  'thumb_down'}}
            </i>
        </button>
      </div>
      <!-- break -->
      <hr class="break" v-if="!iLoad"/>
      <div class="body-content" v-if="!iLoad">
        <ul @click="rightRoute" ref="routes" class="routes" v-if="showRoutes">
          <li class="home active">
            <i class="material-symbols-outlined">home</i>
            <a href="#">Accueil</a>
          </li>
          <li class="ad" v-if="role !== 'customer'">
            <i class="material-symbols-outlined">ads_click</i>
            <a href="#">Annonces</a>
          </li>
          <li  class="info">
            <i class="material-symbols-outlined">info</i>
            <a href="#">Informations</a>
          </li>
        </ul>
        <!-- <div class="main-title">
          <p>Derniere vue</p>
          <p>Aujoudhui à 15h</p>
        </div> -->
        <div class="main" ref="main">
          <div class="homes" v-if="home">
            <div class="card bg-dark" style="cursor: normal">
              <p>Annonces publiées</p>
              <p class="num">{{ cards?.length}}</p>
            </div>
            <div class="card bg-dark" style="cursor: normal">
              <p>J'aimes</p>
              <p class="num">{{ user?.likes?.length || 0}}</p>
            </div>
          </div>
          <div class="ads" v-if="ads" @click="rightFilter">
            <div class="card bg-dark">
              <p title="">Total</p>
              <p class="num">{{ all?.length }}</p>
            </div>
            <div class="card">
              <p title="online">En ligne</p>
              <p class="num">{{ online }}</p>
            </div>
            <div class="card">
              <p title="solded">Soldés</p>
              <p class="num">{{ solded }}</p>
            </div>
            <div class="card">
              <p title="pending">En attente</p>
              <p class="num">{{ pending }}</p>
            </div>
          </div>
          <div v-if="home && verify" class="verify">
            <userVerification :flagged='user?.isAwaitingVerification || user.isVerified'/>
          </div>
        </div>
        <section class="myads" v-if="ads">
          <CardContainer
            :cards="cards"
            :load="load"
            :message="'Rien à Signaler ici ...'"
          />
        </section>
        <section class="myinfos" v-if="infos">
          <Uprofile
            :form="user"
            @changePass="updatePass"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import CardContainer from '@/components/CardContainer.vue';
import Uprofile from '@/components/partials/user/Uprofile.vue'
import Loader from '@/components/partials/Loader.vue';
import userVerification from '@/components/partials/user/userVerification.vue';
import { auth, find, findOne, updateOne } from '@/lib/firestoreLib';
import { collection, doc, onSnapshot } from '@firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { updatePassword } from '@firebase/auth';
import Modal from '@/components/partials/Modal.vue';

export default {
  name: 'Profile',
  components:{
    CardContainer,
    Uprofile,
    Loader,
    userVerification,
    Modal
  },
  props:['isLogged', 'searchData'],
  data(){
    return {
      backup: null,
      user: null,
      cards: [],
      all: [],
      iLoad: true,
      load: true,
      infos: false,
      ads: false,
      home: true,
      pass: '',
      flag: false,
      verify: false
    }
  },
  async mounted(){
    await new Promise(r=>setTimeout(r, 1000))
    const id = this.$route.query.id
    if (id && auth?.currentUser?.uid !== id){
      findOne("users", this.$route.query.id)
      .then(async user=>{
        this.user = user
        this.iLoad = false
      })
      .then(
        find(`users/${id}/ads`)
        .then(ads=>this.cards = [...ads])
      )
    }
    else{
      this.fetchData(auth?.currentUser?.uid)
      onSnapshot(doc(db, "users", auth?.currentUser?.uid), (snap)=>{
        this.user = snap.data()
        this.backup = {...this.user}
        this.iLoad = false
      })
    }
  },
  methods:{
    async fetchData(id){
      onSnapshot(collection(db, `users/${id}/ads`), (snap)=>{
        const inter = []
        snap.docs.map(d=>inter.push({...d.data(), id: d.id}))
        this.all = inter
        this.cards = inter
        this.load = false
      })
    },
    rightRoute(e){
      const target = e.target.closest("li")
      const classs = target.classList[0] + 's'
      const els = this.$refs.routes.children
      Array.from(els).map(e=>e.classList.remove("active"))
      target.classList.add("active")
      this.ads = classs === 'ads'
      this.home = classs === "homes"
      this.infos = classs === "infos"
    },
    rightFilter(e){
      try{
        const target = e.target.closest(".card")
        const els = target.closest(".ads")
        Array.from(els.children).map(e=>e.classList.remove("bg-dark"))
        this.cards = this.filteringCards(target.firstChild.title)
        target.classList.add("bg-dark")
      } catch(e){}
    },
    filteringCards(v){
      return this.all.filter(c=> c.status.includes(v))
    },
    editProfile(e){
      this.flag = !this.flag
      const fields = document.querySelector("#fields")
      fields.style.pointerEvents = this.flag ? 'auto' : 'none'
      if (!this.flag){
        this.pass
        ? updatePassword(auth?.currentUser, this.pass)
          .catch(e=>{
            this.$refs.modal.show({
              type: 'error',
              title: 'Erreur',
              display: false,
              errorMessage: e.code ? e.code : e?.message,
          })
          })
        : updateOne("users", this.user?.id, this.user)
      }
    },
    updatePass(pass){
      this.pass = pass
    },
    cancel(){
      this.user = {...this.backup}
      this.flag = false
      document.querySelector("#fields").style.pointerEvents = "none"
    },
    verifyUser(){
      this.verify = !this.verify
    },
    like(){
     if (this.isLiked){
      this.user.likes = this.user.likes.filter(l => l !== auth?.currentUser?.uid)
     }else{
      this.user.likes.push(auth?.currentUser?.uid)
     }
      updateOne("users", this.user.id, {
        likes: this.user.likes
      }).then(()=>{
        this.$refs.modal.show({
          title: 'Like',
          type: 'info',
          display: false,
          message: 'Success'
        })
      })
    }
  },
  computed:{
    role(){
      return this.user.role || 'customer'
    },
    pending(){
      return this.all.filter(c=>c.status === 'pending').length
    },
    online(){
      return this.all.filter(c=>c.status === 'online').length
    },
    solded(){
      return this.all.filter(c=> c.status === 'solded').length
    },
    verified(){
      return this.user?.isVerified ? 'vérifié' : 'non vérifié'
    },
    rightIcon(){
      return this.flag ? 'save' : 'edit_square'
    },
    rightText(){
      return this.rightIcon === 'save'
      ? 'Valider'
      : 'Modifier'
    },
    showRoutes(){
      return this.user?.id === auth?.currentUser?.uid
    },
    isLiked(){
      return this.user?.likes?.includes(auth?.currentUser?.uid)
    }
  }
}
</script>

<style>

.profile-container{
  min-height: 100vh;
}
.myads div.card-container{
  background: var(--hovercolor);
  margin: 2rem auto;
  width: 100%;
  flex-direction: column;
}
.myads .card-container .box{
  display: flex;
  margin: 1rem auto;
  width: 90%;
}

.myads .card-container .box .top{
  width: calc(50%);
  height: unset;
}

.body-content .routes > li.active {
  color: var(--navcolor);
  font-size: 16px;
  font-weight: bold;
}


.body-content .routes li :nth-child(1){
  display: none;
}

.homes,
.main .ads{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2%;
}

.myads .card-container .box .top img{
  min-height: 100%;
}

.material-symbols-outlined{
  vertical-align: middle;
}

@media only screen and (max-width: 942px){
  .myads .card-container .box{
    flex-direction: column;
  }
  .body-content{
    margin: 1rem 1.5rem;
  }
  .homes,
  .main .ads{
    gap: .2rem;
    /* flex-direction: column; */
  }

  .homes .card,
  .main .ads .card{
    text-align: center;
    width: 40% !important;
    padding: 1rem;
  }

  .myads .card-container .box .top{
    height: calc(40%);
    width: unset;
  }
}
@media only screen and (max-width: 570px){
  .homes .card,
  .main .ads .card{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: .5rem;
  }

  .main-container{
    width: 95vw !important;
  }
  .name *{
    font-size: 1.5rem;
  }

  /* .body-content .routes{
    justify-content: center !important;
  } */

  .body-content .routes li a{
    display: none;
  }
  .body-content .routes li :nth-child(1){
    display: block;
  }
}
</style>
<style scoped>
.main-container {
  background-color: #fff;
  margin: 21rem auto;
  width: 70vw;
  max-width: 100%;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 3px 5px 2px rgba(212, 208, 208, 0.2);
}
.profile-content {
  margin: auto;
  display: flex;
  width: 100%;
  margin: 1rem 2.5rem;
  justify-content: space-between;
  align-items: center;
}
.body-content {
  height: 100%;
  margin: 1rem 2.5rem;
}
.profile-img {
  display: flex;
  align-items: center;
}

button {
  width: 160px;
  height: 50px;
  transform: translate(-30%, -30%);
  background-color: var(--navcolor);
  color: #fff;
  border-radius: 5px;
  border: none;
}

.profile-img img {
  width: 70px;
  border: none;
  border-radius: 50%;
  height: 70px;
  margin-right: 1rem;
}
span {
  color: gray;
  margin-right: 8px;
}
span:hover {
  color: var(--navcolor);
  cursor: pointer;
}
.break {
  width: 85%;
  margin: 20px 7.4% 0;
  opacity: 0.5;
}

.body-content .routes{
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.body-content .routes > li {
  pointer-events: all;
  list-style: none;
  margin: 1rem;
}
li{
  color: darkgray;
  font-size: 14px;
}

li a{
  color: inherit;
}
a:hover {
  color: var(--navcolor);
  text-decoration: wavy;
  border-bottom: .1rem solid var(--hovercolor);
}

/* card */
.card {
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid whitesmoke;
  padding: 1.2rem;
  width: 20%;
  border-radius: 1rem;
  cursor: pointer;
}
.card:hover {
  background-color: var(--navcolor);
  color: #fff;
  border: none;
  box-shadow: 1px 2px 3px rgba(212, 208, 208, 0.2);
}
.card p {
  margin: 0;
}
.card .num {
  font-size: 1.5rem;
}
.main .bg-dark {
  background-color: var(--navcolor);
  color: #fff;
  border: none;
  box-shadow: 1px 2px 3px rgba(212, 208, 208, 0.2);
}

.card-container{
  margin: 2rem auto;
}

.edit{
  cursor: pointer;
}

.verify{
  margin-top: 1.5rem;
  text-align: center;
}
</style>