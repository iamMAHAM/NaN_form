<template>
  <div id="search">
    <Modal
      ref="modal"
      :type="'info'"
      :message="message"
      :display="false"
    ></Modal>
    <span class="close">X</span>
    <div>
      <div class="to-absolute">
        <div class="tops" align=center style="width: 50%">
          <input name="q" type="search" placeholder="rechercher un texte dans ..." v-model="searchTerm"/>
          <select name="" id="" v-model="categorie">
            <option disabled selected="selected" value="">Choisir une catégorie</option>
            <option
              v-for="(cat, index) in categories"
              :key="index"
              :value="cat"
            >
            {{ cat }}
          </option>
          </select>
        </div>
        <i
          title="rechercher"
          class="material-symbols-outlined"
          @click="search"
        >
          search
        </i>
      </div>
    </div>
  </div>
  <div id="header" v-if="!auth">
      <div class="logo">
          <router-link to="/"><img id="logo" src="../assets/logo.png" alt=""/></router-link>
      </div>
      <div class="search" @click="click"> 
              <!-- <input name="q" placeholder="recherche..." type="search" class="search-i" v-model="searchTerm" > -->
              <i class="material-symbols-outlined"
              >
                search
              </i>
              <p>Rechercher</p>
      </div>
      <nav>
          <ul class="ul">
              <router-link to="/auth"  v-if="!isLogged" class="navLink">
                  <a href="">
                      <i class="material-symbols-outlined">person</i>
                      Connexion
                  </a>
              </router-link>
              <router-link to="/profile"  v-if="isLogged" class="navLink">
                  <a href="">
                      <i class="material-symbols-outlined">person</i>
                      Profile
                  </a>
              </router-link>
              <a @click="publish" v-if="user?.role !== 'admin'">
                  <a href="#" class="item">
                      <i class="material-symbols-outlined">publish</i>
                      Publier
                  </a>
              </a>
              <router-link to="/favorites" class="navLink">
                  <a href="" class="item">
                      <i class="material-symbols-outlined">favorite</i>
                      Favoris
                  </a>
              </router-link>
              <router-link to="/messages" v-if="isLogged && user.role !== 'admin' && user.role !== 'company'" class="navLink">
                  <a href="" class="item">
                      <i class="material-symbols-outlined">mail</i>
                      Messages
                  </a>  
              </router-link>
              <a @click="signOut" v-if="isLogged && user?.role !== 'admin' && user?.role !== 'company'" >
                  <a href="#" class="item" style="color: var(--red); opacity: .5;">
                      <i class="material-symbols-outlined">logout</i>
                      Déconnexion
                  </a>
              </a>
          </ul>
      </nav>
      <i class="material-symbols-outlined menu">menu</i>
      <postForm :show="show" @close="show=false"/>
  </div>
  <Logo v-else/>
  <!-- <div class="authls" v-else>
    <img src="@/assets/logo.png">
    <span>La Solution aux Problèmes Immobiliers</span>
  </div> -->
</template>

<script>
import { allCategories, auth, signOutUser } from '@/lib/firestoreLib'
import postForm from './partials/postForm.vue'
import Logo from "@/components/partials/Logo.vue"
import Modal from './partials/Modal.vue'
export default {
  name: 'NavBar',
  props: ['isLogged', 'user', 'auth'],
  emits: ['search'],
  data(){
    return {
      show: false,
      searchTerm: '',
      categories: allCategories,
      categorie: '',
      message: ''
    }
  },
  components: {
    postForm,
    Logo,
    Modal
  },
  setup(){
    window.addEventListener("DOMContentLoaded", ()=>{
      const ul = document.querySelector(".ul")
      const menu = document.querySelector(".material-symbols-outlined.menu")
      const search = document.getElementById('search')
      const navbar = document.getElementById('header')

      const scrollY = ()=>{ return window.scrollY}
      menu?.addEventListener("click", ()=>{
          ul?.classList?.toggle("active")
          menu.textContent = menu?.textContent === "close" ? "menu" : "close"
      })

      const top = navbar?.offsetHeight
      search.addEventListener("click", e=>{
        const target = e.target
        if (target === search || target?.className === 'close'){
          search?.classList?.remove("open")
        }
      })

      window.addEventListener('scroll', ()=>{
        const fixed = navbar?.classList?.contains('fixed')
        if (scrollY() > top){
          !fixed ? navbar?.classList?.add('fixed') : ''
        }else{
          fixed ? navbar?.classList?.remove('fixed') : ''
        }
      })
    })
  },
  methods:{
    publish(){
        if (!auth?.currentUser) this.$router.push("/auth")
        else this.show = true
    },
    signOut(){
      signOutUser()
      this.$router.push("/")
    },
    search(){
      if (this.searchTerm && this.categorie){
        this.$emit('search', [this.categorie, this.searchTerm])
        document.getElementById("search")?.classList?.remove('open')
      }else{
        this.message = 'le champ et la catégorie sont obligatoire'
      }
    },
    click(){
      const search = document.getElementById('search')
      search.classList.add('open')
    }
  }
}
</script>

