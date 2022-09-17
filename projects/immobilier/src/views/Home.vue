<template>
  <Banner />
  <CardContainer
    :cards="cards"
    :load="load"/>
</template>

<script>
import Banner from '@/components/partials/Banner.vue';
import CardContainer from '@/components/CardContainer.vue';
import { auth, find } from '@/lib/firestoreLib';
export default {
  name: 'Home',
  props: ['isLogged'],
  components: {
      Banner,
      CardContainer
  },
  data(){
    return {
      load: true,
      cards: []
    }
  },
  mounted(){
    // find(`users/${auth?.currentUser?.uid}/favorites`)
    find(`ads/X1eA1Bk8tfnVXHqduiTg/maison`)
    .then(maison=>{
      this.cards = maison
      this.load = false
    })
  }

}
</script>

<style>

</style>