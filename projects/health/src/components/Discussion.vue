<template>
    <div class="discussion">
        <i class="material-icons"
			@click="show = !show"
			>chat_bubble
		</i>
        <div class="discussion-main" v-show="show">
            <span>Health Chat</span>
            <div class="messages" ref="messages">
				<div class="row"
					:id="message.id"
					v-for="message in messages"
					:key="message.id"
					:class="message.id === user.id ? 'me' : 'you'"
					@dblclick="handleClick"
				>
					<div class="row-r">
						<img
							class="user_img"
							:src="message.avatar"
							>
						<div>
							<p>{{ message.role }}</p>
							<p class="username">{{message.lastName}}</p>
						</div>
					</div>
					<p
						>
						{{ message.content}}
					</p>
				</div>
				</div>
            <div class="bottom">
                <input
					ref="message"
					type="text"
					placeholder="entrez votre message"
					v-model="message"
				/>
                <i
					class="material-icons"
					@click="sendMessage"
				>
					send
				</i>
            </div>
        </div>
    </div>
</template>

<script>

import {sendMessage} from '@/lib/firestoreLib'
import { onSnapshot, collection, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'

export default {
	name: 'Discussion',
	data(){
		return {
			message: '',
			messages: [],
			user: {},
			target_id: '', //admin variable only,
			show: false
		}
	},
	methods:{
		async sendMessage(){
			const message = {
				avatar: this.user.avatar,
				id: this.user.id,
				timestamp: serverTimestamp(),
				content: this.message,
				lastName: this.user.lastName,
				role: this.user.role
			}
			if (this.user.id === "8F1bKGaOUOAZGV0blD74"){ // admin to user
				await sendMessage(this.target_id, message)
			} else{
				await sendMessage(this.user.id, message) // user to admin and user
			}
			this.message = ''
		},
		handleClick(e){
			let  target = e.target
			target = target.classList.contains("row") ? target : target.parentElement
			this.target_id = target.id
			target.classList.toggle("active")
		}
	},
	async mounted(){
		const user = JSON.parse(localStorage.getItem("user"))
		this.user = user
		const q = query(collection(db, `chat/${user.id}/messages`), orderBy('timestamp'))
		onSnapshot(q, (snap)=>{
			this.messages = []
			snap.docs.map(m => this.messages.push({...m.data()}))
		})
	}
}
</script>

<style>
    .discussion{
        position: fixed;
        display: flex;
        flex-direction: row;
        right: 3rem;
        bottom: 2.2rem;
    }

    .discussion> .material-icons{
        align-self: flex-end;
        cursor: pointer;
        color: var(--green);
        font-size: 5rem;
    }

    .discussion-main{
		background: var(--gray);
		height: 50rem;
        position: relative;
        min-height: 35rem;
        border: 1px solid var(--white);
        text-align: center;
        width: 35rem;
    }

    .discussion span{
        padding: 1rem;
        display: block;
        color: var(--white);
        background: var(--black);
        font-size: 2rem;
        width: 100%;
    }

    .discussion-main .bottom{
		border: none;
        display: flex;
        width: 100%;
        position: absolute;
        bottom: .1rem;
        align-items: center;
        left: 0;
        /* background: var(--black); */
    }

    .discussion-main .bottom .material-icons{
        cursor: pointer;
        border: none;
		border-collapse: collapse;
        border-left: 1px solid var(--black);
        height: 100%;
        font-size: 3rem;
        color: var(--black);
        background: var(--white);
    }

    .bottom input{
        text-align: center;
        border: none;
        outline: none;
        display: block;
        width: calc(100% - 3rem);
        padding: .5rem;
        font-size: 1.7rem;
    }

	.row{
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 3rem;
		margin: 5px;
		flex-wrap: wrap;
	}

	.me, .you{
		/* margin: .5rem;
		padding: .5rem; */
		border-radius: .5rem;
		max-width: 20rem;
	}

	.me{
		justify-content: right;
		background: #d9fdd2;
		float: right;
	}

	.messages{
		overflow-Y: scroll;
		height: calc(100% - 7rem);
	}
	.you{
		justify-content: left;
		float: left;
		background: var(--white);
	}

	.row.active::after{
		color: var(--red);
		font-family: "Material Icons";
		position: absolute;
		content: '\e5c4';
		right: 0;
		bottom: 0;
	}

	.user_img{
		width: 20px;
		height: 20px;
	}

	.row-r{
		background: var(--gray);
		color: var(--black);
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.row .row-r{
		border-radius: 5px;
	}

	/* .row :nth-child(2){
	} */

	.row.me .row-r{
		justify-content: end;
	}

	/* .row.me .row-r div{
	}

	.row.you .row-r div{
	} */

	.row.you .row-r{
		justify-content: start;
	}

	.row-r div :nth-child(1){
		font-weight: bold;
	}

	p.username{
		background-color: none;
	}

</style>