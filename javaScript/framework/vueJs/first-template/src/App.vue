<template>
	<Preloader />
	<NavBar />
	<router-view/>
	<Footer />
</template>

<script>
import NavBar from './components/NavBar.vue';
import Preloader from '@/components/Preloader.vue';
import Footer from './components/Footer.vue';

export default{
	name: 'App',
	components:{
		NavBar,
		Preloader,
		Footer
	}
}
</script>
<style>
nav a.router-link-exact-active {
  color: #e75e8d !important;
}
</style>
