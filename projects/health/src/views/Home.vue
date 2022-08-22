<template>
	<div class="container">
		<SideBar />
		<ArticleContent />
	</div>
</template>

<script>
import SideBar from '@/views/home/SideBar.vue'
import ArticleContent from './home/ArticleContent.vue';
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    SideBar,
    ArticleContent
}
}
</script>

<style>
	div.banner,
	.article-content,
	div.container{
		display: flex;
		flex-direction: row;
		gap: 5%;
	}

	.article-content{
		flex-direction: column;
		margin: 0 3rem;
	}
</style>
