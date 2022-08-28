<template>
  <div class="article-content">
	<Banner />
	<img src="../../assets/loading.gif" v-if="isLoading" class="loading">
	<div class="cards" v-if="!isLoading">
		<Card
			v-for="card in cards"
			:key="card.id"
			:card="card"
			:path="$route.params.route"
			@addFav="addFavs"
			@removeFav="removeFavs"
		/>
	</div>
	<!-- <div
		class="nosearch"
		v-if="isSearch && !cardLength
		&&
		!isLoading"
	>
		Oups ! Il n y'a aucun resultat
	</div> -->
  </div>
</template>

<script>
import { getAll, saveOrOverride, unSaveDoc, auth } from '@/lib/firestoreLib';
import Banner from './partials/Banner.vue';
import Card from './partials/Card.vue';

export default {
	name: 'Article Content',
	components: {
		Banner,
		Card
	},
	props: ['data', 'isSearch'],
	methods: {
		addFavs: function (card){ // add to favorite
			const index = this.cards.indexOf(card)
			this.cards[index].isLoad = true
			const user =  JSON.parse(localStorage.getItem("user"))
			if (!user){
				this.$emit('fav')
				return
			}
			saveOrOverride(`users/${user.id}/favorites`, card.id, card, ()=>{
				this.cards[index].isFav = true
				this.cards[index].isLoad = false
			})
		},
		removeFavs: async function (card){ // remove to favorite
			const user =  JSON.parse(localStorage.getItem("user"))
			const index = this.cards.indexOf(card)
			this.cards[index].isLoad = true
			await unSaveDoc(`users/${user.id}/favorites`, card.id)
			this.cards[index].isFav = false
			this.cards[index].isLoad = false

		}
	},
	data(){
		return {
			cards: [],
			isLoading: true,
			cardLength: 0,
			allCategories: [
				'healthy',
				'home',
				'medicalMaterials',
				'slimmingSport',
				'veterinary',
				'beautyHi',
				'babyP',
				'drugs'
			]
		}
	},
	mounted(){
		console.log(auth.currentUser)
		const user =  JSON.parse(localStorage.getItem("user"))
		const route = this.$route.params.route
		let collect = null
		if (this.allCategories.includes(route)){
			collect = `data/Ho21xA8W3774097vSXhU/${route}`
		}else if(route === "favorites"){
			collect = `users/${user.id}/favorites`
		}else{
			this.$router.push("/404")
		}
		getAll(collect, async (result)=>{
			if (user){
				await getAll(`users/${user.id}/favorites`, (favorites)=>{
					result.map((c, i) => {
						if (favorites.some(fav => c.id === fav.id )){
							result[i].isFav = true
						}else{
							result[i].isFav = false
						}
						result[i].isLoad = false
					})	
				})
			}
			this.cards = result
			this.isLoading = false
		})
	},
	updated(){
		if (!this.isSearch){ //no search case
			console.log("no search so i do nothing")
		} else{
			this.cards = this.data
			console.log("data length", this.data.length)
			// const target_copy = JSON.parse(JSON.stringify(this.data))
			// console.log(target_copy)
			// // this.cards.forEach(card=> console.log(card))
		}
	}
}
</script>

<style scoped>
	.cards{
		margin: auto;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.loading{
		margin: auto;
		width: 20rem;
		border-radius: 1rem;
	}

	.nosearch{
		color: var(--black);
		text-align: center;
		font-size: 3rem;
	}
</style>