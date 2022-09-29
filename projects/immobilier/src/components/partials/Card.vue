<template>
    <div class="box" :id="card.id">
      <div class="top" @click="handleClick">
        <span v-if="solded" class="soldout">Vendu</span>
        <img :src="card?.images[0] || getImage('assets/home.svg')"/>
        <i
          v-if="!admin && !profile && !card?.isLoad"
          :class="`material-symbols-outlined favs ${card?.isFav ? 'active' : ''}`"
          @click="handleFav"
        >
          {{ rightIcone }}
        </i>
        <i
          v-if="profile"
          :class="`material-symbols-outlined favs`"
          @click="deleteAds"
        >
          delete
        </i>
        <i
          v-if="profile && !solded &&!pending"
          :class="`material-symbols-outlined solded`"
          @click="soldeAds"
        >
          check_circle
        </i>
        <Loader :view="2" :height="24" :width="24" class="favs" :color="'var(--red)'" v-if="card?.isLoad"/>
      </div> 
      <div class="bottom">
        <h3>
          {{ !isPlan ?  title  + ' || ' + location : 'Plan de Maison'}}
        </h3>
        <p>
         {{ card.description.replace(card.description.substring(70), '...').toLowerCase()}}
        </p>
        <div class="advants">
          <div v-if="card?.type === 'maison'">
            <span>Chambres</span>
            <div>
              <i class="material-symbols-outlined">bed</i>
              <span>3</span>
            </div>
          </div>
          <div v-if="card?.type === 'maison'">
            <span>Bain</span>
            <div>
              <i class="material-symbols-outlined">bathroom</i>
              <span>{{ card?.options?.salle || 1}}</span>
            </div>
          </div>
          <div>
            <span>Superficie</span>
            <div>
              <i class="material-symbols-outlined">grass</i>
              <span>{{ card?.area}}<span>m²</span></span>
            </div>
          </div>
        </div>
        <div class="price">
          <span v-if="!isPlan">En {{ card?.proposition }}</span>
          <span v-else>Devis à partir de :</span>
          {{ card?.proposition === "location" ? 'Loyer : ': ''}}
          <span>{{ card?.price?.toLocaleString('ci') }}</span> FCFA
          <div class="buttonss" v-if="admin">
            <i
              class="material-symbols-outlined"
              @click="validate"
              title="valider"
              style="color: var(--greenfun)"
            >
              check_circle
            </i>
            <i
              class="material-symbols-outlined"
              @click="del"
              title="refuser"
              style="color: var(--red)"
            >
              delete
            </i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { abortPost, auth, deleteOne, soldeAd, unValidateAd, validateAd } from '@/lib/firestoreLib'
import Loader from './Loader.vue'

export default {
  name: 'Card',
  props: ['card', 'req'],
  components: {Loader},
  methods:{
    handleClick(e){
      if (e.target.className !== 'top') return
      if (this.$route.path.includes('admin/dashboard')){
        this.$router.push(`/details/${this.card.type}/${this.card.id}?tempId=${this.card.tempId}`)
      }else{
        this.$router.push(`/details/${this.card.type}/${this.card.id}`)
      }
    },
    handleFav(e){
			if (e.target.classList.contains("active")){
				this.$emit("removeFav", this.card)
			}else{
				this.$emit("addFav", this.card)
			}
		},
    del(){
      unValidateAd(this.card.ownerId, this.card)
      .then(alert("annonce refusé avec succès"))
    },
    validate(){
      validateAd(this.card.ownerId, this.card)
      .then(alert("annonce validé avec succès"))
      .catch(e=>alert(e))
    },
    deleteAds(){
      Promise.all([
        deleteOne(`/users/${auth?.currentUser?.uid}/ads`, this.card.id),
        deleteOne(`ads/X1eA1Bk8tfnVXHqduiTg/${this.card.type}`, this.card.id),
        abortPost(this.card.tempId)
      ])
      .then(alert("annonce supprimée avec succès"))
      .catch(e=>console.error(e))
    },
    soldeAds(){
      soldeAd(auth?.currentUser.uid, this.card)
      .then(alert("Annonce marquée comme vendu :)"))
    },
    getImage(path){
      return require('@/' + path)
    }

  },
  computed: {
    rightIcone(){
      return this.$route.path.includes("favorites") ? 'delete' : 'favorite'
    },
    admin(){
      return this.$route.path.includes("/admin")
    },
    profile(){
      return this.$route.path.includes("/profile")
    },
    pending(){
      return this.card.status === "pending"
    },
    solded(){
      return this.card.status === "solded"
    },
    isPlan(){
      return this.card.type === "isPlan"
    },
    title(){
      const t = this.card.title
      return t.replace(t.substring(17), '...').toLowerCase()
    },
    location(){
      const l = this.card.location
      return l.replace(l.substring(12), '...').toLowerCase()
    }
  },

}
</script>
<style scoped>
p{
  overflow: hidden;
}
</style>
<style>

