<template>
  <i
  class="material-symbols-outlined support"
  @click="$router.push('/admin/dashboard')"
  v-if="admin">settings</i>
</template>

<script>
import { auth, findOne } from '@/lib/firestoreLib'
export default {
  name: 'Support',
  data(){
    return {
      admin: false
    }
  },
  async mounted(){
    await new Promise(r=>setTimeout(r, 1000))
    findOne("users", auth?.currentUser?.uid)
    .then(user=>this.admin = user.role === "admin")
  }
}
</script>

<style>
.material-symbols-outlined.support{
  color: var(--white);
  cursor: pointer;
  font-size: 8rem;
  position: fixed;
  right: 5%;
  bottom: 5%;
}
</style>