<template>
  <Modal ref="modal"/>
  <div class="messages-container">
      <div class="case">
        <Loader v-if="load"/>
      <div class="container" v-else>
        <div class="left">
          <div class="top">
            <div class="tub">
              <div class="username">
                <img :src="auth?.currentUser?.photoURL" width="3rem" height="3rem" ref="img"/>
                <span>{{ auth?.currentUser?.displayName }}</span>
              </div>
            </div>
          </div>
          <div class="conversations">
            <div
                v-if="!load && !conversations.length"
                class="notFound"
            >
              <i class="material-symbols-outlined">filter_none</i>
              Aucune Conversation
            </div>
            <Person
              v-else
              v-for="conversation in conversations" :key="conversation.id"
              :person="conversation.info"
              :messages="conversation.messages.sort(compare)"
              @switch="switchMessages"
            />
          </div>
        </div>
        <div class="right" v-if="conversations.length">
          <div class="top" v-if="pers">
            <div class="box">
              <div class="image">
                <img :src="pers?.avatar" class="imgLog e"/>
              </div>
              <!-- <div class="online"></div> -->
            </div>
            <div class="information">
              <div class="username">
                <a href="#">
                  {{ pers?.fullName}}
                  <i
                    class="material-symbols-outlined verified"
                    title="compte verifié"
                      v-if="pers?.isVerified"
                    >
                      verified
                  </i>
                </a>
              </div>
              <!-- <div class="name">Active now</div> -->
              <div class="name">{{ pers?.role }}</div>
            </div>
            <div class="options">
            </div>
          </div>
          <div v-else class="top">selectionnez une conversation</div>
          <div class="middle">
            <div class="tumbler">
              <div class="messages" ref="messages">
                <div
                  v-for="message in messages" :key="message.id"
                  :id="message?.id"
                  :class="message?.senderId === uid ? ' clip sent' : 'clip received'"
                >
                  <i
                    class="material-symbols-outlined delete"
                    v-if="message?.senderId === auth?.currentUser.uid"
                    @click="deleteMessages"
                  >
                    delete
                  </i>
                  <div
                    v-if="message?.message?.type === 'text'"
                    class="text"
                  >
                    {{ message?.message.content }}
                    <router-link v-if="message?.message?.link.startsWith('/details')" :to="message.message.link" class="link">voir le lien</router-link>
                    <span class="date">{{ readableDate(message.timestamp) }}</span>
                  </div>
                  <img v-else
                    class="text"
                    :src="message?.message?.content"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="bottom" v-if="pers">
            <div class="cup">
              <div class="picker">
                <i
                  class="material-symbols-outlined"
                  @click="toggle"
                >
                  mood
                </i>
              </div>
              <Emojis
                ref="emoji"
                class="show-emoji"
                @emoji_click="addEmoji"
              />
              <textarea
                id="message"
                cols="30"
                rows="1"
                placeholder="Message..."
                ref="textarea"
                @input="dropMessage"
                @keydown="sendMessages"
                @paste="dropMessage"
                v-model="message"
              >
              </textarea>
              <button
                class="send"
                v-show="show"
                ref="send"
                @click="sendMessages"
              >
                  <i class="material-symbols-outlined">send</i>
              </button>
              <div class="picker photo">
                <input
                  @change="sendMessages"
                  type="file"
                  accept=".png, .jpeg, .svg"
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
  </div>
</template>
<script>
import Person from '@/components/partials/Person.vue'
import Emojis from "@/components/partials/Emojis.vue"
import { rtdb } from "@/lib/firebaseConfig"
import {  auth, deleteMessage, sendMessage, uploadImage } from '@/lib/firestoreLib'
import { onValue, ref as dbref, query as dbquery } from "firebase/database"
import Loader from '@/components/partials/Loader.vue'
import Modal from '@/components/partials/Modal.vue'
const compare = ( a, b )=>{
  if ( a.timestamp < b.timestamp ){
    return -1;
  }
  if ( a.timestamp > b.timestamp ){
    return 1;
  }
  return 0;
}

