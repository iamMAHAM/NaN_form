<template>
	<div class="user">
		<img class="user-image" src="https://firebasestorage.googleapis.com/v0/b/health-4d90f.appspot.com/o/profiles%2Fadmin.png82159c80-f49d-474b-9b23-aea81e1ef1ea?alt=media&token=52836ca1-b282-449b-a4ce-ead71fdb4c58">
		<span class="names">{{user.names}}</span>
		<select class="roles" v-model="user.role">
			<option value="User">user</option>
			<option value="Doctor">doctor</option>
			<option value="Vendor">vendor</option>
		</select>
		<i class="material-icons xray">delete</i>
		<button class="update">Update</button>
	</div>
</template>

<script>
export default {
	props: ["user"]
}
</script>

<style>
	.user{
		margin: 1rem;
		align-self: center;
		max-width: max-content;
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
		width: 10rem;
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
		padding: .5rem;
		border-radius: 1rem;
		background: var(--green);
		color: var(--white);
		border-color: white;
	}
</style>