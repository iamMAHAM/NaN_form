<template>
	<div class="dashboard">
		<div class="c1-dash">
			<div class="r1-dash">
				<img src="https://firebasestorage.googleapis.com/v0/b/health-4d90f.appspot.com/o/profiles%2Fadmin.png82159c80-f49d-474b-9b23-aea81e1ef1ea?alt=media&token=52836ca1-b282-449b-a4ce-ead71fdb4c58" class="profile">
				<h2 class="lastName">Kabore</h2>
				<p>Admin</p>
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
			<p class="currentTitle">USERS</p>
			<div class="c2-users">
				<div class="user">
					<img src="">
					<span>Name</span>
					<span>role</span>
					<select>
						<option value="user">user</option>
						<option value="doctor">doctor</option>
						<option value="vendor">vendor</option>
					</select>
					<i class="material-icons">delete</i>
					<button>Update</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getAll} from '@/lib/firestoreLib';
export default {
	name: 'AdminPanel'
}
</script>

<style>
	.c2-dash,
	.r2-dash-row,
	.dashboard{
		align-items: center;
		display: flex;
		flex-direction: row;
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
		width: calc(100% - 20rem);
		flex-direction: column;
		justify-content: space-between;
	}

</style>