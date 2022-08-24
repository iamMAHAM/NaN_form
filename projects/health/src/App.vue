<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/store">Store</router-link>
    <router-link to="/contact">About</router-link>
    <router-link to="/contact">Contact</router-link>
  </nav> -->
    <NavBar :cart="cart"/>
    <router-view :key="$route.fullPath"/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getAll } from './lib/firestoreLib'

export default{
    name:'App',
    components: {
        NavBar
    },
	data(){
		return {
			cart: 0
		}
	},
	updated(){
		const user = JSON.parse(localStorage.getItem("user"))
		console.log("app updated")
		if (user){
			getAll(`users/${user.id}/cart`, (res)=>{
				console.log("res", res)
				this.cart = res.length
			})
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
