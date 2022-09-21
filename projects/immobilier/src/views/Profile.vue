<template>
  <div class="main-container">
  <div class="profile-content">
    <div class="profile-img">
      <img :src="user.avatar" />
      <div class="name">
        <h2>{{ user.fullName }}</h2>
        <span>{{ user.role }}</span>
        <span>{{ verified }}
          <i class="material-symbols-outlined verified"
          style="vertical-align: middle"
          v-if="user.isVerified"
        >
          verified
        </i>
      </span>
      </div>
    </div>
    <!-- <button class="edit">
    <i class="fas fa-edit"></i>
    Edit
    </button> -->
  </div>
  <!-- break -->
  <hr class="break" />
  <div class="body-content">
    <ul @click="rightRoute" ref="routes" class="routes">
      <li class="home active">
        <i class="material-symbols-outlined">home</i>
        <a href="#">Accueil</a>
      </li>
      <li class="ad">
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
        <div class="card bg-dark">
          <p>Annonces publiés</p>
          <p class="num">1212</p>
        </div>
        <div class="card bg-dark">
          <p>Popularité</p>
          <p class="num">422</p>
        </div>
        <div class="card bg-dark">
          <p>Page Likes</p>
          <p class="num">11</p>
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
          <p title="sold">Soldés</p>
          <p class="num">{{ solded }}</p>
        </div>
        <div class="card">
          <p title="pending">En attente</p>
          <p class="num">{{ pending }}</p>
        </div>
      </div>
    </div>
    <section class="myads" v-if="ads">
      <CardContainer
        @mounted="fetchData"
        :cards="cards"
        :load="load"
        :message="'Rien à Signaler ici ...'"
      />
    </section>
    <section class="myinfos" v-if="infos">
      <Uprofile />
    </section>
  </div>
</div>
</template>

<script>
import CardContainer from '@/components/CardContainer.vue';
import Uprofile from '@/components/partials/user/Uprofile.vue'
import { auth, findOne } from '@/lib/firestoreLib';
import { collection, onSnapshot } from '@firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export default {
  name: 'Profile',
  components:{
    CardContainer,
    Uprofile
  },
  data(){
    return {
      user: {},
      cards: [],
      all: [],
      load: true,
      infos: false,
      ads: false,
      home: true
    }
  },
  async mounted(){
    await new Promise(r=>setTimeout(r, 1000))
    findOne("users", auth?.currentUser?.uid)
    .then(userData=>{
      this.user = {...userData}
    })
  },
  methods:{
    async fetchData(){
      onSnapshot(collection(db, `users/${auth?.currentUser?.uid}/ads`), (snap)=>{
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
      const target = e.target.closest(".card")
      const els = target.closest(".ads")
      Array.from(els.children).map(e=>e.classList.remove("bg-dark"))
      this.cards = this.filteringCards(target.firstChild.title)
      target.classList.add("bg-dark")
    },
    filteringCards(v){
      return this.all.filter(c=> c.status.includes(v))
    }
  },
  computed:{ 
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
      return this.user.isVerified ? 'vérifié' : 'non vérifié'
    }
  }
}
</script>

<style>
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


.material-symbols-outlined{
  vertical-align: middle;
}

@media only screen and (max-width: 942px){
  .myads .card-container .box{
    flex-direction: column;
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
}
</style>
<style scoped>
.main-container {
  background-color: #fff;
  margin: 10rem auto;
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
</style>