<template>
  <i
  data-tooltip="admin"
  class="material-symbols-outlined support"
  @click="$router.push({ path: '/admin/dashboard', query: { uid: uid } })"
  v-if="isAdmin">admin_panel_settings</i>
</template>

<script>
export default {
  name: 'Settings',
  props: ['isAdmin', 'uid'],
}
</script>

<style>
.material-symbols-outlined.support{
  color: var(--greenfun);
  cursor: pointer;
  font-size: 5rem;
  position: fixed;
  right: 5%;
  top: 10%;
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48;
}

.support[data-tooltip]:hover::before{
  font-size: 1.5rem;
  animation: showTooltip 200ms linear 100ms forwards;
  background: var(--navcolor);
  color: var(--white);
  text-transform: lowercase;
}
</style>