<template>
  <NavBar :isLogged="isLogged"/>
  <div class="app-content">
    <router-view :isLogged="isLogged" :key="$route.path"/>
    <Support :isAdmin="isAdmin" :uid="uid"/>
    <Footer />
  </div>
</template>


<script>
  import NavBar from './components/NavBar.vue';
  import Support from './components/Settings.vue';
  import { auth, findOne, monitorState } from './lib/firestoreLib';
  import Footer from './components/Footer.vue';
  export default {
    data(){
      return {
        isLogged: false,
        isAdmin: false,
        uid: '',
      }
    },
    components:{
      NavBar,
      Support,
      Footer
    },
    mounted(){
      monitorState(user=>{
        const notConnectedR = ['/profile', '/admin/dashboard', '/messages', '/favorites']
        const connectedRoute = ['/auth']
        if (user?.emailVerified){
          this.isLogged = true
          connectedRoute.includes(this.$route.path) ? this.$router.go(-1) : ''
          findOne("users", auth?.currentUser?.uid)
          .then(user=>{
            this.uid = user.id
            this.isAdmin = user.role === 'admin'
          })
        }
        else {
          this.isLogged = false
          notConnectedR.includes(this.$route.path) ? this.$router.push("/") : ''
        }
      })
    },
    updated(){
      console.log('updated')
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

.app-content{
  position: relative;
  height: 100vh;
}

:root{
  --white: #fff;
  --gray: #f0f0f0;
  --navcolor: #1E262D;
  --hovercolor: #34495e;
  --green: #d9fdd2;
  --greenfun: #1ABC9C;
  --red: #E91E63;
  --blue: #03A9F4;
  --orange: #ff9800;
  --light100: hsl(237, 14%, 72%);
  --light200: hsl(240, 15%, 86%);
  --light400: hsl(240, 20%, 92%);
  --light600: hsl(214, 48%, 93%);
  --dark400: hsl(240, 16%, 32%);
  --dark600: hsl(238, 11%, 49%);
  --accent1: hsl(239, 34%, 58%);
  --accent2: hsl(214, 93%, 63%);

  --shadow: 0px 2px 1px 0 #0001, 0 0.125em 0.25em 0.0625em #0002,
    0 0.2em 0.5em #0002;
}

.router-link-active.router-link-exact-active.navLink{
  background: var(--hovercolor);
}

.router-link-active.router-link-exact-active .nav__link{
  color: white;
  background: var(--light400);
  border-radius: 99px;
}



</style>
