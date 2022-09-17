<template>
    <div class="box" :id="card.id">
      <div class="top" @click="handleClick">
        <img :src="card?.images.slice(0, 1)"/>
        <i
          :class="`material-symbols-outlined favs ${card?.isFav ? 'active' : ''}`"
          @click="handleFav"
        >
          {{ rightIcone }}
        </i>
      </div>
      <div class="bottom">
        <h3>{{ card?.type }} à {{ card?.location?.toLocaleUpperCase() }}</h3>
        <p>
         {{ card.description.slice(0, 80)}} ...
        </p>
        <div class="advants">
          <div v-if="card?.type === 'maison'">
            <span>Chambres</span>
            <div>
              <i class="material-symbols-outlined">bed</i>
              <span>3</span>
            </div>
          </div>
          <div v-if="card?.type === 'maison'">
            <span>Salle de Bain</span>
            <div>
              <i class="material-symbols-outlined">bathroom</i>
              <span>{{ card?.options?.salle }}</span>
            </div>
          </div>
          <div>
            <span>Superficie</span>
            <div>
              <i class="material-symbols-outlined">grass</i>
              <span>{{ card?.area}}<span>m²</span></span>
            </div>
          </div>
        </div>
        <div class="price">
          <span>En {{ card?.proposition }}</span>
          <span>{{ card?.price?.toLocaleString('ci') }}</span> FCFA
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['card'],
  methods:{
    handleClick(e){
      if (e.target.className !== 'top') return
      this.$router.push(`/details/${this.card.type}/${this.card.id}`)
    },
    handleFav(e){
			if (e.target.classList.contains("active")){
				this.$emit("removeFav", this.card)
			}else{
				this.$emit("addFav", this.card)
			}
		}
  },
  computed: {
    rightIcone(){
      return this.$route.path.includes("favorites") ? 'delete' : 'favorite'
    }
  }
}
</script>

<style>

.favs{
  position: absolute;
  pointer-events: visible;
  cursor: pointer;
  top: 1rem;
  right: 1rem;
  color: var(--red);
  font-size: 3rem !important;
}

.favs.active{
  color: var(--red);
}

.favs.active,
.favs:hover{
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48;
}


.card-container{
  position: relative;
}

.card-container .box {
  pointer-events: none;
  width: 23%;
  height: auto;
  background-color: white;
  position: relative;
  margin: 1rem 0;
}
.card-container .box .top {
  height: calc(40%);
  position: relative;
  background-color: var(--hovercolor);
}

.card-container .box .top:after {
  pointer-events: all;
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
  height: 100%;
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