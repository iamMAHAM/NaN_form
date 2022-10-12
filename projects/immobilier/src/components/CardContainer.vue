<template>
  <Modal ref="modal"/>
  <Loader v-if="load"/>
  <div class="text" align="center"
    :style="{
      fontSize: '2rem',
      color: 'var(--navcolor)'
    }"
    v-if="isSearch && cards.length"
  >
    RECHERCHE - {{ cardTodisplay.length + ' Correspondances à : ' + searchTerm}}
  </div>
  <div class="card-container" v-if="!load">
    <div v-if="!load && !cards?.length" class="em">{{ message }}</div>
    <Card
      v-for="card in cardTodisplay"
      :key="card.id"
      :card="card"
      @addFav="addFavs"
      @removeFav="removeFavs"
    />
  </div>
  <div align="center" style="margin-bottom: 5px" v-if="cards.length"><Pagination class="paginate" :items="cards" @changePage="newItems"/></div>
</template>

<script>
import { auth, deleteOne, override } from '@/lib/firestoreLib';
import Card from './partials/Card.vue';
import Loader from './partials/Loader.vue';
import Modal from './partials/Modal.vue';
import Pagination from './partials/user/Pagination.vue';

export default {
  name: 'CardContainer',
  props: ['cards', 'load', 'message', 'searchTerm', 'isSearch'],
  emits: ['filteringCard'],
  data(){
    return {
      page: 1,
    }
  },
  components: {
    Card,
    Loader,
    Modal,
    Pagination
  },
  methods: {
    addFavs(card){ // add to favorite
      card.isLoad = true
			const index = this.cards.indexOf(card)
      this.cards[index].isLoad = true
      const copy = {...card}
      delete copy.isLoad
      copy.isFav = true
			this.cards[index].isLoad = true
			if (!auth?.currentUser){
        this.$router.push("/auth")
				return
			}
			override(`users/${auth?.currentUser.uid}/favorites`, copy.id, copy)
      .then(()=>{
        this.cards[index].isFav = true
				this.cards[index].isLoad = false
      })
      .catch(e=>{
        this.$refs.modal.show({
              type: 'error',
              title: 'Erreur',
              display: false,
              errorMessage: e.code ? e.code : e?.message,
          })
      })
		},
		removeFavs(card){ // remove to favorite
			const index = this.cards.indexOf(card)
			this.cards[index].isLoad = true
			deleteOne(`users/${auth?.currentUser.uid}/favorites`, card.id)
      .then(()=>{
        this.$emit("filteringCard", card)
        this.cards[index].isFav = false
        this.cards[index].isLoad = false
      })
		},
    newItems(page){
      this.page = page
    }
  },
  computed: {
    cardTodisplay(){
      return this.cards.filter((c, index)=> index >= (20 * this.page - 20) && index < 20 * this.page)
    }
  }
}
</script>

<style>
.card-container {
  width: calc(100%);
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.card-container .em{
  font-size: 3rem;
  text-align: center;
  color: var(--navcolor);
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