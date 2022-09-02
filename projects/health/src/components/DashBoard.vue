<template>
	<div class="dashboard">
		<div class="c1-dash">
			<div class="r1-dash">
				<img :src="admin.avatar" class="profile">
				<h2 class="lastName">{{admin.lastName}}</h2>
				<p> {{admin.role}} </p>
			</div>
			<div class="r2-dash">
				<div class="r2-dash-row">
					<i class="material-icons">group</i>
					<span class="row-title">Users</span>
				</div>
				<div class="r2-dash-row">
					<i class="material-icons">settings</i>
					<span class="row-title">Settings</span>
				</div>
				<div class="r2-dash-row">
					<i class="material-icons">message</i>
					<span class="row-title">Messages</span>
				</div>
			</div>
		</div>
		<div class="c2-dash">
			<h1 class="currentTitle">DASHBOARD</h1>
			<div class="statistique">
				<div class="normal">
					<p>users : <span>{{ users.filter(u => u.role === "user").length}}</span> </p>
					<p>doctors: <span>{{ users.filter(u => u.role === "doctor").length}}</span></p>
					<p>vendor: <span>{{ users.filter(u => u.role === "vendor").length}}</span></p>
				</div>
			</div>
			<div class="c2-users">
				<User
					v-for="user in users"
					:user="user"
					:key="user.id"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import User from './partials/User.vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { auth} from '@/lib/firestoreLib';

export default {
	name: 'AdminPanel',
	data(){
		return {
			users: [
			],
			admin: {}
		}
	},
	components: {
		User
	},
	mounted(){
		const user = JSON.parse(localStorage.getItem("user"))
		if (user && user.role !== "admin" || !user){
			this.$router.push("/404")
			return
		}
		onSnapshot(collection(db, "users"), (snap)=>{
			let inter = []
			snap.docs.map(d => inter.push(d.data()))
			this.users = inter.filter(u => u.role !== "admin")
			this.admin = inter.filter(u => u.role === "admin")[0]
		})
		// getAll("users", (data)=>{
		// 	this.users = data.filter(u => u.role !== "admin")
		// 	this.admin = data.filter(u => u.role === "admin")[0]
		// })
	},
}
</script>

<style>
	.user,
	.c2-dash,
	.r2-dash-row,
	.dashboard{
		display: flex;
		flex-direction: row;
	}

	.dashboard{
		height: 90vh;
	}

	.c1-dash{
		min-width: 20rem;
		color: var(--black);
		background: var(--white);
		padding: 2rem;
	}

	.c1-dash img{
		width: 12rem;
		width: 12rem;
		border-radius: 50%;
	}

	.r1-dash{
		text-align: center;
	}

	.row-title{
		margin: .5rem;
	}

	.c2-dash{
		background: #f3f4f6;
		width: calc(100% - 20rem);
		/* align-items: unset; */
		align-items: center;
		flex-direction: column;
	}

	.currentTitle{
		padding: 2rem;
		text-align: center;
	}

	.c2-users{
		overflow: scroll;
	}

	.normal{
		display: flex;
		flex-direction: row;
	}

	.normal p{
		padding: 1rem;
		font-size: 2.2rem;
	}

	.normal p span{
		color: var(--green);
	}


	::-webkit-scrollbar {
  		width: .5rem;
	}

	/* Track */
	::-webkit-scrollbar-track {
	background: var(--white);
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		border-radius: .5rem;
		background: var(--black);
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: var(--green);
	}

</style>