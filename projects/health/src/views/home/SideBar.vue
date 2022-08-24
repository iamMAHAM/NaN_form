<template>
	<div class="side-bar">
		<p class="cat">CATEGORIES</p>
		<div class="side-content">
			<router-link tag="div" to="/drugs" class="side-row">
				<i class="material-icons">medication</i>
				<span class="side-content">Drugs</span>
			</router-link>
			<router-link tag="div" to="/healthy" class="side-row">
				<i class="material-icons">health_and_safety</i>
				<span class="side-content">Health</span>
			</router-link>
			<router-link tag="div" to="/beautyHi" class="side-row">
				<i class="material-icons">spa</i>
				<span class="side-content">Beauty and Hygiene</span>
			</router-link>
			<router-link tag="div" to="/babyP" class="side-row">
				<i class="material-icons">pregnant_woman</i>
				<span class="side-content">Baby and Pregnancy</span>
			</router-link>
			<router-link tag="div" to="/slimmingSport" class="side-row">
				<i class="material-icons">sports_hockey</i>
				<span class="side-content">Slimming and Sport</span>
			</router-link>
			<router-link tag="div" to="/veterinary" class="side-row">
				<i class="material-icons">pets</i>
				<span class="side-content">Veterinary</span>
			</router-link>
			<router-link tag="div" to="/medicalMaterials" class="side-row">
				<i class="material-icons">medical_services</i>
				<span class="side-content">Medical Materials</span>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {

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

	div.side-content{
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