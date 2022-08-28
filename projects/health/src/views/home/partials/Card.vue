<template>
	<div class="card" :id="card.id" v-if="card.image">
		<div class="card-top">
			<i class="material-icons pointer" style="color: var(--green);">check_circle</i>
			<i :class="`material-icons pointer favorite ${card.isFav ? 'isfav' : ''}`"
				@click="favoriteHandler"
				v-if="!card.isLoad"
			>
				favorite
			</i>
			<img src="../../../assets/loading.gif" v-if="card.isLoad" class="wait waitd">
		</div>
		<div class="card-main">
			<router-link tag="div" :to="`detail/${card.origin}/${card.id}`" class="router">
				<img :src="card.image" alt="medoc image" class="card-images" />
			</router-link>
			<div class="card-description">
				<p class="medoc-title">{{ card.title }}</p>
				<small class="medoc-desc">{{ card.description }}</small>
			</div>
		</div>
		<div class="pricing">
			<p class="price">{{ card.price }} FCFA</p>
			<i class="material-icons pointer">add_shopping_cart</i>
		</div>
	</div>
</template>

<script>

export default {
	props: ['card', 'fav', 'load'],
	methods: {
		favoriteHandler(e){
			if (e.target.classList.contains("isfav")){
				this.$emit("removeFav", this.card)
			}else{
				this.$emit("addFav", this.card)
			}
		}
	},
	mounted(){
		console.log(this.card)
	}
}
</script>

<style>
	.card{
		background-color: var(--white);
		overflow: hidden;
		border-radius: .5rem;
		text-align: center;
		/* border: .5px solid black; */
		position: relative;
		height: 27rem;
		margin: 1rem auto;
		width: 18%;
		flex-direction: column;
	}

	div.pricing,
	div.card-top{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	i.status{
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}

	i.favorite{
		color: rgb(88, 87, 87);
		cursor: pointer;
	}

	i.favorite:hover{
		color: red;
	}

	.card-images{
		display: block;
		margin: 0 auto;
		width: 70%;
		height: 15rem;
	}

	.medoc-title{
		font-size: 2.3rem;
	}

	div.card-description{
		color: var(--black);
	}

	div.pricing{
		position: absolute;
		bottom: 0;
		width: 100%;
		font-size: 1.8rem;
		align-items: center;
		background-color: var(--black);
		justify-content: center;
		color: var(--white);
	}

	.router{
		position: relative;
		display: block;
		height: calc(100% - 5rem);
	}

	.pointer{
		cursor: pointer;
	}

	.isfav{
		color: var(--red) !important;
	}

	.waitd{
		border-radius: 50%;
	}
</style>