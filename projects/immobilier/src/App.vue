<template>
  <NavBar />
  <router-view/>
</template>


<script>
  import NavBar from './components/NavBar.vue';
  export default {
    components:{
      NavBar
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Anek+Telugu:wght@100;200;300;400;800&family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;1,100&display=swap');

html{
  font-size: 62.5%;
}

*, *:before, *:after {
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    margin:0;
    padding:0
}

body{
    line-height:1.5;
    font-size: 1.6rem;
    font-family: 'Poppins', sans-serif;
}

:root{
    --white: #fff;
    --gray: #bdc3c7;
    --navcolor: #34495e;
    --hovercolor: #2C3E50;
}
</style>
