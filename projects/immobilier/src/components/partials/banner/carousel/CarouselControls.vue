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
  opacity: 0;
  padding: 1rem;
  font-size: 25px;
  border: none;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: calc(50% - 25px);
  color: var(--navcolor);
  background: var(--white);
  cursor: pointer;
}
.cleft {
  left: 0;
}
.cright {
  right: 0;
}
</style>
