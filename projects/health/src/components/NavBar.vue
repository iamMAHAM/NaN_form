<template>
	<nav class="navbar">
		<div class="nav-start">
			<div
				class="goHome"
				@click="goHome"
			>
				<img src="../assets/logo.png" alt="logo image" class="logo">
			</div>
		</div>
		<li class="nav-item">
			<div class="search">
				<input type="search" id="search" placeholder="rechercher votre produit" role="search" v-model="searchQuery">
				<a
					class="item"
					style="margin: auto; cursor: pointer;"
					ref="search"
					@click="search"
				>
					<i class="material-icons loupe">search</i>
				</a>
			</div>
		</li>
		<div class="nav-end" ref="navend">
			<li
				class="nav-item"
				
			>
				<a
					href="#"
					class="item"
					@click="showLogin"
					v-if="!isLogged"
				>
				<i class="material-icons item">login</i>
				<span>Connexion</span>
				</a>
			</li>
			<li
				class="nav-item"
				v-if="isLogged"
				@click="logOut"
			>
				<a href="#" class="item">
				<i class="material-icons item">logout</i>
				<span >Déconnexion</span>
				</a>
			</li>
			<li class="nav-item" v-if="isLogged">
				<router-link class="item" to="/profile">
					<i class="material-icons item">account_circle</i>
					<span >Profile</span>
				</router-link>
			</li>
			<li class="nav-item" v-if="isLogged">
				<router-link to="/favorites" class="item">
				<i class="material-icons item">favorite</i>
				<span >Favoris</span>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/cart" class="item" style="position: relative;">
				<i class="material-icons item">shopping_cart</i>
				<span>Panier</span>
				<span class="cart-article"> {{ cart }}</span>
				</router-link>
			</li>
		</div>
		<i
			class="material-icons element"
			@click="showItems"
		>
			dialpad
		</i>

		<LoginRegister
			v-if="modal"
			@close="closeModal"
			@loggedIn="loggedIn"
		/>
	</nav>
</template>

<script>
import { ref } from '@vue/reactivity'
import LoginRegister from './LoginRegister.vue'
import { signOutUser } from '@/lib/firestoreLib'

export default {
	components:{
		LoginRegister
	},
	data(){
		return {
			searchQuery: '',
			rss: null,
			s1to500: window.matchMedia("(min-width: 1px) and (max-width: 500px)"),
			show: false
		}
	},
	props: ["cart", "rs"]
	,
	methods:{
		search(){
			if (this.searchQuery)
			this.$emit("search", this.searchQuery)
		},
		showItems(){
			this.$refs.navend.classList.toggle("active")
		},
		goHome(){
			window.location.href="/"
		}
	},
	setup(){

		let modal = ref(false)
		let isLogged = ref(false)
		
		let user = localStorage.getItem("user")

		const showLogin = ()=>{
			modal.value = true
		}

		const closeModal = ()=>{
			modal.value = false
		}

		const logOut = async ()=>{
			signOutUser()
			localStorage.removeItem("user")
			isLogged.value = false
			window.location.href = "/"
		}

		const loggedIn = (user)=>{
			isLogged.value = true
			closeModal()
		}

		if (user){
			user = JSON.parse(user)
			loggedIn()
		}

		return { 
			modal,
			isLogged,
			showLogin,
			closeModal,
			loggedIn,
			logOut
		}
	}

}
</script>

<style>
	img.logo{
		background-color: var(--white);
		border-radius: 20%;
		width: 5rem;
		height: 4.5rem;
	}

	.goHome{
		cursor: pointer;
	}

	nav.navbar{
		z-index: 10;
		position: sticky;
		top: 0;
		height: 6rem;
		background-color: var(--black);
	}

	.nav-item, div.nav-end, .search, nav.navbar{
	display: flex;
	flex-direction: row;
	justify-content: space-around;  
	align-items: center;
	}

	.nav-item{
		flex-direction: column;
		margin: 0 .5rem;
		padding: 0 .5rem;
		font-size: 2rem;
		list-style-type: none;
	}

	.item{
		color: var(--white);
		text-decoration: none;
	}

	.search{
		justify-content: flex-start;
		width: 50rem;
		height: 4rem;
		background-color: var(--white);
		overflow: hidden;
		border-radius: 1rem;
		border: .5px solid var(--white);
		align-items: center;
	}

	#search{
		width: calc(100% - 24px);
		padding: .5rem;
		text-align: center;
		font-size: 1.8rem;
		outline: none;
		border: none;
	}

	.cart-article{
		text-align: center;
		height: 2.2rem;
		width: 2.2rem;
		font-size: 2.2rem;
		position: absolute;
		top: 0%;
		left: 50%;
		background-color: var(--white);
		border-radius: 50%;
		color: var(--black);
	}

	.material-icons.loupe{
		color: var(--white);
		font-size: 4rem;
		background-color: var(--black);
	}

	.material-icons.item{
		font-size: 3.5rem;
	}

	.router-link-active{
		color: var(--green);
	}

	.element{
		display: none;
	}

	.router-link-active{
		color: var(--green);
	}
</style>