<template>
  <!-- in vue 2.x you need wrap these buttons in a div -->
  <i class="carousel-control cleft material-symbols-outlined" @click="$emit('prev')">arrow_back_ios</i>
  <i class="carousel-control cright material-symbols-outlined" @click="$emit('next')">arrow_forward_ios</i>
</template>

<script>
export default {
  emits: ["prev", "next"], // vue v3
};
</script>
<style scoped>
.carousel-control {
  font-size: 25px;
  border: none;
  display: inline-block;
  position: absolute;
  height: 50px;
  top: calc(50% - 25px);
  color: var(--white);
  cursor: pointer;
}
.cleft {
  left: 0;
}
.cright {
  right: 0;
}
</style>
