<template>
  <div class="card-container">

  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'CardContainer',
  components: {
    Card
  }
}
</script>

<style>
.card-container {
  width: 1100px;
  margin: 100px auto;
  display: flex;
  justify-content: space-between;
}

.card-container .box {
  width: calc((100% / 3) - 20px);
  background-color: white;
  position: relative;
}
</style>