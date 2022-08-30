<template>
    <NavBar :cart="cart" @search="perfSearch" :rs="rs"/>
    <router-view
		:key="$route.fullPath"
		:searchResult="result"
		:isSearch="isSearch"
		:load="load"
		@rs="es"
	/>
	<Discussion v-if="user"/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Discussion from './components/Discussion.vue'
import { getAll, matchFields, allCategories } from './lib/firestoreLib'

export default{
    name:'App',
    components: {
        NavBar,
        Discussion
    },

	methods:{
		async perfSearch(queryString){
			this.isSearch = true
			this.result = []
			this.load = true
			await matchFields(allCategories, queryString, (result)=>{
				this.result = result
			})
		},
		es(rs){
			console.log("rs received", rs)
			this.rs = rs
		}
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
			isSearch: false,
			load: false,
			user: false,
			rs: null
		}
	},
	updated(){
		const user = JSON.parse(localStorage.getItem("user"))
		const length = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0
		if (user){
			this.user = true
			getAll(`users/${user.id}/cart`, (res)=>{
				this.cart = res.length
			})
		}else{ //no logged in user
			this.cart = length
		}
	},
	mounted(){
		try {
			const user = JSON.parse(localStorage.getItem("user"))
			if (user){
				this.user = true
			}
		} catch (e) {
			console.log(e)
			this.user = false
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
