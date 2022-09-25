<template>
  <div class="banner-component">
    <Categories />
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
  }
}
</script>

<style>
.banner-component{
  margin: 0 auto;
  display: flex;
  width: 80vw;
  height: 50vh;
  overflow: hidden;
}

.rightd{
  width: 800px
}
</style>