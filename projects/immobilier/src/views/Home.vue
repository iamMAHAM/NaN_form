<template>
  <div class="home-component">
    <Banner @filter="filter" :match="match"/>
    <CardContainer
      :cards="cards"
      :load="load"
      :message="message"
      :searchTerm="searchTerm"
      :isSearch="isSearch"
      />
  </div>
</template>

<script>
import Banner from '@/components/partials/Banner.vue';
import CardContainer from '@/components/CardContainer.vue';
import { allCategories, find, searchLow } from '@/lib/firestoreLib';
export default {
  name: 'Home',
  props: ['isLogged', 'searchData'],
  components: {
      Banner,
      CardContainer
  },
  data(){
    return {
      load: true,
      allCards: [],
      cards: [],
      match: false,
      message: '',
      searchTerm: '',
      isSearch: false
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
    this.match = window.matchMedia("(max-width: 800px)").matches
    find(`ads/X1eA1Bk8tfnVXHqduiTg${this.$route.path}`)
    .then(data=>{
      this.cards = data
      this.allCards = [...data]
      this.load = false
      this.message = 'Rien dans cette section'
    })
  },
  watch:{
    searchData (value){
      const [categorie, searchTerm ] = value
      this.load = true
      this.searchTerm = searchTerm
      searchLow(categorie, searchTerm)
      .then(datas=>{
        this.isSearch = true
        console.log(datas)
        this.cards = [...datas]
        this.message = this.cards.length ? 'Rien dans cette section' : 'Aucun resultat correspondant'
        this.load = false
      })
    }
  }

}
</script>

<style>

</style>