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
  </div>
</template>

<script>
import { getAll, saveOrOverride, unSaveDoc } from '@/lib/firestoreLib';
import Banner from './partials/Banner.vue';
import Card from './partials/Card.vue';

export default {
	name: 'Article Content',
	components: {
		Banner,
		Card
	},
	updated(){
		console.log("updated")
	},
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
		}
	},
	mounted(){
		const user =  JSON.parse(localStorage.getItem("user"))
		console.log(this.$route.params.route)
		let collect = null
		if (this.$route.params.route != 'favorites'){
			collect = `data/Ho21xA8W3774097vSXhU/${this.$route.params.route}`
		}else {
			collect = `users/${user.id}/favorites`
		}
		getAll(collect, (result)=>{
			if (user){
				getAll(`users/${user.id}/favorites`, (favorites)=>{
					result.map((c, i) => {
						if (favorites.some(fav => c.id === fav.id )){
							result[i].isFav = true
						}else{
							result[i].isFav = false
						}
						result[i].isLoad = false
					})
					this.cards = result
					this.isLoading = false
				})
			}
		})
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
</style>