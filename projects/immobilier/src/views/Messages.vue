<template>
  <div class="case">
  <div class="container">
    <div class="left">
      <div class="top">
        <div class="tub">
          <div class="username">

          </div>
        </div>
      </div>
      <div class="conversations">
        <Person
          v-for="conversation in conversations" :key="conversation.id"
          @switch="switchMessages"
          />
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="box">
          <div class="image">
            <img src="../assets/test.jpg" width="30px" height="30px"/>
          </div>
          <div class="online"></div>
        </div>
        <div class="information">
          <div class="username">
            <a href="#">
              iamMAHAM
              <i class="material-symbols-outlined">verified_user</i>
            </a>
          </div>
          <div class="name">Active now</div>
        </div>
        <div class="options">
        </div>
      </div>
      <div class="middle">
        <div class="tumbler">
          <div class="messages" ref="messages">
            <div
              v-for="message in messages" :key="message.id"
              :class="message.who === 'me' ? ' clip sent' : 'clip received'"
            >
              <i class="material-symbols-outlined delete" v-if="message.who === 'me'">delete</i>
              <div
                v-if="message.message.type === 'text'"
                class="text"
              >
                {{ message.message.content }}
                <span class="date">{{message.timestamp}}</span>
              </div>
              <img v-else
                class="text"
                :src="message.message.content"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="cup">
          <div class="picker">
            <i class="material-symbols-outlined">mood</i>
          </div>
          <textarea
            id="message"
            cols="30"
            rows="1"
            placeholder="Message..."
            ref="textarea"
            @input="dropMessage"
            @keydown="sendSMS"
            v-model="message"
          >
          </textarea>
          <button
            class="send"
            v-show="show"
            ref="send"
            @click="sendSMS"
          >
              <i class="material-symbols-outlined">send</i>
          </button>
          <div class="picker photo">
            <input
              @change="sendPhoto"
              type="file"
              accept="*.png; *.jpeg; *.svg"
              id="photof"
              style="display: none;"
              ref="tof"
            >
            <label for="photof" style="cursor: pointer;">
              <i class="material-symbols-outlined">imagesmode</i>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Person from '@/components/partials/Person.vue'
