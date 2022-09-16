<template>
	<div class="user">
		<img class="user-image" :src="user.avatar">
		<span class="names">{{user.firstName}} {{user.lastName}}</span>
		<select class="roles" v-model="user.role">
			<option value="user">user</option>
			<option value="doctor">doctor</option>
			<option value="vendor">vendor</option>
		</select>
		<i
			class="material-icons xray"
			@click="deleteUser"
		>
			delete
		</i>
		<button
			class="update"
			@click="update"
		>
			Update
		</button>
	</div>
</template>

<script>
import { updateUserInfo, unSaveDoc,} from '@/lib/firestoreLib';
export default {
	props: ["user"],
	methods:{
		async update(){
			updateUserInfo(this.user.id, this.user)
			.then(alert("user updated with success"))
			.catch(e=>console?.log(e))
		},
		async deleteUser(){
			if (window.confirm("really delete this user ?")){
				console.log(this.user)
				unSaveDoc("users", this.user.id)
			}
		}
	}
}
</script>
<style>
	.user{
		margin: 1rem;
		align-self: center;
		width: 50rem;
		border-radius: 1rem;
		background: var(--white);
		padding: 1rem;
		text-align: center;
		align-items: center;
		justify-content: center;
	}
	.user *{
		margin: .5rem;
	}
	.names{
		width: 15rem;
	}
	.user-image{
		width: 2rem;
		height: 2rem;
	}
	.xray{
		cursor: pointer;
		color: var(--red);
	}
	.roles{
		border-color: #f3f4f6;
		font-size: 1.8rem;
		cursor: pointer;
	}
	.xray:active{
		color: var(--white);
		background: var(--red);
	}
	.update{
		cursor: pointer;
		width: 20rem;
		padding: .5rem;
		border-radius: 1rem;
		background: var(--green);
		color: var(--white);
		border-color: white;
	}
</style>