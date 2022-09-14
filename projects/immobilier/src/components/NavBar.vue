<template>
    <div id="header">
        <div class="logo">
            <router-link to="/"><img id="logo" src="../assets/logo.png" alt=""/></router-link>
        </div>
        <div class="search"> 
                <input name="q" placeholder="recherche..." type="search" class="search-i">
                <i class="material-symbols-outlined">search</i>
        </div>
        <nav>
            <ul class="ul">

                <router-link to="/auth"  v-if="!isLogged">
                    <a href="">
                        <i class="material-symbols-outlined">person</i>
                        Connexion
                    </a>
                </router-link>
                <a @click="signOut" v-if="isLogged">
                    <a href="#" class="item">
                        <i class="material-symbols-outlined">logout</i>
                        Déconnexion
                    </a>
                </a>
                <a @click="publish">
                    <a href="#" class="item">
                        <i class="material-symbols-outlined">publish</i>
                        Publier
                    </a>
                </a>
                <router-link to="/favorites">
                    <a href="" class="item">
                        <i class="material-symbols-outlined">favorite</i>
                        Favoris
                    </a>
                </router-link>
                <router-link to="/messages" v-if="isLogged">
                    <a href="" class="item">
                        <i class="material-symbols-outlined">mail</i>
                        Messages
                    </a>  
                </router-link>
            </ul>
        </nav>
        <i class="material-symbols-outlined menu">menu</i>
        <postForm :show="show" @close="show=false"/>
    </div>
</template>

<script>
import { auth, signOutUser } from '@/lib/firestoreLib'
import postForm from './partials/postForm.vue'
export default {
  name: 'NavBar',
  props: ['isLogged'],
  data(){
    return {
      show: false,
    }
  },
  components: {
    postForm
  },
  setup(){
    window.addEventListener("DOMContentLoaded", ()=>{
        const ul = document.querySelector(".ul")
        const menu = document.querySelector(".material-symbols-outlined.menu")
        menu.addEventListener("click", ()=>{
            ul.classList.toggle("active")
            menu.textContent = menu.textContent === "close" ? "menu" : "close"
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
    }
  }
}
</script>

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
#header{
    display: flex;
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
    border-radius: 1.5rem;
    width: 25%;
    height: max-content;
    background: var(--white);
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
    border-left: .1rem solid var(--navcolor);
    font-size: 3rem;
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
nav a:hover{
    background:#2C3E50
}

@media only screen and (max-width: 1346px){

    #logo{
        height: 6rem;
    }

    .logo a{
        width: max-content;
        padding: 0 1rem;
    }

    nav a{
        padding: .5rem;
    }

    .search{
        width: 35%;
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