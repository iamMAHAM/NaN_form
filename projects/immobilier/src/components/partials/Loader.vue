<template>
    <div class="wrapper">
        <span class="dot"></span>
        <div class="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Loader',
  props: ['color'],
  mounted(){
    const dot = document.querySelector(".dot")
    const dots = document.querySelectorAll(".dots span")
    Array.from(dots).map(d=>d.width = dot.offsetWidth)
  }
}
</script>

<style>
.wrapper {
  margin: 2rem auto;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: contrast(20);
}

.dot {
    z-index: 5;
    width: 1.2rem;
    height: 1.2rem;
    top: 0;
    left: .5rem;
    background: var(--navcolor);
    border-radius: 50%;
    transform: translateX(0);
    animation: dot 1s infinite;
}

.dots {
  justify-content: space-around;
  display: flex;
  height: 1.2rem;
  width: 5rem;
  /* filter: blur(.01rem); */
  z-index: 3;
  transform: translateX(0);
  animation: dots 1s infinite;
}

.dots span {
    display: block;
    /* float: left; */
    width: 1.2rem;
    height: 100%;
    background: var(--navcolor);
    border-radius: 50%;
}

@keyframes dot {
    50% {
        transform: translateX(9.1rem);
    }
}

@keyframes dots {
    50% {
        transform: translateX(-3.1rem);
    }
}
</style>