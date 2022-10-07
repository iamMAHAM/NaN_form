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
    // allCategories.forEach(cat=>{
    //   find(`ads/X1eA1Bk8tfnVXHqduiTg/${cat}`)
    //   .then(cards=>{
    //     cards.forEach(c=>{
    //       if (c.ownerId != 'vulEKiaO74eYZzoMiiWQd7or02s2') {
    //         c.ownerId = randomChoice(ids)
    //         c.publishedAt = serverTimestamp()
    //       }
    //       c.status = 'online'
    //       setOne("totals_ads", c, c.id)
    //     })
    //   })
    // })

    // find('/admin/vAJXH3iQabt9AjGLAaej/solded')
    // .then(all=>{
    //   console.log(all)
    //   all.forEach(a=>{
    //     if (a.ownerId === '89tUBz2CfUY6aylA3fhYvmj4EPD2')  a.ownerId = randomChoice(ids)
    //     setOne(`users/${a.ownerId}/ads`, a, a.id)
    //     setOne(`totals_ads`, a, a.id)
    //     console.log("write sucess ", a.id, " in totals_ads and also in owner ", a.ownerId)
    //   })
    // })
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