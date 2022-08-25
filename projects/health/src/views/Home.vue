<template>
	<div class="container">
		<SideBar />
		<ArticleContent
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
// @ is an alias to /src

export default {
	name: 'Home',
	data(){
		return {
			modal: false,
			isLogged: false,
			user: JSON.parse(localStorage.getItem("user"))
		}
	},
	methods: {

		checkLog(){
			if (!this.user){
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
