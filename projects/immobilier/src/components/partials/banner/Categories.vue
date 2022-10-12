<template>
  <aside :class="match ? 'expand' : ''">
  <nav :class="`sidebar ${match  ? 'expand' : ''}`">
    <button class="nav-toggle">
    <i class="fas fa-angle-left"></i>
    </button>
    <ul id="primary-navigation" class="nav__list">
      <li class="nav__list-divider divider-a">
        <h3 class="nav-title">Catégories</h3>
      </li>
      <router-link to="/maison" class="nav__item" data-tooltip="Maison">
        <a class="nav__link">
        <i class="material-symbols-outlined">house</i>
        <span class="nav__link-text">Maison</span>
        </a>
      </router-link>
      <router-link to="/terrain" class="nav__item" data-tooltip="Terrain">
        <a class="nav__link">
        <i class="material-symbols-outlined">grass</i>
        <span class="nav__link-text">Terrain</span>
        </a>
      </router-link>
      <router-link to="/hotel" class="nav__item" data-tooltip="Hotel">
        <a class="nav__link">
        <i class="material-symbols-outlined">hotel</i>
        <span class="nav__link-text">Hotel</span>
        </a>
      </router-link>
      <router-link to="/magasin" class="nav__item" data-tooltip="Magasin">
        <a class="nav__link">
        <i class="material-symbols-outlined">store</i>
        <span class="nav__link-text">Magasin</span>
        </a>
      </router-link>
      <router-link to="/plan" class="nav__item" data-tooltip="Plan">
        <a class="nav__link">
        <i class="material-symbols-outlined">map</i>
        <span class="nav__link-text">Plan</span>
        </a>
      </router-link>
    </ul>
    <ul id="secondary-navigation-a" class="nav__list">
      <li class="nav__list-divider divider-b">
        <h3 class="nav-title">Spécification</h3>
      </li>
      <li class="nav__item" data-tooltip="Location" @click="$emit('filter', 'location')">
        <a class="nav__link">
          <i class="material-symbols-outlined">component_exchange</i>
        <span class="nav__link-text">Location</span>
        </a>
      </li>
      <li class="nav__item" data-tooltip="Vente" @click="$emit('filter', 'vente')">
        <a class="nav__link">
        <i class="material-symbols-outlined">sell</i>
        <span class="nav__link-text">Vente</span>
        </a>
      </li>
    </ul>
  </nav>
</aside>
</template>

<script>
export default {
  name: 'Categories',
  emits:['filter'],
  props: ['match']
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");

aside {
  position: relative;
  display: flex;
  /* margin: auto; */
  width: calc(15%);
  height: 100%
}

aside.expand{
  width: 5rem;
}

.sidebar {
  /* flex-basis: 16.8rem; */
  width: 100%;
  height: fit-content;
  background: #fff;
  border-radius: .4rem;
  box-shadow: var(--shadow);
  transition: flex 430ms ease;
  position: relative;
  height: 100%;
}

.expand {
  flex: 0;
}

.nav-toggle {
  position: absolute;
  left: calc(100% + .5rem);
  padding: .4rem .8rem;
  width: 3.2rem;
  height: 3.2rem;
  border: none;
  border-radius: 50%;
  box-shadow: var(--shadow);
  cursor: pointer;
}

.nav-toggle i {
  font-size: 1.92rem;
  color: var(--navcolor);
  transition: transform 500ms ease;
}

.expand .nav-toggle i {
  transform: rotate(180deg);
}

.expand .nav-toggle:hover {
  animation: beat 400ms cubic-bezier(0.35, 0.05, 0.62, 1.275);
  animation-iteration-count: 2;
  outline: 1px solid #fff6;
  outline-offset: 0;
}

@keyframes beat {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
    outline-offset: .4rem;
  }
}

.nav__list {
  margin-inline: 5,6rem;
  padding-block-end: .8rem;
  list-style: none;
}

.nav-title {
  padding-block: 1.2rem .8rem;
  padding-inline-start: 1.2rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  color: var(--light100);
  transition: color 300ms ease;
}

.nav__list:hover .nav-title {
  color: var(--hovercolor);
}

.nav__list-divider:not(.divider-a) {
  border-top: 1px solid var(--light200);
}

.expand .nav-title,
.expand .nav__list-divider {
  display: none;
}

.nav__item {
  margin-block: .2rem;
  border-radius: .32rem;
  position: relative;
}

.nav__link {
  display: flex;
  height: 3.6rem;
  gap: 1.2rem;
  align-items: center;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  border: none;
  outline: none;
}

.nav__item:hover .nav__link {
  background: var(--light400);
}

.nav__item:focus-within .nav__link i {
  color: var(--navcolor);
  transform: scale(1.2);
  transition: transform 166ms ease;
}

.expand .nav__item:hover .nav__link i,
.expand .nav__item:focus-within .nav__link i {
  transform: scale(1);
  animation: beat 400ms cubic-bezier(0.35, 0.05, 0.62, 1.275);
  animation-iteration-count: 2;
  /* color: var(--accent2); */
}

.nav__link-text {
  height: inherit;
  text-transform: capitalize;
  color: var(--hovercolor);
  align-items: center;
  flex: 1 0 auto;
  display: inline-flex;
}

.nav__item:hover .nav__link-text,
.nav__item:focus-within .nav__link-text {
  font-weight: 600;
  font-size: 1.52rem;
  color: var(--dark400);
}

.nav__link i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* font-size: 1.8rem; */
  aspect-ratio: 1;
  flex-shrink: 0;
  width: 3.6rem;
  color: var(--navcolor);
  transition: transform 166ms ease;
}

[data-tooltip]::before {
  z-index: 20;
  content: attr(data-tooltip);
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 4rem;
  white-space: nowrap;
  border-radius: 0.75em;
  padding: 0.45em 1em;
  background-color: var(--white);
  box-shadow: 0 0.75em 1.125em -0.5em #0002;
  opacity: 0;
  transform-origin: left;
  pointer-events: none;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--navcolor);
}

.expand [data-tooltip]:hover::before {
  animation: showTooltip 200ms linear 100ms forwards;
}

@keyframes showTooltip {
  0% {
    transform: translateY(-50%) scale(0);
    opacity: 0;
  }

  100% {
    transform: translateY(-50%) scale(1);
    opacity: 1;
  }
}
</style>