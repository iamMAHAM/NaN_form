<template>
  <div class="favorites">
    <div
      v-if="!load && !cards.length"
      class="empty"
    >
    <i class="material-symbols-outlined">filter_none</i>
      Aucun Favoris
    </div>
    <CardContainer
      v-else
      :cards="cards"
      :load="load"
      @filteringCard="filteringCard"
    />
  </div>
</template>

<script>
import CardContainer from '@/components/CardContainer.vue';
import { auth, find } from '@/lib/firestoreLib';

export default {
  data(){
    return {
      cards: [],
      load: true,
    }
  },
  methods:{
    filteringCard(card){
      console.log(card.id)
      console.log(this.cards.length)
      // this.cards = [...this.cards.filter(c=> c!== card.id)]
      const inter = this.cards.filter(c=>c.id !== card.id)
      this.cards = [...inter]
    }
  },
  components:{
    CardContainer
  },
  mounted(){
    console.log(auth?.currentUser?.uid)
    // find(`users/${auth?.currentUser?.uid}/favorites`)
    find(`users/${auth?.currentUser?.uid}/favorites`)
    .then(favorites=>{
      console.log(favorites)
      this.cards = [...favorites]
      console.log(this.cards)
      this.load = false
    })
  }
}
</script>

<style>
  div.empty *, div.empty{
    color: var(--white);
    margin-top: 1rem;
    text-align: center;
    font-size: 8rem;
  }
</style>