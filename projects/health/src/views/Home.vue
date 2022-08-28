<template>
	<div class="container">
		<SideBar />
		<ArticleContent
			:data="searchResult"
			:isSearch="isSearch"
			@fav="checkLog"
		/>
		
		<LoginRegister
			v-if="modal"
			@close="closeModal"
			@loggedIn="loggedIn"
		/>
	</div>
</template>

<script>
import SideBar from '@/views/home/SideBar.vue'
import ArticleContent from './home/ArticleContent.vue';
import LoginRegister from '@/components/LoginRegister.vue';

export default {
	name: 'Home',
	props: ['searchResult', 'isSearch'],
	data(){
		return {
			modal: false,
			isLogged: false,
			search: true,
		}
	},
	methods: {

		checkLog(){
			const user = JSON.parse(localStorage.getItem("user"))
			if (!user){
				this.modal = true
			}
		},
		closeModal(){
			this.modal = false
		}
		,
		loggedIn(){
			this.isLogged = true
			closeModal()
		}
	},

	components: {
		SideBar,
		ArticleContent,
		LoginRegister
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
