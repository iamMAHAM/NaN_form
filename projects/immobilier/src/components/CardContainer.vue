<template>
  <Loader v-if="load"/>
  <div class="card-container" v-if="!load">
    <div v-if="!load && !cards.length">{{ message }}</div>
    <Card
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @addFav="addFavs"
      @removeFav="removeFavs"
    />
  </div>
</template>

<script>
import { auth, deleteOne, override } from '@/lib/firestoreLib';
import Card from './partials/Card.vue';
import Loader from './partials/Loader.vue';

export default {
  name: 'CardContainer',
  props: ['cards', 'load', 'message'],
  emits: ['filteringCard'],
  components: {
    Card,
    Loader
  },
  data(){
    return {
      // cards : [
      //   {
      //     type: 'magasin',
      //     proposition: 'vente',
      //     location: 'Abidjan',
      //     description: 'lorem 20 je xjnj ckn c ezv zivz vrzvnz v ezvnzvzvezvez veznvebzve',
      //     superficie: 500,
      //     price: 2000000
      //   },
      //   {
      //     type: 'maison',
      //     proposition: 'location',
      //     location: 'Abidjan',
      //     description: 'lorem',
      //     superficie: 500,
      //     price: 150000
      //   },
      //   {
      //     type: 'magasin',
      //     proposition: 'vente',
      //     location: 'Bingerville',
      //     description: 'zigribsiscbcbiuhez',
      //     superficie: 500,
      //     price: 4560000000
      //   },
      //   {
      //     type: 'magasin',
      //     proposition: 'vente',
      //     location: 'Yamoussoukro',
      //     description: 'const toggleForm = () => {',
      //     superficie: 500,
      //     price: 1890000
      //   },
      //   {
      //     type: 'magasin',
      //     proposition: 'vente',
      //     location: 'Abidjan',
      //     description: 'lorem 20 je xjnj ckn c ezv zivz vrzvnz v ezvnzvzvezvez veznvebzve',
      //     superficie: 500,
      //     price: 2000000
      //   },
      //   {
      //     type: 'maison',
      //     proposition: 'location',
      //     location: 'Abidjan',
      //     description: 'lorem',
      //     superficie: 500,
      //     price: 150000
      //   },
      //   {
      //     type: 'magasin',
      //     proposition: 'vente',
      //     location: 'Bingerville',
      //     description: 'zigribsiscbcbiuhez',
      //     superficie: 500,
      //     price: 4560000000
      //   },
      //   {
      //     type: 'magasin',
      //     proposition: 'vente',
      //     location: 'Yamoussoukro',
      //     description: 'const toggleForm = () => {',
      //     superficie: 500,
      //     price: 1890000
      //   },

      // ],
      // load: true,
      uid: null
    }
  },
  methods: {
    addFavs(card){ // add to favorite
			const index = this.cards.indexOf(card)
      const copy = {...card}
      delete copy.isLoad
      copy.isFav = true
			this.cards[index].isLoad = true
			if (!this.uid){
        this.$router.push("/auth")
				return
			}
			override(`users/${this.uid}/favorites`, copy.id, copy)
      .then(()=>{
        this.cards[index].isFav = true
				this.cards[index].isLoad = false
      })
      .catch(e=>console.log("error", e))
		},
		removeFavs(card){ // remove to favorite
			const index = this.cards.indexOf(card)
			this.cards[index].isLoad = true
			deleteOne(`users/${this.uid}/favorites`, card.id)
      .then(()=>{
        this.$emit("filteringCard", card)
        this.cards[index].isFav = false
        this.cards[index].isLoad = false
      })
		}
  },
  mounted(){
    this.uid = auth?.currentUser? auth.currentUser.uid : ''
    // save("ads/X1eA1Bk8tfnVXHqduiTg/test", this.cards)
    // .then(console.log("save success"))
  }
}
</script>

<style>
.card-container {
  width: calc(80%);
  margin: 100px auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.card-container :nth-child(1){
  font-size: 2.5rem;
  text-align: center;
  color: var(--white);
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 1550px){
  .card-container .box{
    width: 30%;
  }
}

@media only screen and (max-width: 1174px){

  .card-container{
    width: 90%;
  }

  .card-container .box{
    width: 32.9%;
  }
}

@media only screen and (max-width: 1098px){
  .card-container .box{
    width: 32.5%;
  }
}
@media only screen and (max-width: 956px){
  .card-container .box{
    width: 48%;
  }
}
@media only screen and (max-width: 739px){

  .card-container{
    width: 95%;
  }

  .card-container .box{
    width: 49%;
  }
}
@media only screen and (max-width: 608px){
  .card-container {
    width: 95%;
    justify-content: center;
  }
  .card-container .box{
    height: max-content;
    width: 90%;
  }
}


</style>