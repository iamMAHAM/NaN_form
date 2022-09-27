<template>
  <i
  class="material-symbols-outlined support"
  @click="$router.push({ path: '/admin/dashboard', query: { uid: uid } })"
  v-if="isAdmin">settings</i>
</template>

<script>
export default {
  name: 'Settings',
  props: ['isAdmin', 'uid']
}
</script>

<style>
.material-symbols-outlined.support{
  color: var(--white);
  cursor: pointer;
  font-size: 6rem;
  position: fixed;
  right: 5%;
  bottom: 5%;
}
</style>