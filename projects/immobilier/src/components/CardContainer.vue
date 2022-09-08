<template>
  <Loader v-if="loaded"/>
  <div class="card-container" v-if="!loaded">
    <Card v-for="card in cards" :key="card.id" :card="card"/>
  </div>
</template>

<script>
import Card from './partials/Card.vue';
import Loader from './partials/Loader.vue';

export default {
  name: 'CardContainer',
  components: {
    Card,
    Loader
  },
  data(){
    return {
      cards : [
        {
          type: 'magasin',
          proposition: 'vente',
          location: 'Abidjan',
          description: 'lorem 20 je xjnj ckn c ezv zivz vrzvnz v ezvnzvzvezvez veznvebzve',
          superficie: 500,
          price: 2000000
        },
        {
          type: 'maison',
          proposition: 'location',
          location: 'Abidjan',
          description: 'lorem',
          superficie: 500,
          price: 150000
        },
        {
          type: 'magasin',
          proposition: 'vente',
          location: 'Bingerville',
          description: 'zigribsiscbcbiuhez',
          superficie: 500,
          price: 4560000000
        },
        {
          type: 'magasin',
          proposition: 'vente',
          location: 'Yamoussoukro',
          description: 'const toggleForm = () => {',
          superficie: 500,
          price: 1890000
        },
        {
          type: 'magasin',
          proposition: 'vente',
          location: 'Abidjan',
          description: 'lorem 20 je xjnj ckn c ezv zivz vrzvnz v ezvnzvzvezvez veznvebzve',
          superficie: 500,
          price: 2000000
        },
        {
          type: 'maison',
          proposition: 'location',
          location: 'Abidjan',
          description: 'lorem',
          superficie: 500,
          price: 150000
        },
        {
          type: 'magasin',
          proposition: 'vente',
          location: 'Bingerville',
          description: 'zigribsiscbcbiuhez',
          superficie: 500,
          price: 4560000000
        },
        {
          type: 'magasin',
          proposition: 'vente',
          location: 'Yamoussoukro',
          description: 'const toggleForm = () => {',
          superficie: 500,
          price: 1890000
        },

      ],
      loaded: true
    }
  },
  mounted(){
    setTimeout(()=>this.loaded = false, 2000)
  }
}
</script>

<style>
.card-container {
  width: calc(80%);
  margin: 100px auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.wrapper{
  margin: 20rem auto;
}

@media only screen and (max-width: 1550px){
  .card-container .box{
    width: 30%;
  }
}

@media only screen and (max-width: 1174px){
  .card-container .box{
    width: 32%;
  }
}

@media only screen and (max-width: 1098px){
  .card-container .box{
    width: 32.5%;
  }
}
@media only screen and (max-width: 956px){
  .card-container .box{
    width: 48%;
  }
}
@media only screen and (max-width: 739px){
  .card-container .box{
    width: 48.5%;
  }
}
@media only screen and (max-width: 608px){
  .card-container {
    width: 95%;
    justify-content: center;
  }
  .card-container .box{
    width: 80%;
  }
}


</style>