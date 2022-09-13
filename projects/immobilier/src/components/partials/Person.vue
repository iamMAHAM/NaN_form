<template>
  <div
    @click="showConversation"
    :id="person?.id"
    class="person"
  >
    <div class="box">
      <div class="image">
          <img
            src="../../assets/test.jpg"
            class="imgLog"
          />
      </div>
      <div class="online"></div>
    </div>
    <div class="information">
      <div class="username">
        {{ person?.fullName }}
        <i
          v-if="person?.isVerified"
          class="material-symbols-outlined"
        >
          verified_user
        </i>
      </div>
      <div class="content">
        <div class="message">
          <b>You :</b>
          <span
            v-if="person?.lastMessage.message.type === 'text'"
          >
            {{ person?.lastMessage.message.content }}
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
export default {
  name: 'Person',
  props: ['person', 'messages'],
  methods: {
    showConversation(){
      console.log(this.person)
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