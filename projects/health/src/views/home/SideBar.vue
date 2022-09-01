<template>
	<div class="side-bar">
		<i class="material-icons apps"
			ref="rs"
			v-if="match"
			@click="toggle"
		>
			apps
		</i>
		<p class="cat" v-if="!match">CATEGORIES</p>
		<div class="side-contents" v-show="show">
			<router-link tag="div" to="/drugs" class="side-row">
				<i class="material-icons">medication</i>
				<span class="side-content" v-if="!match">Médicaments</span>
			</router-link>
			<router-link tag="div" to="/health" class="side-row">
				<i class="material-icons">health_and_safety</i>
				<span class="side-content" v-if="!match">Soins et Santé</span>
			</router-link>
			<router-link tag="div" to="/beautyHygiene" class="side-row">
				<i class="material-icons">spa</i>
				<span class="side-content" v-if="!match">Beauté et Hygiène</span>
			</router-link>
			<router-link tag="div" to="/babyPregnancy" class="side-row">
				<i class="material-icons">pregnant_woman</i>
				<span class="side-content" v-if="!match">Bebe et Grossesse</span>
			</router-link>
			<router-link tag="div" to="/slimmingSport" class="side-row">
				<i class="material-icons">sports_hockey</i>
				<span class="side-content" v-if="!match">Sport</span>
			</router-link>
			<router-link tag="div" to="/veterinary" class="side-row">
				<i class="material-icons">pets</i>
				<span class="side-content" v-if="!match">Véterinaires</span>
			</router-link>
			<router-link tag="div" to="/medicalMaterials" class="side-row">
				<i class="material-icons">medical_services</i>
				<span class="side-content" v-if="!match">Matériels Médicaux</span>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SideBar',
	props: ['searchResult', 'isSearch'],
	data(){
		return {
			mounted: true,
			match: false,
			s1to768 : window.matchMedia("(min-width: 1px) and (max-width: 768px)"),
			s1to500: window.matchMedia("(min-width: 1px) and (max-width: 500px)"),
			show: true
		}
	},
	methods: {
		toggle(){
			this.show =! this.show
		}
	},
	mounted(){
		if (this.s1to768.matches){
			this.match = true
			this.$emit("rs", this.match)
		}

		window.onresize = ()=>{
			if (this.s1to768.matches) this.match = true
			else this.match = false
			this.$emit("rs", this.match)
		}
	},
	updated(){
		if (this.s1to768.matches){
		}
	}
}
</script>

<style>
	.cat{
		color: var(--white);
		background: var(--black);
		padding: 1rem;
		border-bottom: .1rem solid var(--white);
		border-radius: .5rem .5rem 0 0;
	}
	div.side-bar{
		text-align: center;
		height: max-content;
		position: sticky;
		top: 30%;
		left: 2%;
	}

	.side-row,
	div.side-content{
		display: flex;
		flex-direction: column;
	}

	div.side-contents{
		background-color: var(--black);
		padding: 1.5rem;
		width: max-content;
		border-radius: 0 0 .5rem .5rem;
	}

	.side-row{
		color: var(--white);
		margin: 1rem 0;
		width: max-content;
		flex-direction: row;
		align-items: center;
		font-size: 2rem;
	}

	.side-row .material-icons{
		margin: 0 .6rem;
	}

	.router-link-active{
		color: var(--green);
	}

</style>