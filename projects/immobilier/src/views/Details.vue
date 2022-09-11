<template>
  <div class = "card-wrapper">
  <div class = "card">
    <!-- card left -->
    <div class = "product-imgs">
      <div class = "img-display">
        <div class = "img-showcase">
          <img src = "../assets/m1.jpg">
          <img src = "../assets/m2.jpg">
          <img src = "../assets/m3.jpeg">
        </div>
      </div>
      <div class = "img-select">
        <div class = "img-item">
          <a href = "#" data-id = "1">
            <img src = "../assets/m1.jpg">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "2">
            <img src = "../assets/m2.jpg">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "3">
            <img src = "../assets/m3.jpeg">
          </a>
        </div>
      </div>
    </div>
    <!-- card right -->
    <div class = "product-content">
      <h2 class = "product-title">Maison moins chère</h2>
      <div class = "product-price">
        <p class = "price">Prix: <span>4000000 FCFA</span></p>
      </div>
      <div class = "product-detail">
        <h2>Description</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
        <ul>
          <li>
            <i class="material-symbols-outlined">home_work</i>
            <span>maison</span>
          </li>
          <li>
            <i class="material-symbols-outlined">sell</i>
            <span>vente</span>
          </li>
          <li>
            <i class="material-symbols-outlined">crop_square</i>
            <span>450</span>m²
          </li>
          <li>
            <i class="material-symbols-outlined">location_on</i>
            <span>Abidjan</span>
          </li>
        </ul>
      </div>
      <div class = "purchase-info">
        <button type="button" class="btn button-style c">
          Ecrire au vendeur
          <i class="material-symbols-outlined">forward_to_inbox</i>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Details',
  mounted(){

  }
}
</script>

<style scoped>
  img{
    width: 100%;
    display: block;
}
</style>
<style>
.card-wrapper {
  border-radius: 2rem;
  background: var(--white);
  max-width: 1100px;
  margin: 0 auto;
}

.img-display {
  overflow: hidden;
}

.img-showcase {
  display: flex;
  width: 100%;
  transition: all 0.5s ease;
}

.img-showcase img {
  min-width: 100%;
}

.img-select {
  display: flex;
  justify-content: center;
}

.img-item {
  height: 15rem;
  width: 15rem;
  margin: 0.3rem;
}

.img-item:hover {
  opacity: 0.8;
}

.product-content {
  padding: 1rem;
}

.product-title {
  font-size: 3rem;
  text-transform: capitalize;
  font-weight: 700;
  position: relative;
  color: var(--navcolor);
  margin-bottom: 1rem;
}

.product-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: .1rem;
  width: 100%;
  background: var(--navcolor);
}

.product-price {
  margin: 1rem 0;
  font-size: 2rem;
  font-weight: 700;
}

.product-price span {
  font-weight: 400;
}

.price span {
  color: var(--hovercolor);
}

.product-detail h2 {
  text-transform: capitalize;
  color: var(--navcolor);
  padding-bottom: 0.6rem;
}

.product-detail p {
  font-size: 1.5rem;
  padding: 1rem;
  opacity: 0.8;
}

.c{
  text-transform: unset;
}
.product-detail ul {
  font-size: 1.7rem;
}

.product-detail ul li {
  color: var(--navcolor);
  display: flex;
  gap: .3rem;
  align-items:center;
  list-style: none;
  margin: 0.4rem 0;
  font-weight: 600;
}

.product-detail ul li span {
  font-weight: 400;
}

.purchase-info {
  display: flex;
  justify-content: center;
}

.purchase-info .btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1.5px solid #ddd;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 2.2rem;
  gap: .2rem;
  background: var(--navcolor);
  color: var(--white);
}

.purchase-info .btn:hover {
  background: var(--hovercolor);
}

@media screen and (min-width: 992px) {
  .card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.5rem;
  }

  .card-wrapper {
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .7rem;
  }

  .product-imgs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: .5rem auto;
  }

  .product-content {
    padding-top: 0;
  }
}
</style>