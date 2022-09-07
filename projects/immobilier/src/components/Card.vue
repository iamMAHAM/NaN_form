<template>
  <div class="card-container">
      <span style="color: red" class="loader" v-if="loaded">
        ...
      </span>
    <div class="box">
      <i class="material-symbols-outlined favs">favorite</i>
      <div class="top">
        <img src="https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271__340.jpg" alt="" />
        <span><i class="fas fa-heart"></i><i class="fas fa-exchange-alt"></i></span>
      </div>
      <div class="bottom">
        <h3>{{ card.type }} A {{ card.location.toLocaleUpperCase() }}</h3>
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
  </div>
</template>

<script>
export default {
  name: 'Card',
  data(){
    return {
      card: {
        type: 'magasin',
        proposition: 'vente',
        location: 'Abidjan',
        description: 'lorem 20 je xjnj ckn c ezv zivz vrzvnz v ezvnzvzvezvez veznvebzve',
        superficie: 500,
        price: 2000000
      },
      loaded: true
    }
  },
  // async mounted(){
  //   await new Promise(r=>setTimeout(r, 3000))
  //   this.loaded = false
  // },
  // setup(){
  //     let n = 0
  //     const move = ()=>{
  //       n++
  //       const loader = document.querySelector(".loader")
  //       loader.style.transform = `rotate(${150 * n}deg )`
  //       setTimeout(move, 1000)
  //     }
  //     setTimeout(move, 1000)
  // }
}
</script>

<style>
.card-container {
  width: 1100px;
  margin: 100px auto;
  display: flex;
  justify-content: space-between;
}

.card-container .box {
  width: calc((100% / 3) - 20px);
  background-color: white;
  position: relative;
}
/* .card-container .box:first-of-type:before {
  content: "Featured";
  background-color: #ea723d;
  color: white;
  font-size: 13px;
  padding: 4px 10px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
} */

/* .card-container .box:first-of-type:after {
  content: "";
  border-width: 12px;
  border-style: solid;
  border-color: transparent transparent transparent #ea723d;
  position: absolute;
  left: 72px;
  top: 0;
  transform: translateY(-50%);
} */


.favs{
  cursor: pointer;
  z-index: 2;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: red;
  font-size: 3rem !important;
}

.favs.active{
  color: #3eaba1;
}

.card-container{
  position: relative;
}

.card-container .box .top {
  position: relative;
  background-color: var(--hovercolor);
}

.card-container .box .top:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.3s;
  opacity: 0;
}

.card-container .box .top:hover:before {
  opacity: 1;
}

.card-container .box .top:after {
  border-radius: .5rem;
  content: "Voir Details";
  background: var(--white);
  color: var(--navcolor);
  font-size: 12px;
  padding: 10px;
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
  margin-bottom: -4px;
}

.card-container .box .top span {
  position: absolute;
  right: 20px;
  bottom: 15px;
  color: white;
  font-size: 20px;
}

.card-container .box .top span i {
  margin-left: 5px;
}

.card-container .box .bottom {
  padding: 20px 15px;
  position: relative;
}

/* .card-container .box:not(:last-of-type) .bottom:before {
  content: "Hot";
  background-color: #ea723d;
  color: white;
  font-size: 11px;
  padding: 4px 7px;
  position: absolute;
  left: 20px;
  top: -40px;
  z-index: 1;
} */

.card-container .box .bottom h3 {
  font-size: 15px;
}

.card-container .box .bottom > p {
  margin: 15px 0;
  font-size: 13px;
  line-height: 1.4;
  color: #777;
}

.card-container .box .bottom .advants {
  justify-content: center;
  display: flex;
}

.card-container .box .bottom .advants > div {
  margin-right: 15px;
}

.card-container .box .bottom .advants > div > span {
  font-weight: bold;
  font-size: 12px;
}

.card-container .box .bottom .advants > div > div {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.card-container .box .bottom .advants > div > div i {
  color: #777;
  font-size: 22px;
}

.card-container .box .bottom .advants > div > div > span {
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
}

.card-container .box .bottom .advants > div > div > span > span {
  color: #777;
  font-weight: normal;
  margin-left: 5px;
}

.card-container .box .bottom .price {
  margin-top: 20px;
}

.card-container .box .bottom .price span:first-of-type {
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-container .box .bottom .price span:last-of-type {
  color: #3eaba1;
  font-size: 22px;
}
</style>