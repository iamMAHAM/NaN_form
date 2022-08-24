<template>
	<div class="side-bar">
		<div class="side-content">
			<router-link to="/drugs" class="side-row">
				<i class="material-icons">medication</i>
				<span class="side-content">Drugs</span>
			</router-link>
			<router-link to="/healthy" class="side-row">
				<i class="material-icons">health_and_safety</i>
				<span class="side-content">Health</span>
			</router-link>
			<router-link to="/beautyHi" class="side-row">
				<i class="material-icons">spa</i>
				<span class="side-content">Beauty and Hygiene</span>
			</router-link>
			<router-link to="/babyP" class="side-row">
				<i class="material-icons">pregnant_woman</i>
				<span class="side-content">Baby and Pregnancy</span>
			</router-link>
			<router-link to="/slimmingSport" class="side-row">
				<i class="material-icons">sports_hockey</i>
				<span class="side-content">Slimming and Sport</span>
			</router-link>
			<router-link to="/veterinary" class="side-row">
				<i class="material-icons">pets</i>
				<span class="side-content">Veterinary</span>
			</router-link>
			<router-link to="/medicalMaterials" class="side-row">
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

	div.side-bar{
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
		margin-top: 2rem;
		padding: 1.5rem;
		width: max-content;
		border-radius: .5rem;
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

</style>