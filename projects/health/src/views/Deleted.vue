<template>
	<div class="parent-deleted">
		<div class="deleted" v-if="show">
			  <h1>COMPTE SUPPRIMÉE</h1>
			  <p>Désolé votre compte <a href="tel:+"></a> été supprimée car il ne respectait pas nos standard</p>
			  <p>Contacter l'administration pour plus d'infos</p>
			  <button
			  	@click="$router.push('/')"
			  	>Revenir à L'Accueil
			</button>
		</div>
	</div>
</template>

<script>
import { isLoggedUser } from '@/lib/firestoreLib';
export default {
	data(){
		return {
			show: false
		}
	},
	mounted(){
		document.querySelector("nav.navbar").style.display = "none"
		isLoggedUser((d, user)=>{
			console.log(d, user)
			user ? this.$router.push("/404") : this.show = true
		})
	},
	unmounted(){
		document.querySelector("nav.navbar").style.display = "flex"
	}
}
</script>

<style>

	.deleted{
		font-size: 2.2rem;
		letter-spacing: .5rem;
	}
	button{
		text-transform: uppercase;
		cursor: pointer;
		font-size: 3rem;
		padding: 2rem;
		margin: 1rem;
		color: var(--black);
	}

	button:hover{
		color: var(--white);
		background: var(--black);
	}
	.parent-deleted{
		position: absolute;
		z-index: 100;
		height: 100vh;
		width: 100vw;
		background: var(--black);
	}
	.deleted{
		margin: 1rem;
		color: var(--white);
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>