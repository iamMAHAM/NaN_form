<template>
  <div id="slider">
    <i
      class="material-symbols-outlined als"
      @click="back"
    >
      arrow_back_ios
    </i>
    <figure id="slidy">
      <img src="@/assets/searchfor.webp"  />
      <img src="@/assets/house.jpeg" />
      <img src="@/assets/hotel.webp" />
      <img src="@/assets/farm.jpeg" />
      <img src="@/assets/fiable.jpeg" />
      <img src="@/assets/accordconclu.webp" />
    </figure>
    <div class="radio">
      <input type="radio" value="0" name="imgIndex">
      <input type="radio" value="1" name="imgIndex">
      <input type="radio" value="2" name="imgIndex">
      <input type="radio" value="3" name="imgIndex">
      <input type="radio" value="4" name="imgIndex">
      <input type="radio" value="5" name="imgIndex">
    </div>
    <i
      class="material-symbols-outlined ars"
      @click="right"
    >
      arrow_forward_ios
    </i>
</div>
</template>

<script>

const getCssProperty = (elmId, property)=>{
   const elem = document.getElementById(elmId);
   return window.getComputedStyle(elem, null).getPropertyValue(property);
}

const setCssProperty = (elmId, property, value)=>{
  const elem = document.getElementById(elmId)
  elem.style[property] = value
}

export default {
  name: 'Banner',
  data(){return {inter: null}},
  mounted(){
    window.addEventListener("DOMContentLoaded", ()=>{
      const slidy = document.getElementById("slidy")

      const slide = ()=>{ slidy.style.left = `-100%`}
      this.inter = setInterval(slide, 5000)
      slidy.addEventListener("transitionend", ()=>{
        slidy.append(slidy.firstElementChild)
        slidy.style.transition = "none"
        slidy.style.left = "0"
        setTimeout(()=>{
          slidy.style.transition = "left 2s ease-in-out"
        }, 20)
      })

      slidy.addEventListener("mouseover", ()=>{
        clearInterval(this.inter)
      })

      slidy.addEventListener("mouseout", ()=>{
        this.inter = setInterval(slide, 5000)
      })
    })
  }
}
</script>

<style scoped>
img {
  height: 600px;
  width: 600px
}

.radio{
  display: none;
  position: absolute;
  left: 50%;
  bottom: .5rem;
  transform: translate(-50%);
}

.radio input{
  background: red;
  accent-color: var(--navcolor);
  margin: .5rem;
  cursor: pointer;
}

.material-symbols-outlined{
  display: none;
  cursor: pointer;
  z-index: 3;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-size: 30px;
}

.als{
  left: .5rem;
}
.ars{
  right: .5rem;
}

#slider {
  z-index: 10;
  position: relative;
  border-radius: 1rem;
  width: 80vw;
  margin: 2rem auto;
  overflow-x: hidden;
}

#slider figure {
  position: relative;
  width: 600%;
  margin: 0px;
  left: 0px;
  text-align: left;
  transition: left 2s ease-in-out;
  animation: 30s slide infinite;
}

#slider figure img {
  float: left;
  width: 16.6666%;
}

@keyframes slide{
  from {opacity: 0;}
  to{ opacity: 1;}
}
/* @keyframes slide {
  0% {
    left: 0%;
  }

  9% {
    left: 0%;
  }

  18% {
    left: -100%;
  }

  27% {
    left: -100%;
  }

  36% {
    left: -200%;
  }

  45% {
    left: -200%;
  }

  54% {
    left: -300%;
  }

  63% {
    left: -300%;
  }

  72% {
    left: -400%;
  }

  81% {
    left: -400%;
  }

  90% {
    left: -500%;
  }

  100% {
    left: -500%;
  }
} */
</style>