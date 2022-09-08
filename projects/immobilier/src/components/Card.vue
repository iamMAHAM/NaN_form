<template>
    <div class="box">
      <div class="top">
        <img src="https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271__340.jpg" alt="" />
        <i class="material-symbols-outlined favs">favorite</i>
      </div>
      <div class="bottom">
        <h3>{{ card.type }} à {{ card.location.toLocaleUpperCase() }}</h3>
        <p>
         {{ card.description}}
        </p>
        <div class="advants">
          <div v-if="card.type === 'maison'">
            <span>Chambres</span>
            <div><i class="fas fa-th-large"></i><span>3</span></div>
          </div>
          <div v-if="card.type === 'maison'">
            <span>Salle de Bain</span>
            <div><i class="fas fa-shower"></i><span>3</span></div>
          </div>
          <div>
            <span>Superficie</span>
            <div>
              <i class="fas fa-vector-square"></i><span>500<span>m²</span></span>
            </div>
          </div>
        </div>
        <div class="price">
          <span>En {{ card.proposition }}</span>
          <span>{{ card.price.toLocaleString('ci') }}</span> FCFA
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['card']
}
</script>

<style>

.favs{
  position: absolute;
  cursor: pointer;
  top: 1rem;
  right: 1rem;
  color: red;
  font-size: 3rem !important;
}

.favs.active{
  color: #3eaba1;
}

.favs:hover{
  color: #3eaba1;
}

.card-container{
  position: relative;
}

.card-container .box {
  width: 23%;
  background-color: white;
  position: relative;
  margin: 1rem 0;
}
.card-container .box .top {
  position: relative;
  background-color: var(--hovercolor);
}

.card-container .box .top:after {
  border-radius: .5rem;
  content: "Voir Details";
  background: var(--white);
  color: var(--navcolor);
  font-size: 1.2rem;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.3s;
  opacity: 0;
}

.card-container .box .top:hover:after {
  opacity: 1;
}

.card-container .box .top img {
  width: 100%;
  margin-bottom: -.4rem;
}

.card-container .box .top span {
  position: absolute;
  right: 2rem;
  bottom: 1.5rem;
  color: white;
  font-size: 2rem;
}

.card-container .box .top span i {
  margin-left: .5rem;
}

.card-container .box .bottom {
  padding: 2rem 1.5rem;
  position: relative;
}

.card-container .box .bottom h3 {
  font-size: 1.5rem;
}

.card-container .box .bottom > p {
  margin: 1.5rem 0;
  font-size: 1.3rem;
  line-height: 1.4;
  color: #777;
}

.card-container .box .bottom .advants {
  justify-content: center;
  display: flex;
}

.card-container .box .bottom .advants > div {
  margin-right: 1.5rem;
}

.card-container .box .bottom .advants > div > span {
  font-weight: bold;
  font-size: 1.2rem;
}

.card-container .box .bottom .advants > div > div {
  margin-top: 1rem;
  display: flex;
  align-items: center;
}

.card-container .box .bottom .advants > div > div i {
  color: #777;
  font-size: 2.2rem;
}

.card-container .box .bottom .advants > div > div > span {
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 1rem;
}

.card-container .box .bottom .advants > div > div > span > span {
  color: #777;
  font-weight: normal;
  margin-left: .5rem;
}

.card-container .box .bottom .price {
  margin-top: 2rem;
}

.card-container .box .bottom .price span:first-of-type {
  display: block;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: .5rem;
}

.card-container .box .bottom .price span:last-of-type {
  color: #3eaba1;
  font-size: 2.2rem;
}
</style>