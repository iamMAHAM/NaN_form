<template>
  <div
    @click="showConversation"
    :id="'user-'+person?.id"
    class="person"
  >
    <div class="box">
      <div class="image">
          <img
            :src="person?.avatar"
            class="imgLog"
          />
      </div>
      <!-- <div class="online"></div> -->
    </div>
    <div class="information">
      <div class="username">
        {{ person?.fullName }}
        <i
          v-if="person?.isVerified"
          class="material-symbols-outlined verified"
        >
          verified
        </i>
      </div>
      <div class="content">
        <div class="message">
          <b>{{person?.lastMessage?.senderId === auth?.currentUser?.uid  ? 'you' : 'him'}} : </b>
          <span
            v-if="person?.lastMessage?.message?.type === 'text'"
          >
            {{ person?.lastMessage?.message?.content?.slice(0, 25) }}...
          </span>
          <i
            v-else
            class="material-symbols-outlined pi"
          >
            imagesmode</i>
        </div>
        <div class="time">&bull; {{ person?.lastMessage?.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/lib/firestoreLib';

export default {
  name: 'Person',
  props: ['person', 'messages'],
  emits: ['switch'],
  data(){
    return {auth: auth}
  },
  methods: {
    showConversation(){
      this.$emit("switch", [this.messages, this.person])
    }
  }
}
</script>

<style>
.imgLog{
  height: 5rem;
  width: 5rem;
}

.imgLog.e{
  height: 3rem;
  width: 3rem;
}

.pi{
  margin: auto 0;
  font-size: 2rem !important;
}
</style>