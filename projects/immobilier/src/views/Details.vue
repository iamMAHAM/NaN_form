<template>
  <div class = "card-wrapper">
  <div class = "card">
    <!-- card left -->
    <div class = "product-imgs">
      <div class = "img-display">
        <div class = "img-showcase">
          <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg" alt = "shoe image">
          <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt = "shoe image">
          <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt = "shoe image">
          <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt = "shoe image">
        </div>
      </div>
      <div class = "img-select">
        <div class = "img-item">
          <a href = "#" data-id = "1">
          <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg" alt = "shoe image">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "2">
          <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt = "shoe image">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "3">
          <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt = "shoe image">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "4">
          <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt = "shoe image">
          </a>
        </div>
      </div>
    </div>
    <!-- card right -->
    <div class = "product-content">
      <h2 class = "product-title">nike shoes</h2>
      <div class = "product-price">
        <p class = "price">Prix: <span>4000000 FCFA</span></p>
      </div>
      <div class = "product-detail">
        <h2>Description</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
        <ul>
          <li>type: <span>maison</span></li>
          <li>proposition: <span>vente</span></li>
          <li>superficie: <span>450</span>m²</li>
          <li>lieu: <span>Abidjan</span></li>
        </ul>
      </div>
      <div class = "purchase-info">
        <button type="button" class="btn button-style c">
          Contacter
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
}

.img-item {
  margin: 0.3rem;
}

.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3) {
  margin-right: 0;
}

.img-item:hover {
  opacity: 0.8;
}

.product-content {
  padding: 2rem 1rem;
}

.product-title {
  font-size: 3rem;
  text-transform: capitalize;
  font-weight: 700;
  position: relative;
  color: #12263a;
  margin: 1rem 0;
}

.product-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 80px;
  background: #12263a;
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
  color: #256eff;
}

.product-detail h2 {
  text-transform: capitalize;
  color: #12263a;
  padding-bottom: 0.6rem;
}

.product-detail p {
  font-size: 1.9rem;
  padding: 1rem;
  opacity: 0.8;
}

.product-detail ul {
  margin: 1rem 0;
  font-size: 1.9rem;
}

.product-detail ul li {
  margin: 0;
  list-style: none;
  background-size: 18px;
  padding-left: 1.7rem;
  margin: 0.4rem 0;
  font-weight: 600;
  opacity: 0.9;
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-imgs {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .product-content {
    padding-top: 0;
  }
}
</style>