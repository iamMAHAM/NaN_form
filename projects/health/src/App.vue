<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/store">Store</router-link>
    <router-link to="/contact">About</router-link>
    <router-link to="/contact">Contact</router-link>
  </nav> -->
    <NavBar :cart="cart" @search="perfSearch" />
    <router-view
		:key="$route.fullPath"
		:searchResult="result"
		:isSearch="isSearch"
	/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getAll } from './lib/firestoreLib'

export default{
    name:'App',
    components: {
        NavBar
    },

	methods:{
		perfSearch(queryString){
			this.isSearch = true
			this.result = []
			let inter = []
			this.allCategories.forEach(async (cat)=>{
				await getAll(`data/Ho21xA8W3774097vSXhU/${cat}`, (data)=>{
					const filtered = data.filter(el => el.title ? el.title.toLowerCase().includes(queryString.toLowerCase()) : '')
					if (filtered.length){
						inter.push(...filtered)
					}
				}
				)
				console.log(inter.length)
				this.result = inter
			})
		}
	},
	mounted(){
		this.$emit("great")
	},
	data(){
		return {
			cart: 0,
			result: [],
			allCategories: [
				'healthy',
				'home',
				'medicalMaterials',
				'slimmingSport',
				'veterinary',
				'beautyHi',
				'babyP',
				'drugs'
			],
			isSearch: false
		}
	},
	updated(){
		const user = JSON.parse(localStorage.getItem("user"))
		const length = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0
		if (user){
			getAll(`users/${user.id}/cart`, (res)=>{
				this.cart = res.length
			})
		}else{ //no logged in user
			this.cart = length
		}
	}
}

</script>
<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html{
    font-size: 62.5%;
}

body{
    font-size: 1.6rem;
	background: #e2dcdc;
}

:root{
    --black: #1b1b32;
    --white: #fefefe;
    --green: #04a750;
    --gray: #E0E0E0;
	--red: red;
}

a{
    text-decoration: none;
}
</style>