import { find } from '@/lib/firestoreLib'
import { onSnapshot, collection, query, orderBy, addDoc } from '@firebase/firestore'
import { db } from '@/lib/firebaseConfig'
export default {
  name: 'Messages',
  components: {
    Person
  },
  data(){
    return {
      messages:[        
      ],
      conversations:[
        {
          id: 'knfienfiezf',
          messages: [
            {
            id: 1,
            who: 'me',
            message: {
              type: 'text',
              content: 'salut comment tu vas ?'
            },
            timestamp: 1111111111,
            },
            {
              id: 2,
              who: 'me',
              message: {
                type: 'image',
                content: 'https://images.unsplash.com/photo-1657664049378-c8aadfe323f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              },
              timestamp: 1111111211,
            },
            {
              id: 3,
              who: 'me',
              message: {
                type: 'text',
                content: 'on devait se voir odhui non ? je ne suis pas fan de ça hein donc dis mo ce qui ne vas pa en même temps'
              },
              timestamp: 11113431111,
            },
            {
              id: 1,
              who: 'you',
              message: {
                type: 'text',
                content: 'salut comment tu vas ?'
              },
              timestamp: 1111111111,
            },
            {
              id: 2,
              who: 'you',
              message: {
                type: 'image',
                content: 'https://images.unsplash.com/photo-1657664049378-c8aadfe323f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              },
              timestamp: 1111111211,
            },
            {
              id: 3,
              who: 'you',
              message: {
                type: 'text',
                content: 'on devait se voir odhui non ? je ne suis pas fan de ça hein donc dis mo ce qui ne vas pa en même temps'
              },
              timestamp: 11113431111,
            },
          ]
        }
      ],
      message: '',
      show: false
    }
  },
  methods:{
    dropMessage(){
      const textarea = this.$refs.textarea
      const scrollHeight = textarea.scrollHeight
      this.show = this.message.trim().length > 0 ? true : false
      textarea.style.height = scrollHeight + 'px'
    },
    sendSMS(e){
      if (e.key==='Enter' && this.message.trim().length > 0 || e.target.textContent === 'send'){
        const d = new Date().toLocaleString().split(" ")[1];
        this.messages.push({
          id: '0',
          who: 'me',
          message: {
            type: 'text',
            content: this.message
          },
          timestamp: d
        })
        this.message = ''
      }
    },
    sendPhoto(e){
      const d = new Date().toLocaleString();
      this.messages.push({
        id: 'msms',
        who: 'me',
        message: {
          type: 'image',
          content: 'https://images.unsplash.com/photo-1661956600654-edac218fea67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
        },
        timestamp: d
    })
  },
  deleteMessage(e){
    console.log("clicked for handle delete error")
  },
  showConversation(e){
    console.log(e.target.parentElement)
    if (e.target.className === 'person'){
      console.log("bingo")
    }
  },
  switchMessages(cMessages){
    console.log("haha", cMessages)
    this.messages = cMessages
  }
  },
  mounted(){
    console.log("mounted")
    const q = query(collection(db, 'messages'))
    onSnapshot(q, snap=>{
      console.log(snap.docs.map(doc=>console.log(doc)))
    })
    // find("/messages/XAzeR0W8rrLMHKmGr4EE/W9StKsYWYG8J8ElNY4Gr", '', 'timestamp')
    // .then(messages=>{
    //   this.messages = messages
    // })
  },
}
</script>

<style>

.navigation {
  width: 100%;
  min-height: 60px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  border: 0.5px solid #76767637;
}

.case {
  margin-top: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.case .container {
  height: 50vh;
  width: 60%;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  border: 0.5px solid #76767637;
}

img {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.left {
  min-width: 350px;
  max-width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.left > .top {
  position: relative;
  min-height: 60px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 0.5px solid #76767637;
  display: flex;
  align-items: center;
}

.left > .top > .tub {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  width: 100%;
}
.left > .top > .tub > .username {
  max-width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 5px;
}

.left > .top > .tub > .username > .down-arrow {
  cursor: pointer;
}

.left > .top > .card {
  position: absolute;
  padding: 0 10px;
  right: 10px;
}
.left > .top > .card > button {
  background-color: #ffffff;
  border: 0.5px solid #76767637;
  padding: 4px 8px;
  color: #323232;
  font-weight: 700;
  font-size: 12px;
  border-radius: 12px;
  cursor: pointer;
}
.left > .top > .card > button:hover {
  color: #767676;
}

.left > .conversations {
  overflow-y: scroll;
  height: 100%;
  padding: 10px 0 0 0;
  overflow-x: hidden;
}

.conversations > .person {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  gap: 10px;
}

.conversations > .person:hover {
  background-color: #f0f0f0af;
  cursor: pointer;
}

.conversations > .person > .information {
  
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  overflow: hidden;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.conversations > .person > .information > .username {
  
  font-size: 14px;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 4px;
  width: 100%;
  align-items: center;
}

.conversations > .person > .information > .content {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  color: black;
}

.conversations > .person > .information > .content > .message {
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Roboto";
  color: #000000;
}

.conversations > .person > .information > .content > .new {
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Roboto";
  color: black;
  font-weight: 700;
}

.conversations > .person > .box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.conversations > .person > .box > .image {
  width: clamp(50px, 50px, 50px);
  height: clamp(50px, 50px, 50px);
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.conversations > .person > .box > .online {
  min-width: 1.1rem;
  min-height: 1.1rem;
  background-color: lawngreen;
  border-radius: 100%;
  position: absolute;
  border: 3px solid white;
  right: 0;
  bottom: 0;
}

.conversations > .person > .status {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}

.conversations > .person > .status > .point {
  min-height: 8px;
  min-width: 8px;
  background-color: #0084ff;
  border-radius: 100%;
}

.right {
  border-left: 0.5px solid #76767637;
  width: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.right > .top {
  width: 100%;
  display: flex;
  min-height: 60px;
  align-items: center;
  padding: 0 20px;
  border-bottom: 0.5px solid #76767637;
  gap: 1rem;
}

.right > .top > .box {
  position: relative;
  min-width: 30px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right > .top > .box > .image {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 100%;
  overflow: hidden;
}

.right > .top > .box > .online {
  position: absolute;
  min-width: 12px;
  min-height: 12px;
  background-color: lawngreen;
  border-radius: 100%;
  border: 2px solid #ffffff;
  right: 0;
  bottom: 0;
}

.right > .top > .information {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  gap: 0;
  text-overflow: ellipsis;
}

.right > .top > .information > .username,
.name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  
}
.right > .top .information > .username {
  font-weight: 400;
  font-size: 15px;
  display: flex;
}
.blue-tick {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: default;
}

.right > .top > .information > .username > a {
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2.5px;
}

.right > .top .information > .name {
  font-weight: 400;
  font-size: 12px;
  color: #707070;
}

.right > .top > .options {
  display: flex;
  align-items: center;
  justify-content: center;
}

.right > .top > .options > .info {
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.right > .middle {
  background-color: #ffffff;
  height: inherit;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
}

.messages {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 2.5px;
}

.clip {
  display: flex;
  position: relative;
}

.clip > .text {
  position: relative;
  font-size: 14px;
  font-weight: 400;
  max-width: 50%;
  padding: 8px 16px;
  border-radius: 20px;
  word-break: keep-all;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.received > .text {
  background-color: white;
  border: 0.5px solid #80808080;
}

.sent > .text {
  background-color: #0084ff;
  color: white;
}

.sent {
  flex-direction: row-reverse;
}

.seen {
  text-align: right;
  padding: 0 10px;
  
  font-size: 0.75rem;
  font-weight: 400;
  color: gray;
}

.right > .bottom {
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
}

.cup {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 0.5px solid #7676765c;
  width: 100%;
  gap: 10px;
  padding: 2px 15px;
  border-radius: 40px;
  overflow: hidden;
}

.cup > .picker {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: clamp(35px, 35px, 35px);
  height: clamp(35px, 35px, 35px);
  user-select: none;
}

.cup > textarea {
  font-size: 1.6rem;
  font-weight: 400;
  border: none;
  outline: none;
  padding: 0 5px;
  width: 100%;
  resize: none;
  max-height: 100px;
}

.cup > .send {
  cursor: pointer;
  border: none;
  padding: 5px 10px;
  background-color: transparent;
  font-size: 14px;
  font-weight: 700;
  color: #0084ff;
}

.send:disabled {
  color: #0084ff8d;
}

.img-sent{
  width: 100%;
}

.delete{
  font-size: unset !important;
  cursor: pointer;
  color: red;
  font-weight: 200;
  position: absolute;
  top: .5rem;
  z-index: 2;
  transform: translateY(-50%);
  right: .1rem;
}

.date{
  font-weight: 500;
  text-align: center;
  font-size: .6rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
}

.time{
  font-size: 1rem;
}
@media only screen and (max-width: 950px) {
  .container {
    border-top: none;
    width: 100%;
    height: 100%;
  }
}

</style>