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
			<h1 class="currentTitle">DASHBOARD</h1>
			<div class="statistique">
				<div class="normal">
					<span>users : </span>
					<span>{{ users.length }}</span>
				</div>
				<div class="doctors">

				</div>
				<div class="vendors">

				</div>
				<div class="total">

				</div>
			</div>
			<div class="c2-users">
				<User v-for="user in users" :user="user" :key="user.id"/>
			</div>
		</div>
	</div>
</template>

<script>
import { getAll} from '@/lib/firestoreLib';
import User from './partials/User.vue';

export default {
	name: 'AdminPanel',
	data(){
		return {
			users: [
				{
					names: "Tapsoba Parfait",
					role: "User",
					avatar: "https://firebasestorage.googleapis.com/v0/b/health-4d90f.appspot.com/o/profiles%2Fadmin.png82159c80-f49d-474b-9b23-aea81e1ef1ea?alt=media&token=52836ca1-b282-449b-a4ce-ead71fdb4c58",
				},
				{
					names: "Affou Ouattara",
					role: "Doctor",
					avatar: "https://firebasestorage.googleapis.com/v0/b/health-4d90f.appspot.com/o/profiles%2Fadmin.png82159c80-f49d-474b-9b23-aea81e1ef1ea?alt=media&token=52836ca1-b282-449b-a4ce-ead71fdb4c58",
				},
				{
					names: "Kionou Mohamed",
					role: "Doctor",
					avatar: "https://firebasestorage.googleapis.com/v0/b/health-4d90f.appspot.com/o/profiles%2Fadmin.png82159c80-f49d-474b-9b23-aea81e1ef1ea?alt=media&token=52836ca1-b282-449b-a4ce-ead71fdb4c58",
				},
				{
					names: "Beugre Desnos Jeremie",
					role: "Vendor",
					avatar: "https://firebasestorage.googleapis.com/v0/b/health-4d90f.appspot.com/o/profiles%2Fadmin.png82159c80-f49d-474b-9b23-aea81e1ef1ea?alt=media&token=52836ca1-b282-449b-a4ce-ead71fdb4c58",
				}
			]
		}
	},
	components: {
		User
	}
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

	::-webkit-scrollbar {
  width: .5rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: red;
}

</style>