const waitForElm = (selector)=>{
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const urlRegex = /\bhttps?:\/\/\S+/gi

export default {
  name: 'Messages',
  components: {
    Person,
    Emojis,
    Loader,
    Modal
  },
  props: ['searchData', 'isLogged'],
  data(){
    return {
      messages:[],
      conversations:[],
      message: '',
      show: false,
      load: true,
      uid: '',
      pers: null,
      compare: compare,
      auth: auth,
      link: ''
    }
  },
  methods:{
    linkOrNot(message){
      const res = message.match(urlRegex)
      return res ? res[0] : null
    },
    toggle(){
      document.querySelector(".emoji_picker").classList.toggle("active")
    },
    addEmoji(emoji){
      this.message+= emoji
    },
    readableDate(timestamp){
      const hours = new Date(timestamp).toLocaleString().replace("à", '').trim().split(" ")
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      return isSafari ? hours[2] : hours[1]
    },
    dropMessage(){
      const textarea = this.$refs.textarea
      const scrollHeight = textarea.scrollHeight
      this.show = this.message.trim().length > 0
      textarea.style.height = scrollHeight + 'px'
    },
    async sendMessages(e){
      await new Promise(async r=>{
        let type = null, content = null
        if (e.target === this.$refs.tof){
          const url = await uploadImage(`images/messages/${auth?.currentUser?.uid}/${e.target.files[0].name}`, e.target.files[0])
          type = 'image'
          content = url
        }else{
          type = 'text'
          content = this.message.trim()
        }
        r([type, content])
      }).then(([type, content])=>{
        if (!((e.key==='Enter' || e.target.textContent === 'send' || e.target === this.$refs.tof) 
        && content.length > 0)) return
        const hasUrl = this.message.match(urlRegex)
        const link =  hasUrl ? hasUrl[0] : null
        const a = document.createElement("a")
        a.href = link
        sendMessage(this.uid, this.pers.id,{
          message:{
            type: type,
            content: content.replace(link, ''),
            link: a.pathname
          }
        }).then((message)=>{
          this.message = ''
          this.$refs.textarea.style.height = '16px'
        }
        ).catch(e=>{
          this.$refs.modal.show({
            type: 'error',
            title: 'Erreur',
            display: false,
            errorMessage: e?.code ? e?.code : e?.message,
          })
        })
      })
    },
  deleteMessages(e){
    const message = e.target.parentElement
    deleteMessage(this.uid, this.pers.id, message.id)
  },
  switchMessages([cMessages, person]){
    this.messages = cMessages
    this.pers = person
  }
  },
  beforeMount(){
    if (!auth?.currentUser) this.$router.push("/auth")
  },
  async mounted(){
    Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {}
    );
    this.uid = auth?.currentUser?.uid
    const conversations = dbref(rtdb, `messages/${auth?.currentUser?.uid}`);
    const q = dbquery(conversations)
    onValue(q, async (snapshot) => {
      const inter = []
      const data = snapshot.val();
      
      await new Promise((r=>{
        if (data){
          for (const [k, v] of Object.entries(data)){
            const filtered = Object.filter(v, v=> !v.hasOwnProperty("fullName"))
            const messages = []
            for (const [kc, vc] of Object.entries(filtered)){
              messages.push(vc)
            }
            inter.push({
              info: v.info,
              messages: messages
            })
          }
        }
        r(inter)
      })).then(inter=>{
        this.conversations = inter
        this.load = false
        const ab = inter.filter(c => c?.info?.id === this.pers?.id)
        this.messages = ab[0]?.messages.sort(compare)
      })
    }
    )
    if (this.$route.query.id){
      const id = this.$route.query.id
      const message = this.$route.query.template
      this.message = JSON.parse(message)?.message?.content
      const conversation = await waitForElm(`#user-${id}`)
      conversation.click()
      const textarea = await waitForElm("textarea")
      textarea.style.height = "100px"
      this.$router.replace("/messages")
    }
  },

}
</script>

<style>

.messages-container{
  height: 100vh;
}
.navigation {
  width: 100%;
  min-height: 6rem;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  border: 0.5rem solid #76767637;
}

