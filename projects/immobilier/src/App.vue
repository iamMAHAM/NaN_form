<template>
  <i v-if="user.role === 'company' && !flag1" class="vcompany material-symbols-outlined" @click="$router.push(`/pro/vendor/${user.id}`)">dashboard</i>
  <NavBar :isLogged="isLogged" :user="user" :auth="auth" @search="search"/>
  <div class="app-content">
    <router-view :isLogged="isLogged" :key="$route.path" :searchData="searchData"/>
    <Support :isAdmin="isAdmin && !flag" :uid="uid"/>
  </div>
  <Footer />
</template>


<script>
  import NavBar from './components/NavBar.vue';
  import Support from './components/Settings.vue';
  import { auth, findOne, monitorState, signOutUser } from './lib/firestoreLib';
  import Footer from './components/Footer.vue';
  export default {
    data(){
      return {
        isLogged: false,
        isAdmin: false,
        uid: '',
        user: {},
        flag: false,
        flag1: false,
        auth:false,
        searchData: []
      }
    },
    components:{
      NavBar,
      Support,
      Footer
    },
    methods:{
      search(data){
        this.searchData = data
      }
    },
    mounted(){
      monitorState(async user=>{
        const notConnectedR = ['/profile', '/admin/dashboard', '/messages', '/favorites']
        const connectedRoute = ['/auth']
        if (user?.emailVerified){
          this.isLogged = true
          connectedRoute.includes(this.$route.path) ? this.$router.go(-1) : ''
          findOne("users", auth?.currentUser?.uid)
          .then(user=>{
            this.uid = user.id
            this.user = user
            this.isAdmin = user.role === 'admin'
          })
        }
        else {
          await signOutUser()
          this.isLogged = false
          notConnectedR.includes(this.$route.path) ? this.$router.push("/") : ''
        }
      })
    },
    updated(){
      this.flag = this.$route.path === "/admin/dashboard"
      this.auth = this.$route.path === "/auth"
      this.flag1 = this.$route.path.includes('/pro/vendor')
    },
    watch:{
    $route (to, from){
      if (to?.fullPath?.includes('details')) window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
  background: #e6e3e3;
    line-height:1.5;
    font-size: 1.6rem;
    font-family: 'Poppins', sans-serif;
}

.app-content{
  width: 85vw;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
}

:root{
  --white: #fff;
  --gray: #f0f0f0;
  --navcolor: #12192c;
  --hovercolor: #34495e;
  --green: #d9fdd2;
  --greenfun: #1ABC9C;
  --red: #E91E63;
  --blue: #03A9F4;
  --orange: #ff9800;
  --primary: #333;
    --secondary: #333;
    --errorColor: red;
    --stepNumber: 6;
    --containerWidth: 600px;
    --bgColor: #333;
    --inputBorderColor: lightgray;
  --light100: hsl(237, 14%, 72%);
  --light200: hsl(240, 15%, 86%);
  --light400: hsl(240, 20%, 92%);
  --light600: hsl(214, 48%, 93%);
  --dark400: hsl(240, 16%, 32%);
  --dark600: hsl(238, 11%, 49%);
  --anim-dur: 3s;
  --containerWidth: 650px;
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


.vcompany{
  font-variation-settings:
  'FILL' 1,
  'wght' 700,
  'GRAD' 200,
  'opsz' 48;
  z-index: 3;
  cursor: pointer;
  font-size: 4rem !important;
  position: fixed;
  top: 10%;
  right: 5%;
  color: var(--greenfun);
}


</style>
