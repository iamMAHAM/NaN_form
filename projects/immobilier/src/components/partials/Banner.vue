<template>
  <div class="banner-component">
    <Categories class="ok" @filter="emit" :match="match"/>
    <carousel :slides="slides" :interval="3000" controls indicators class="rightd"></carousel>
  </div>
</template>

<script>
import Categories from './banner/Categories.vue';
import Carousel from "@/components/partials/banner/carousel/Carousel.vue"
export default {
  name: 'Banner',
  emits: ['filter'],
  props:['match'],
  components: {
    Categories,
    Carousel
  },
  data(){
    return {
      slides:[
        "assets/house.jpeg",
        "assets/farm.jpeg",
        "assets/hotel.webp",
        "assets/fiable.jpeg",
        "assets/accordconclu.webp",
      ]
    }
  },
  methods:{
    emit(data){
      console.log(data)
      this.$emit('filter', data)
    }
  },
  mounted(){
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
  margin: 3rem auto;
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 70vh;
}

.rightd{
  width: calc(70%)
}


@media screen and (max-width: 959px){
  .banner-component{
    height: 40vh;
  }

  .nav-title{
    padding-block: .5rem;
  }

  .rightd{
    width: calc(70%);
  }
}
@media screen and (max-width: 609px){
  .banner-component{
    height: 31vh;
  }

  .rightd{
    width: calc(80%);
  }
}
</style>