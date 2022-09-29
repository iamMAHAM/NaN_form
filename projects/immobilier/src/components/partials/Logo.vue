<template>
  <div id="logo-container">
    <div class="content">
      <div class="logo" @click="$router.push('/')">
        <div class="logo__block"><img src="@/assets/logo.png"></div>
        <div class="logo__shadow"></div>
      </div>
      <div class="tagline">
        <div class="tagline__mask">
          <div class="tagline__main">IMMO SOLUCE</div>
          <div class="tagline__sub">La Solution aux problèmes immobiliers</div>
        </div>
      </div>
  </div>
</div>
</template>

<style scoped>

#logo-container {
  background: var(--navcolor);
  display: flex;
  justify-content: center;
  font-size: clamp(1rem, 6vmin, 4rem);
  height: 15rem;
}

.content {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo {
  position: relative;
}

.logo__block {
  width: 100%;
  height: 100%;
  animation: spin var(--anim-dur) infinite ease-in-out alternate;
}

.logo__block img{
  border: 1px solid var(--white);
  border-radius: 50%;
}

.tagline {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  position: relative;
  animation: slide var(--anim-dur) infinite ease-in-out alternate;
}

.tagline__mask {
  position: absolute;
  color: var(--white);
}

.tagline__main {
  font-size: 4rem;
}

.tagline__sub {
  width: max-content;
  font-size: 2.5rem;
}

/* @keyframes spin {
  25% {
    border-radius: 0;
    transform: rotate(0deg);
  }

  50% {
    border-radius: .2em;
  }

  75% {
    transform: rotate(-2turn);
    border-radius: 0;
  }

  100% {
    transform: rotate(-2turn);
  }
} */

@keyframes slide {
  25% {
    width: 0em;
  }

  75% {
    width: 15em;
  }

  100% {
    width: 15em;
  }
}

.attribution {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding-bottom: .25em;
  font-size: 1.2rem;
  opacity: .5;
}

.attribution__link {
  color: red;
  text-decoration: none;
}

.attribution__link:hover {
  filter: hue-rotate(200deg);
}

@media screen and (max-width: 883px) {

  .logo__block img{
    height: 12rem;
    width: 12rem;
  }

  #logo-container{
    height: 12rem;
  }
}

@media screen and (max-width: 563px){

  .content{
    justify-content: space-around;
  }

  .logo__block,
  .tagline{
    animation: unset;
  }

  .tagline{
    width: calc(66%);
  }

  .tagline__main{
    font-size: 2.5rem;
  }
  .tagline__sub{
    font-size: 2rem;
  }
}
@media screen and (max-width: 397px){

  #logo-container{
    height: 8rem;
  }
  .tagline__main{
    font-size: 1.7rem;
  }
  .tagline__sub{
    font-size: 1.2rem;
  }

  .tagline{
    width: calc(66%);
  }

  .logo__block img{
    height: 8rem;
    width: 10rem;
  }
}
</style>