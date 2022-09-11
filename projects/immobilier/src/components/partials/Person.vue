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
          v-if="person?.isverified"
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
  props: ['infos'],
  data(){
    return {
      person: {
        id: '123',
        fullName: 'Abdul Mahamoudou Kabore',
        isverified: true,
        lastMessage: {
          date: '12:30',
          message: {
            type: 'img',
            content: 'hello'
          }
        }
      }
    }
  },
  methods: {
    showConversation(){
      this.$emit("switch", this.person.lastMessage)
    }
  },
  update(){
    console.log("paul")
  },
  mounted(){
    console.log("infos", this.infos)
    this.person = this.infos
  }
}
</script>

<style>
.imgLog{
  height: 5rem;
  width: 5rem;
}

.pi{
  margin: auto 0;
  font-size: 2rem !important;
}
</style>