.case {
  margin-top: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.case .container {
  height: 70vh;
  width: 70%;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  border: 0.05rem solid #76767637;
}

img {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.left {
  min-width: 35rem;
  max-width: 35rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.left > .top {
  position: relative;
  min-height: 6rem;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 0.05rem solid #76767637;
  display: flex;
  align-items: center;
}

.left > .top > .tub {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  width: 100%;
}
.left > .top > .tub > .username {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: .5rem;
}

.left > .top > .tub > .username img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.left > .top > .tub > .username > .down-arrow {
  cursor: pointer;
}

.left > .top > .card {
  position: absolute;
  padding: 0 1rem;
  right: 1rem;
}
.left > .top > .card > button {
  background-color: #ffffff;
  border: 0.5rem solid #76767637;
  padding: .4rem .8rem;
  color: #323232;
  font-weight: 700;
  font-size: 1.2rem;
  border-radius: 1.2rem;
  cursor: pointer;
}
.left > .top > .card > button:hover {
  color: #767676;
}

.left > .conversations {
  overflow-y: scroll;
  height: 100%;
  padding: 1rem 0 0 0;
  overflow-x: hidden;
}

.conversations > .person {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  gap: 1rem;
}

.conversations > .person:hover {
  background-color: #f0f0f0af;
  cursor: pointer;
}

.conversations > .person > .information {
  
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: .4rem;
  width: 100%;
  overflow: hidden;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.conversations > .person > .information > .username {
  
  font-size: 1.4rem;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: .4rem;
  width: 100%;
  align-items: center;
}

.conversations > .person > .information > .content {
  display: flex;
  align-items: center;
  gap: .5rem;
  width: 100%;
  color: black;
}

.conversations > .person > .information > .content > .message {
  display: flex;
  align-items: center;
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
  width: clamp(5rem, 5rem, 5rem);
  height: clamp(5rem, 5rem, 5rem);
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
  border: .3rem solid white;
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
  min-height: .8rem;
  min-width: .8rem;
  background-color: var(--green);
  border-radius: 100%;
}

.right {
  border-left: 0.05rem solid #76767637;
  width: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.right > .top {
  width: 100%;
  display: flex;
  min-height: 6rem;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 0.05rem solid #76767637;
  gap: 1rem;
}

.right > .top > .box {
  position: relative;
  min-width: 3rem;
  min-height: 3rem;
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
  min-width: 1.2rem;
  min-height: 1.2rem;
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
  font-size: 1.4rem;
  
}
.right > .top .information > .username {
  font-weight: 400;
  font-size: 1.5rem;
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
}

.right > .top .information > .name {
  font-weight: 400;
  font-size: 1.2rem;
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
  padding: 1rem;
  gap: 2.05rem;
}

.clip {
  display: flex;
  position: relative;
}

.clip > .text {
  position: relative;
  font-size: 1.4rem;
  font-weight: 400;
  max-width: 65%;
  padding: .8rem 16px;
  border-radius: 2rem;
  word-break: keep-all;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.received > .text {
  background-color: white;
  border: 0.05rem solid #80808080;
}

.sent > .text {
  margin: .3rem;
  background-color: var(--green);
  color: var(--navcolor);
}

.sent {
  flex-direction: row-reverse;
}

.seen {
  text-align: right;
  padding: 0 1rem;
  
  font-size: 0.75rem;
  font-weight: 400;
  color: gray;
}

.right > .bottom {
  position: relative;
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.4rem 2.8rem;
}

.cup {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 0.05rem solid #7676765c;
  width: 100%;
  gap: 1rem;
  padding: 2px 1.5rem;
  border-radius: 4rem;
  overflow: hidden;
}

.cup > .picker {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: clamp(3.5rem, 3.5rem, 3.5rem);
  height: clamp(3.5rem, 3.5rem, 3.5rem);
  user-select: none;
}

.cup > textarea {
  font-size: 1.6rem;
  font-weight: 400;
  border: none;
  outline: none;
  padding: 0 .5rem;
  width: 100%;
  resize: none;
  max-height: 100px;
}

.cup > .send {
  cursor: pointer;
  border: none;
  padding: .5rem 1rem;
  background-color: transparent;
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--navcolor);
}

.send:disabled {
  color: #0084ff8d;
}

.img-sent{
  width: 100%;
}

.delete{
  font-size: 1.3rem !important;
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
/* .left{
  border-right: .1rem solid rgba(0, 0, 0, .2);
} */

.top{
  border-bottom: .1rem solid rgba(0, 0, 0, .2);
}

@media only screen and (max-width: 1100px) {
  .case .container {
    border-top: none;
    width: 90%;
    height: 70vh;
  }
}

@media only screen and (max-width: 770px){
  .case .container {
    width: 98%;
  }
  .left{
    min-width: 20rem;
  }
}

@media only screen and (max-width: 505px){
  .left{
    max-width: 8rem;
    min-width: 5rem;
  }
}

.notFound{
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
}

.verified{
  color: var(--greenfun);
  font-size: 2rem !important;
}

.show-emoji{
  display: none !important;
}

.show-emoji.active{
  display: block !important;
}

.link{
  text-decoration: underline;
  color: var(--hovercolor);
  display: block;
  text-align: center;
  position: relative;
}

.link:hover{
  color: var(--red);
}
</style>