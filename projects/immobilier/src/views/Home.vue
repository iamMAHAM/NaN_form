<template>
  <div class="home-component">
    <Banner @filter="filter"/>
    <CardContainer
      :cards="cards"
      :load="load"
      :message="'Rien dans cette section'"
      />
  </div>
</template>

<script>
import Banner from '@/components/partials/Banner.vue';
import CardContainer from '@/components/CardContainer.vue';
import { allCategories, find } from '@/lib/firestoreLib';
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
      allCards: [],
      cards: [],
    }
  },
  methods:{
    filter(type){
      console.log(this.allCards)
      this.cards = this.allCards.filter(c=> c.proposition.includes(type))
    }
  },
  beforeMount(){
    allCategories.includes(this.$route.path.replace("/", '').trim())
    ? ''
    : this.$router.push('/404')
  },
  mounted(){
    find(`ads/X1eA1Bk8tfnVXHqduiTg${this.$route.path}`)
    .then(data=>{
      this.cards = data
      this.allCards = [...data]
      this.load = false
    })
  }

}
</script>

<style>

</style>