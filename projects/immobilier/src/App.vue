<template>
  <NavBar :isLogged="isLogged"/>
  <router-view :isLogged="isLogged"/>
  <Support />
</template>


<script>
  import NavBar from './components/NavBar.vue';
  import Support from './components/Support.vue';
  import { monitorState } from './lib/firestoreLib';
  export default {
    data(){
      return {
        isLogged: false,
      }
    },
    components:{
      NavBar,
      Support
    },
    mounted(){
      monitorState(user=>{
        if (user?.emailVerified){
          this.isLogged = true
          // this.$router.push("/")
        }
        else this.isLogged = false
      })
    },
    updated(){
      console.log("root updated")
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
  background: var(--hovercolor);
    line-height:1.5;
    font-size: 1.6rem;
    font-family: 'Poppins', sans-serif;
}

:root{
    --white: #fff;
    --gray: #f5f5f5;
    --navcolor: #1E262D;
    --hovercolor: #34495e;
    --green: #d9fdd2;
    --red: red;
}
</style>
