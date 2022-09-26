<template>
  <div class="banner-component">
    <Categories class="ok"/>
    <carousel :slides="slides" :interval="3000" controls indicators class="rightd"></carousel>
  </div>
</template>

<script>
import Categories from './banner/Categories.vue';
import Carousel from "@/components/partials/banner/carousel/Carousel.vue"
export default {
  name: 'Banner',
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
  setup(){
    let hasMatch = false

    const screenHandler = ()=>{
      const aside = document.getElementsByClassName("ok")[0]
      const sidebar = document.getElementsByClassName("sidebar")[0]
      if (window.matchMedia("(max-width: 800px)").matches){
        console.log("ddzdzdza")
        sidebar.classList.add("expand")
        aside.classList.add("expand")
        hasMatch = true
      }else{
        console.log("not m,zenfez")
        aside.classList.remove("expand")
        sidebar.classList.remove("expand")
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
  height: 50vh;
}

.rightd{
  width: calc(55%)
}


@media screen and (max-width: 959px){
  .banner-component{
    height: 35vh;
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
    height: 26vh;
  }

  .rightd{
    width: calc(80%);
  }
}
</style>