<template>
	<nav class="navbar">
		<div class="nav-start">
		<img src="../assets/logo.png" alt="logo image" class="logo">
		</div>
		<li class="nav-item">
		<div class="search">
			<input type="search" id="search" placeholder="search your product" role="search">
			<a href="#" class="item" style="margin: auto;">
			<i class="material-icons loupe">search</i>
			</a>
		</div>
		</li>
		<div class="nav-end">
		<li
			class="nav-item"
			
		>
			<a
				href="#"
				class="item"
				@click="showLogin"
			>
			<i class="material-icons item">login</i>
			Login
			</a>
		</li>
		<li class="nav-item" v-if="isLogged">
			<a href="#" class="item" v-if="isLogged">
			<i class="material-icons item">logout</i>
			Logout
			</a>
		</li>
		<li class="nav-item" v-if="isLogged">
			<a href="#" class="item">
			<i class="material-icons item">account_circle</i>
			Profile
			</a>
		</li>
		<li class="nav-item">
			<a href="#" class="item">
			<i class="material-icons item">favorite</i>
			Favorite
			</a>
		</li>
		<li class="nav-item">
			<a href="#" class="item" style="position: relative;">
			<i class="material-icons item">shopping_cart</i>
			Cart
			<span class="cart-article">0</span>
			</a>
		</li>
		</div>
		<LoginRegister v-if="modal" @close="closeModal" />
	</nav>
</template>

<script>
import { ref } from '@vue/reactivity';
import LoginRegister from './LoginRegister.vue';

export default {
	components:{
		LoginRegister
	},

	setup(){
		let modal = ref(false)
		let isLogged = ref(false)
		
		const showLogin = ()=>{
			modal.value = true
		}

		const closeModal = ()=>{
			console.log("close event")
			modal.value = false
		}

		const addToCart = ()=>{
			
		}

		return { 
			modal,
			isLogged,
			showLogin,
			closeModal,
		}
	}

}
</script>

<style>
	img.logo{
		background-color: var(--white);
		border-radius: 20%;
		width: 8rem;
		height: 7rem;
	}

	nav.navbar{
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
		position: absolute;
		left: 50%;
		color: var(--green);
	}

	.material-icons.loupe{
		color: var(--white);
		font-size: 4rem;
		background-color: var(--black);
	}

	.material-icons.item{
		font-size: 3.5rem;
	}
</style>