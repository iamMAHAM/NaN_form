<template>
  <div class="banner-component">
    <Categories />
    <Slider class="sliders"/>
  </div>
</template>

<script>
import Categories from './banner/Categories.vue';
import Slider from './banner/Slider.vue';
export default {
  name: 'Banner',
  components: {
    Categories,
    Slider
  }
}
</script>

<style>
.banner-component{
  margin: 0 auto;
  display: flex;
  width: 80vw;
}
</style>