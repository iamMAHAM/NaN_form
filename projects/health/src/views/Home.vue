<template>
	<div class="container">
		<SideBar @rs="emittoo"/>
		<ArticleContent
			:data="searchResult"
			:load="load"
			:isSearch="search"
			@fav="checkLog"
		/>
		
		<LoginRegister
			v-if="modal"
			@close="closeModal"
			@loggedIn="loggedIn"
		/>
	</div>
	<i
		class="material-icons settingsss"
		@click="this.$router.push('/admin/dashboard')"
		>settings
	</i>
</template>

<script>
import SideBar from '@/views/home/SideBar.vue'
import ArticleContent from './home/ArticleContent.vue';
import LoginRegister from '@/components/LoginRegister.vue';

export default {
	name: 'Home',
	props: ['searchResult', 'isSearch', 'load'],
	data(){
		return {
			modal: false,
			isLogged: false,
			search: false,
		}
	},
	updated(){
		this.search = this.isSearch
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
			this.closeModal()
		},
		emittoo(rs){
			this.$emit("rs", rs)
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

	.settingsss{
		color: var(--red);
		cursor: pointer;
		position: fixed;
		left: 1rem;
		bottom: 1rem;
		font-size: 5rem;
	}
</style>
