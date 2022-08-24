<template>
	<div class="page404">
		<h1>404</h1>
		<p>Page non trouvée</p>
		<router-link to="/" class="button"><i class="icon-home"></i>Accueil</router-link>
	</div>
</template>

<script>
export default {
	
}
</script>

<style scoped>
.page404{
	color: var(--white);
	justify-content: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: var(--black);
	width: 100vw;
	height: 100vh;
}

.button {
  font-weight: 300;
  color: var(--white);
  font-size: 2em;
  text-decoration: none;
  border: .1rem solid var(--white);
  padding: .5em;
  border-radius: .3rem;
  transition: all .3s linear;
  margin: 2rem 0;
}

.button:hover {
  background-color: var(--white);
  color: var(--black);
}

p {
  font-size: 2em;
  text-align: center;
  font-weight: 100;
}

h1 {
  text-align: center;
  font-size: 15em;
  font-weight: 100;
  text-shadow: var(--black) 1px 1px, var(--black) 2px 2px, var(--black) 3px 3px, var(--black) 4px 4px, var(--black) 5px 5px, var(--black) 6px 6px, var(--black) 7px 7px, var(--black) 8px 8px, var(--black) 9px 9px, var(--black) 10px 10px, var(--black) 11px 11px, var(--black) 12px 12px, var(--black) 13px 13px, var(--white) 14px 14px, var(--white) 15px 15px, var(--white) 16px 16px, var(--white) 17px 17px, var(--white) 18px 18px, var(--white) 19px 19px, var(--white) 20px 20px, var(--white) 21px 21px, var(--white) 22px 22px, var(--white) 23px 23px;
}
</style>