<style scoped>

nav a:hover{
  background: var(--hovercolor)
}
nav a{
  border-radius: 99px;
}
/* Search Style */
#search {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-transform: translate(0px, -100%) scale(0, 0);
  -moz-transform: translate(0px, -100%) scale(0, 0);
  -ms-transform: translate(0px, -100%) scale(0, 0);
  -o-transform: translate(0px, -100%) scale(0, 0);
  transform: translate(0px, -100%) scale(0, 0);
  opacity: 0;
  display: none;
}

#search.open {
  -webkit-transform: translate(0px, 0px) scale(1, 1);
  -moz-transform: translate(0px, 0px) scale(1, 1);
  -ms-transform: translate(0px, 0px) scale(1, 1);
  -o-transform: translate(0px, 0px) scale(1, 1);
  transform: translate(0px, 0px) scale(1, 1);
  opacity: 1;
  z-index: 11;
  display: block;
}

#search input[type="search"] {
  color: var(--white);
  border: 1px solid var(--white);
  width: 100%;
  background: transparent;
  font-size: 2.5rem;
  font-weight: 300;
  text-align: center;
  outline: none;
  padding: 10px;
}

.to-absolute i{
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid var(--white);
  border-radius: 50%;
  font-size: 5rem;
  color: var(--white);
}

.to-absolute i:hover{
  background: var(--white);
  color: var(--navcolor);
}

.to-absolute{
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  width: 100%;
  left: 0;
}

.to-absolute select{
  border: .5px solid var(--white);
  color: var(--white);
  background: transparent;
  cursor: pointer;
  font-size: 2.5rem;
  width: max-content
}
#search .close {
  position: fixed;
  top: 15px;
  right: 15px;
  opacity: 1;
  font-size: 27px;
  color: #fff;
}

#header.fixed{
  position: fixed;
  top: 0;
}

#search .close:hover {
  color: var(--red);
  cursor: pointer;
}


</style>
<style>

#logo{
    border: 1px solid white;
    width: 80%;
    max-height: 8rem;
    border-radius: 50%;
}

a{
  text-decoration:none;
  color:#fff
}

.ul{
    z-index: 10;
    display: flex;
}

.authls{
  gap: 5%;
  align-items: center;
  color: var(--white);
  display: flex;
  justify-content: center;
}

.authls img{
  border-radius: 50%;
}

.authls span{
  text-transform: uppercase;
  font-size: 5rem;
}

#header{
    z-index: 15;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: space-around;
    background: var(--navcolor);
    width:100%;
    position:relative
}
 #header:after{
    content:"";
    clear:both;
    display:block
}
.search{
    padding: .5rem;
    height: max-content;
    background: var(--white);
    border: 1px solid var(--white);
    border-radius: .5rem;
    color: var(--navcolor);
    cursor: pointer;
    display: flex;
    float:left;
    align-self: center;
}
.search-i{
    outline: none;
    padding: 1rem;
    width: calc(100% - 2.5rem);
    border: none;
    border-radius: 2rem
}

.search i{
    font-size: 2.5rem;
    margin: auto 0;
    cursor: pointer;
}

.material-symbols-outlined.menu{
    display: none;
    cursor: pointer;
    font-size: 3.5rem;
    color: var(--white);
}

nav .dropdown{
    position:relative
}
nav a{
    padding: 1rem
}

.searchs{
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
}

@media only screen and (max-width: 1346px){

    #logo{
        height: 6rem;
    }

    .logo a{
        width: max-content;
        padding: 0 1rem;
    }

    .search-i{
        padding: 1rem;
    }

    .ul.active{
        display: flex;
    }
}

@media only screen and (max-width: 966px) {
    .ul{
        display: none;
        height: max-content;
        position: absolute;
        right: 0;
        top: 100%;
        background: var(--navcolor);
    }

    ul.active{
        flex-direction: column;
    }

    .to-absolute *{
      text-align: center;
      font-size: 1.7rem !important;
    }

    .to-absolute i{
      font-size: 2.4rem !important;
    }

    .material-symbols-outlined.menu{
        display: block;
    }

    .ul a {
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .ul a i{
        margin: 0 .8rem;
    }
    .to-absolute{
      flex-direction: column;
    }

    .to-absolute select{
      font-size: 1.7rem;
    }
    
}

@media only screen and (max-width: 335px) {
    .ul{
        top: 100%;
        right: 1%;
    }

    .search{
        width: max-content;
    }
    .search-i{
        display: none;
    }
}

</style>