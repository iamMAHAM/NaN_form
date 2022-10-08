<template>
  <div class="aks-404-page">
  <div class="aks-404-page-content">
    <h1>404</h1>
    <h3>Page Non Trouvée</h3>
    <a 
      class="aks-404-page-btn"
      @click="$router.push('/')"
    >
      ACCUEIL
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.aks-404-page {
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.aks-404-page-content {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: var(--navcolor);
  position: relative;
  z-index: 10;
  user-select: none;
}

.aks-404-page-content h1 {
  position: relative;
  font-size: 177px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
}

.aks-404-page-content h3 {
  position: relative;
  margin-bottom: 2rem;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
  letter-spacing: 0.9px;
}

.aks-404-page-btn {
  color: var(--white);
  text-decoration: none;
  padding: 15px 25px;
  background: var(--navcolor);
  border-radius: 3rem;
  position: relative;
  cursor: pointer;
  transition: all 350ms ease-in-out;
}

.aks-404-page-btn:hover {
  background: var(--hovercolor);
}
</style>