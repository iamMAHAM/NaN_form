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
      const inter = this.cards.filter(c=>c.id !== card.id)
      this.cards = [...inter]
    }
  },
  components:{
    CardContainer
  },
  async mounted(){
    // find(`users/${auth?.currentUser?.uid}/favorites`)
    await new Promise(r=>setTimeout(r, 200))
    if (!auth?.currentUser) {this.$router.push("/auth"); return}
    find(`users/${auth?.currentUser?.uid}/favorites`)
    .then(favorites=>{
      this.cards = [...favorites]
      this.load = false
    })
  }
}
</script>

<style>
  div.favorites{
    display: inline-block;
    height: 100vh;
    width: 100%;
  }
  div.empty *, div.empty{
    color: var(--navcolor);
    text-align: center;
    font-size: 6rem;
  }
  div.empty{
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>