<template>
<div class = "card-wrapper">
  <Loader v-if="load" :view="80" :height="50" :width="50" :padding="0"/>
  <div class = "card" v-else>
    <!-- card left -->
    <div class = "product-imgs">
      <div class = "img-display">
        <div class = "img-showcase">
          <img :src = "current || getImage('assets/home.svg')">
        </div>
      </div>
      <div class = "img-select">
        <div class = "img-item"
          v-for="(image, index) in cardInfo?.images"
          :key="index"
        >
          <a href = "#" :data-id = "index + 1">
          <img
            :src = "image"
            @click="toggleImages"
          >
          </a>
        </div>
      </div>
    </div>
    <!-- card right -->
    <div class = "product-content">
      <h2 class = "product-title">{{ cardInfo?.title }}</h2>
      <div class = "product-price">
        <p class = "price">
          <i v-if="!isPlan && !location">Prix : </i>
          <i v-else-if="!isPlan && location">Loyer : </i>
          <i v-else>Devis à partir de : </i>
          <span>{{ cardInfo?.price?.toLocaleString('ci') }} FCFA
          </span>
          <i v-if="cardInfo?.options?.night"> par Nuit</i>
          <i v-if="cardInfo?.options?.day"> par Jour</i>
        </p>
      </div>
      <div class = "product-detail">
        <h2>Description</h2>
        <p>{{ cardInfo?.description }}</p>
        <ul>
          <li>
            <i class="material-symbols-outlined">home_work</i>
            <span>{{ cardInfo?.type }}</span>
          </li>
          <li>
            <i class="material-symbols-outlined">sell</i>
            <span>{{ cardInfo?.proposition }}</span>
          </li>
          <li>
            <i class="material-symbols-outlined">grass</i>
            <span>{{ cardInfo?.area }}</span>m²
          </li>
          <li>
            <i class="material-symbols-outlined">location_on</i>
            <span>{{ cardInfo?.location }}</span>
          </li>
        </ul>
      </div>
      <div class = "purchase-info" v-if="notMe">
        <button
          type="button"
          class="btn button-style c"
          :id="cardInfo?.ownerId"
          @click="write"
        >
          Contacter
          <i class="material-symbols-outlined">forward_to_inbox</i>
        </button>
        <button
          type="button"
          class="btn button-style c"
          :id="cardInfo?.ownerId"
          @click="contact"
        >
          Profile
          <i class="material-symbols-outlined">person</i>
        </button>
      </div>
    </div>
  </div>
</div>

<Maps
  v-if="emp"
  :coordinate="cardInfo?.coordinate"
  :emp="emp"
/>

<div style="margin-bottom: 50px">
  <Comments :postId="cardInfo.id" v-if="!load" :isLogged="isLogged"/>
</div>
</template>

