<template>
    <div class="slider">
      <div class="slides">
        <input type="radio" name="radio-btn" id="radio1">
        <input type="radio" name="radio-btn" id="radio2">
        <input type="radio" name="radio-btn" id="radio3">
        <input type="radio" name="radio-btn" id="radio4">
        <div class="slide first">
          <img src="@/assets/farm.jpeg" alt="">
        </div>
        <div class="slide">
          <img src="@/assets/fiable.jpeg" alt="">
        </div>
        <div class="slide">
          <img src="@/assets/hotel.webp" alt="">
        </div>
        <div class="slide">
          <img src="@/assets/house.jpeg" alt="">
        </div>
        <div class="navigation-auto">
          <div class="auto-btn1"></div>
          <div class="auto-btn2"></div>
          <div class="auto-btn3"></div>
          <div class="auto-btn4"></div>
        </div>
      </div>
      <div class="navigation-manual">
        <label for="radio1" class="manual-btn"></label>
        <label for="radio2" class="manual-btn"></label>
        <label for="radio3" class="manual-btn"></label>
        <label for="radio4" class="manual-btn"></label>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Slider',
  setup(){
    window.addEventListener("DOMContentLoaded", ()=>{
      const slider = document.getElementsByClassName("slides")[0]
      let inter = null
      let counter = 1

      const slide = ()=>{
        document.getElementById("radio" + counter).checked = true
        counter++
        counter > 4 ? counter = 1 : ''
      }

      inter = setInterval(slide, 5000)
      slider.addEventListener("mouseover", ()=>{
        clearInterval(inter)
      })

      slider.addEventListener("mouseout", ()=>{
        inter = setInterval(slide, 5000)
      })
    })
  }
}
</script>

<style>

.slider {
  width: 800px;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
}

.slides {
  width: 500%;
  height: 500px;
  display: flex;
}

.slides input {
  display: none;
}

.slide {
  width: 20%;
  transition: 2s;
}

.slide img {
  width: 800px;
  height: 500px;
}

/*css for manual slide navigation*/

.navigation-manual {
  position: absolute;
  width: 800px;
  margin-top: -40px;
  display: flex;
  justify-content: center;
}

.manual-btn {
  border: 2px solid var(--white);
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: 1s;
}

.manual-btn:not(:last-child) {
  margin-right: 40px;
}

.manual-btn:hover {
  background: var(--white);
}

#radio1:checked~.first {
  margin-left: 0;
}

#radio2:checked~.first {
  margin-left: -20%;
}

#radio3:checked~.first {
  margin-left: -40%;
}

#radio4:checked~.first {
  margin-left: -60%;
}

/*css for automatic navigation*/

.navigation-auto {
  position: absolute;
  display: flex;
  width: 800px;
  justify-content: center;
  margin-top: 460px;
}

.navigation-auto div {
  border: 2px solid var(--white);
  padding: 5px;
  border-radius: 10px;
  transition: 1s;
}

.navigation-auto div:not(:last-child) {
  margin-right: 40px;
}

#radio1:checked~.navigation-auto .auto-btn1 {
  background: var(--white);
}

#radio2:checked~.navigation-auto .auto-btn2 {
  background: var(--white);
}

#radio3:checked~.navigation-auto .auto-btn3 {
  background: var(--white);
}

#radio4:checked~.navigation-auto .auto-btn4 {
  background: var(--white);
}
</style>