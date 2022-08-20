<template>
	<div class="card">
		<div class="card-top">
			<i class="material-icons pointer" style="color: var(--green);">check_circle</i>
			<i class="material-icons pointer favorite">favorite</i>
		</div>
		<div class="card-main">
			<img src="../../../assets/med.png" alt="medoc image" class="card-images" />
			<div class="card-description">
				<p class="medoc-title">doliprane</p>
				<small class="medoc-desc">Lorem ipsum dolor sit, amet consectetur adipisicing</small>
			</div>
		</div>
		<div class="pricing">
			<p class="price">9.99 €</p>
			<i class="material-icons pointer">add_shopping_cart</i>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style>
	div.card{
		overflow: hidden;
		border-radius: .5rem;
		text-align: center;
		border: .5px solid black;
		position: relative;
		height: 27rem;
		margin: auto;
		width: 30rem;
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

	img.card-images{
		width: 70%;
		height: calc(100% - 5rem);
	}

	.medoc-title{
		font-size: 2.3rem;
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

	.pointer{
		cursor: pointer;
	}
</style>