<script>
import { addConversation, auth, findOne, getRtdbOne, messageTemplate } from '@/lib/firestoreLib'
import Maps from "../components/Map.vue"
import Loader from '@/components/partials/Loader.vue'
import Comments from '@/components/Comments.vue'
export default {
  name: 'Details',
  props: ['isLogged', 'searchData'],
  components: {
    Maps,
    Loader,
    Comments
  },
  data(){
    return {
      cardInfo: {},
      load: true,
      current: '',
      emp: '',
    }
  },
  methods:{
    toggleImages(e){
      this.current = e.target.src
    },
    contact(){
      this.$router.push({name: 'Profile', query:{id: this.cardInfo?.ownerId}})
    },
    write(e){
      if (!auth?.currentUser){
        this.$router.push("/auth")
        return
      }
      const receiverId = e.target.id
      const template = messageTemplate(
        this.cardInfo?.type,
        this.cardInfo?.proposition,
        this.cardInfo?.price,
        window.location.href
      )
      addConversation(auth?.currentUser?.uid, receiverId)
      .then(this.$router.push({ path: '/messages', query: { id: this.cardInfo?.ownerId, template: JSON.stringify(template) } }))
    },
    getImage(path){
      return require('@/' + path)
    }
  },
  async mounted(){
    let func = async ()=>{}
    const params = this.$route.params
    if (this.$route.path.includes("/refused")){
      func = getRtdbOne('refusedAds', this.$route.params.id)
    }else{
      func = findOne(`ads/X1eA1Bk8tfnVXHqduiTg/${params.categorie}`, params.id)
    }
    func
    .then(detailInfo=>{
      this.current = detailInfo?.images[0]
      this.cardInfo = detailInfo
      this.emp = detailInfo?.location
      this.load = false
    })
    .catch(e=>{
      this.load = true
      findOne("users", auth.currentUser?.uid)
      .then(user=>{
        if (user.role === "admin" || this.$route.query.owner === auth?.currentUser?.uid /*ad owner*/){
          const tempId = this.$route.query.tempId || this.$route.params.id
          getRtdbOne('waitingAds', tempId)
          .then(card=>{
            this.cardInfo = {...card}
            this.emp = card?.location
            this.current = card?.images[0]
            this.load = false
          })
          .catch(e=>{
            findOne("totals_ads/", this.$route.params.id)
            .then(card=>{
              this.cardInfo = {...card}
              this.emp = card?.location
              this.current = card?.images[0]
              this.load = false
            })
          })
        }else{
          if (e === 'notFound'){
            this.$router.push("/404")
            this.load = false
          }
        }
      })
    })
  },
  computed: {
    isPlan(){
      return this.cardInfo?.type === 'plan'
    },
    location(){
      return this.cardInfo?.proposition === 'location'
    },
    notMe(){
      return auth?.currentUser?.uid !== this.cardInfo?.ownerId
    }
  }
}
</script>

<style scoped>
  img{
    width: 100%;
    min-height: 80px;
    max-height: 80px;
    display: block;
}
</style>
<style>

.card-wrapper {
  overflow: hidden;
  border-radius: .5rem;
  background: var(--white);
  max-width: 1100px;
  margin: 0 auto;
}

.img-display {
  overflow: hidden;
}

.img-showcase {
  display: flex;
  width: 100%;
  transition: all 0.5s ease;
}

.img-showcase img {
  min-width: 100%;
  max-height: 300px;
}

.img-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.img-item {
  width: 7.8rem;
  margin: 0.3rem;
}

.img-item:hover {
  opacity: 0.8;
}

.product-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
}

.product-title {
  font-size: 3rem;
  text-transform: capitalize;
  font-weight: 700;
  position: relative;
  color: var(--navcolor);
  margin-bottom: 1rem;
}

.product-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: .1rem;
  width: 100%;
  background: var(--navcolor);
}

.product-price {
  margin: 1rem 0;
  font-size: 2rem;
  font-weight: 700;
}

.product-price span {
  font-weight: 400;
}

.price span {
  color: var(--hovercolor);
}

.product-detail h2 {
  text-transform: capitalize;
  color: var(--navcolor);
  padding-bottom: 0.6rem;
}

.product-detail p {
  font-size: 1.5rem;
  padding: 1rem;
  opacity: 0.8;
}

.c{
  text-transform: unset;
}
.product-detail ul {
  font-size: 1.7rem;
}

.product-detail ul li {
  color: var(--navcolor);
  display: flex;
  gap: .3rem;
  align-items:center;
  list-style: none;
  margin: 0.4rem 0;
  font-weight: 600;
}

.product-detail ul li span {
  font-weight: 400;
}

.purchase-info {
  display: flex;
  justify-content: center;
}

.purchase-info .btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1.5px solid #ddd;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 2.2rem;
  gap: .2rem;
  background: var(--navcolor);
  color: var(--white);
}

.purchase-info .btn:hover {
  background: var(--hovercolor);
}

.card{
  padding: 3rem;
  width: 100%;
  align-items: center;
}

@media screen and (min-width: 992px) {
  .card {
    display: flex;
  }

  .card-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
    height: max-content;
  }

  .product-imgs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: .5rem auto;
    min-width: 50%;
    max-width: 50%;
  }

  .product-content {
    padding-top: 0;
  }

  #map{
    width: 75vw;
  }
}
</style>