.solded,
.favs{
  position: absolute;
  pointer-events: visible;
  cursor: pointer;
  top: 1rem;
  right: 1rem;
  color: var(--red);
  font-size: 3rem !important;
}

.solded{
  color: var(--greenfun);
  right: 5rem;
}

.soldout{
  left: 0;
  transform: rotate(20deg);
  color: var(--greenfun) !important;
}
.favs.active{
  color: var(--red);
}

.buttonss i:hover,
.solded:hover,
.favs.active,
.favs:hover{
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48;
}

.favs.active:hover{
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48;
}

.card-container{
  position: relative;
}

.card-container .box {
  transition: box-shadow .5s;
  pointer-events: none;
  width: 23%;
  height: max-content;
  background-color: white;
  position: relative;
  margin: 1rem 0;
}
.card-container .box .top {
  height: calc(40%);
  position: relative;
}

.card-container .box:hover{
  box-shadow: -8px 9px 5px 0px #ACBABF;
}

.card-container .box .bottom{
  pointer-events: all;
}

.card-container .box .top:after {
  pointer-events: all;
  border-radius: .5rem;
  content: "Voir Details";
  background: var(--white);
  color: var(--navcolor);
  font-size: 1.2rem;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.3s;
  opacity: 0;
}

.card-container .box .top:hover:after {
  opacity: 1;
}

.card-container .box .top img {
  width: 100%;
  min-height: 200px;
  max-height: 200px;
  margin-bottom: -.5rem;
}

.card-container .box .top span {
  position: absolute;
  right: 2rem;
  bottom: 1.5rem;
  color: white;
  font-size: 2rem;
}

.card-container .box .top span i {
  margin-left: .5rem;
}

.card-container .box .bottom {
  padding: 2rem 1.5rem;
  position: relative;
}

.card-container .box .bottom h3 {
  font-size: 1.5rem;
}

.card-container .box .bottom > p {
  margin: 1.5rem 0;
  font-size: 1.3rem;
  line-height: 1.4;
  color: #777;
}

.card-container .box .bottom .advants {
  justify-content: center;
  display: flex;
}

.card-container .box .bottom .advants > div {
  margin-right: 1.5rem;
}

.card-container .box .bottom .advants > div > span {
  font-weight: bold;
  font-size: 1.2rem;
}

.card-container .box .bottom .advants > div > div {
  margin-top: 1rem;
  display: flex;
  align-items: center;
}

.card-container .box .bottom .advants > div > div i {
  color: #777;
  font-size: 2.2rem;
}

.card-container .box .bottom .advants > div > div > span {
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 1rem;
}

.card-container .box .bottom .advants > div > div > span > span {
  color: #777;
  font-weight: normal;
  margin-left: .5rem;
}

.card-container .box .bottom .price {
  margin-top: 2rem;
}

.card-container .box .bottom .price span:first-of-type {
  display: block;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: .5rem;
}

.card-container .box .bottom .price span:last-of-type {
  color: #3eaba1;
  font-size: 2.2rem;
}


.buttonss i{
  margin: .2rem;
  font-size: 3rem;
  cursor: pointer;
}

.buttonss{
  pointer-events: auto;
  float: right;
  z-index: 12;
}
</style>