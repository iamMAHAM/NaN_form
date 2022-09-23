<template>
  <div class="wrapper-sp"
    :style="{
      height: view + 'vh'
    }"
  >
    <div id="loading"
      :style="{
        height: height + 'px',
        width: width + 'px',
        borderTopColor: color
      }"
    >
  </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: ['view', 'height', 'width', 'color']
}
</script>

<style>
.wrapper-sp{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
#loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid var(--white);
  border-radius: 50%;
  border-top-color: var(--greenfun);
  animation: spin .7s linear infinite;
  -webkit-animation: spin .7s linear infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>