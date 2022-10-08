<template>
  <div class="home-component" style="min-height: 100vh">
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
import { allCategories, find, save, saveOne, searchLow, setOne } from '@/lib/firestoreLib';
import { serverTimestamp } from '@firebase/firestore';

export default {
  name: 'Home',
  props: ['isLogged', 'searchData'],
  components: {
      Banner,
      CardContainer,
  },
  data(){
    return {
      load: true,
      allCards: [],
      cards: [],
      match: false,
      message: '',
      searchTerm: '',
      isSearch: false,
    }
  },
  methods:{
    filter(type){
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

    function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
  }
    const ids = [
      'zsHm67Xam6bfrPNUbPCRkHGJZz33',
      'Gqbz54cIVxVeDpl483hMZMgnhqC2',
      'mjWboYwJ5ySSkmnkHmvkdUogMy02'
    ]
    find(`ads/X1eA1Bk8tfnVXHqduiTg${this.$route.path}`)
    .then(data=>{
      const pros = data.filter(d => d.isPro)
      this.cards = [...pros, ...data.filter(d => !d.isPro)]
      this.allCards = [...this.cards]
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
        this.cards = [...datas]
        this.message = this.cards.length ? 'Rien dans cette section' : 'Aucun resultat correspondant'
        this.load = false
      })
    }
  }

}
</script>