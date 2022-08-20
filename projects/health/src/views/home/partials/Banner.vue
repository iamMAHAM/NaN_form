<template>
	<div class="banner">
		<div class="banner-content">
			<p class="t">The first Ivory Coast online pharmacy</p>
			<div>
			<i class="material-icons">local_shipping</i>
			<span>24/7</span>
			</div>
			<div>
			<i class="material-icons">map</i>
			<span>Everywhere in Ivory Coast</span>
			</div>
			<div>
			<i class="material-icons">medication</i>
			<span>More than 30.000 products</span>
			</div>
		</div>
		<img src="../../../assets/network.png" alt="pharma network" class="banner-image">
	</div>
</template>

<script>
export default {

}
</script>

<style>
	div.banner{
		margin-top: 1rem;
		border: 1px solid black;
	}

	div.banner-content{
		font-size: 2.5rem;
		margin: auto;
	}

	.banner-content div{
		display: flex;
		margin: 1rem 0;
		align-items: center;
		justify-content: flex-start;
	}

	.banner-content .material-icons{
		padding: 1rem;
		background-color: var(--green);
		color: var(--white);
		font-size: 4rem;
		border-radius: 50%;
		border: .1rem solid var(--green);
	}

	.banner-content span{
		margin: 0 1rem;
	}

	.t{
		color: var(--black);
		font-weight: bold;
		font-size: 3.5rem;
	}

	img.banner-image{
		margin: auto;
		width: 50%;
		height: 70%;
	}
</style>