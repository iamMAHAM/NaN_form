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
					:class="message.id === user_id ? 'me' : 'you'"
					@dblclick="handleClick"
				>
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
			user_id: '',
			target_id: '', //admin variable only,
			show: false
			
		}
	},
	methods:{
		async sendMessage(){
			const message = {
				id: this.user_id,
				timestamp: serverTimestamp(),
				content: this.message
			}
			if (this.user_id === "8F1bKGaOUOAZGV0blD74"){ // admin to user
				await sendMessage(this.target_id, message)
			} else{
				await sendMessage(this.user_id, message) // user to admin and user
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
		this.user_id = user.id
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
        position: absolute;
        display: flex;
        flex-direction: row;
        right: 3rem;
        bottom: 2.2rem;
    }

    .discussion> .material-icons{
        align-self: flex-end;
        cursor: pointer;
        color: var(--black);
        font-size: 5rem;
    }

    .discussion-main{
		height: 50rem;
        position: relative;
        min-height: 35rem;
        border: 1px solid var(--white);
        text-align: center;
        width: 30rem;
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
        justify-content: center;
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
		min-height: 3rem;
	}

	.me, .you{
		margin: .5rem;
		padding: .5rem;
		border-radius: .5rem;
		max-width: 20rem;
	}

	.me{
		justify-content: center;
		background: #d9fdd2;
		float: right;
	}

	.messages{
		overflow-Y: scroll;
		height: calc(100% - 7rem);
	}
	.you{
		float: left;
		background: var(--white);
	}

	.row.active::after{
		color: var(--red);
		font-family: "Material Icons";
		position: absolute;
		content: '\e5c4';
		right: 0;
		top: -10%;
	}

</style>