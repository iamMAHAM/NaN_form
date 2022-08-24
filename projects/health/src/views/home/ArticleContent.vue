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
		/>
	</div>
  </div>
</template>

<script>
import { getAll } from '@/lib/firestoreLib';
import Banner from './partials/Banner.vue';
import Card from './partials/Card.vue';

export default {
	name: 'Article Content',
	components: {
		Banner,
		Card
	},
	data(){
		return {
			cards: [],
			isLoading: true
		}
	},
	mounted(){
		getAll(`data/Ho21xA8W3774097vSXhU/${this.$route.params.route}`, (result)=>{
			this.cards = result
			this.isLoading = false
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