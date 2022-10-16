<template>
  <div class="banner-component">
    <Categories class="ok" @filter="emit" :match="match"/>
    <carousel :slides="slides" :interval="3000" controls indicators class="rightd"></carousel>
  </div>
</template>

<script>
import Categories from './partials/banner/Categories.vue';
import Carousel from "@/components/partials/banner/carousel/Carousel.vue"
export default {
  name: 'Banner',
  emits: ['filter'],
  props:['match'],
  components: {
    Categories,
    Carousel
  },
  data(){ return { slides:[] } },
  methods:{
    emit(data){
      this.$emit('filter', data)
    }
  },
  mounted(){
    const sliders = {
      maison:[
        'https://www.depreux-construction.com/wp-content/uploads/2021/03/SEROUX_Page_2.jpg',
        'https://st.hzcdn.com/simgs/pictures/facades-de-maisons/maison-moderne-en-3-volumes-maisons-vivre-img~cf01057207f3a3e5_4-0427-1-c8e936e.jpg',
        'https://ws.pap.fr/cdnV1/5238a965b3d55c68833050c7/5238a965b3d55c68833050c7-1468842886-1024x682.jpg',
        'https://images.unsplash.com/photo-1583577142658-0ec494ed1ea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3431&q=80',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
      ],
      hotel:[
        'https://hotelalfa.rs/wp-content/uploads/2022/07/indian-hotels.jpg',
        'https://www.momondo.fr/himg/c1/9e/d8/leonardo-67307801-8844_roskb_01_p_3000x2250_O-989837.jpg',
        'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768',
        'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/321441959.jpg?k=b2934bfaf0222f099572b0eb7fb6144aa4bdb5c0dbd0674614036f08f0e9325c&o=',
        'https://img.hwnstatic.com/500/350/80/false/hS6xM66VW7aPPkNHCWPi.PFFPwqfnBUd:I7pTXuEkLetAsoFkBzVn8ylNy05cd1rF1rbGG2kduGgeG0iddiP2pnCvwzQta1RQX2QEaNTJpD248YWzvBbV2DDvcBpspRy1m15PSs7gJJ79BFRZR:riAMHWhWJDn3k0:MgwP:SIDfJ.ZKIPfdntxcHZMMHsg__',
      ],
      terrain:[
        'https://www.zigzag-terrain.fr/media/k2/items/cache/af2ef6a0e2c9c528b09655df79f3b312_XL.jpg',
        'https://messibatinternational.com/wp-content/uploads/2020/10/niveler-terrain-min-1180x650-1.jpg',
        'https://images.prismic.io/figaroimmo/0c1f7503-18c0-4364-86f3-c42ed6674463_visiter-terrain.jpg?auto=compress,format&rect=0,0,1000,667&w=720&h=480',
        'https://www.myconcept.bzh/sites/myconcept.bzh/files/news/photos/terrain-constructible.jpg'
      ],
      plan:[
        'https://www.terrain-construction.com/content/wp-content/uploads/2018/01/maison-ardoise-datis-nl-5_large_635-e1523005903872.jpg',
        'http://andrew-wittman.com/wp-content/uploads/2013/05/Strategic-Planning.jpg'
      ],
      magasin:[
        'https://cdn.shopify.com/s/files/1/0249/6376/files/10_Conseils_d_Experts_Pour_augmenter_Vos_Ventes_en_magasin.png?15743940905870153897&format=jpg&quality=90',
        'https://blog-assets.lightspeedhq.com/img/2022/04/49bf6fb5-7-tips-to-speed-up-the-checkout-process-in-your-store-fr.png'
      ]
    }
    this.slides = sliders[this.$route.path.replace('/', '').trim()]
    const screenHandler = ()=>{
      const aside = document.getElementsByClassName("ok")[0]
      const sidebar = document.getElementsByClassName("sidebar")[0]
      if (window.matchMedia("(max-width: 800px)").matches){
        sidebar?.classList?.add("expand")
        aside?.classList?.add("expand")
      }else{
        aside?.classList?.remove("expand")
        sidebar?.classList?.remove("expand")
      }
    }
    const onResize = ()=>{
      screenHandler()
      window.addEventListener("resize", screenHandler)
    }

    window.addEventListener("DOMContentLoaded", onResize)
  }
}
</script>

<style>
.banner-component{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 70vh;
}

.rightd{
  width: calc(95%)
}


@media screen and (max-width: 1015px){

  .app-content{
    width: 100vw;
  }

  .banner-component{
    margin: 0 auto;
    width: 100vw;
    height: 80vh;
  }

  .nav-title{
    padding-block: .5rem;
  }

  .rightd{
    width: calc(95%);
  }
}
@media screen and (max-width: 609px){
  .banner-component{
    height: 60vh;
    width: 100vw;
  }

  .rightd{
    width: calc(80%);
  }
}
</style>