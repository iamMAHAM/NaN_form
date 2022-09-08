<template>
  <div class="card-container">
    <Loader v-if="loaded"/>
    <Card v-for="card in cards" :key="card.id" :card="card"/>
  </div>
</template>

<script>
import Card from './Card.vue';
import Loader from './Loader.vue';

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
      loaded: false
    }
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

</style>