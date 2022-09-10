<template>
  <div
    @click="showConversation"
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
        {{ person.fullName }}
        <i
          v-if="person.isverified"
          class="material-symbols-outlined"
        >
          verified_user
        </i>
      </div>
      <div class="content">
        <div class="message"><b>You :</b>{{ person.lastMessage.message }}</div>
        <div class="time">&bull; {{ person.lastMessage.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Person',
  props: ['infos', 'styles'],
  data(){
    return {
      person: {
        fullName: 'Abdul Mahamoudou Kabore',
        isverified: true,
        lastMessage: {
          date: '12:30',
          message: 'hello'
        }
      }
    }
  },
  methods: {
    showConversation(){
      this.$emit("switch", this.person.lastMessage)
    }
  }
}
</script>

<style>
.imgLog{
  height: 5rem;
  width: 5rem;
}
</style>