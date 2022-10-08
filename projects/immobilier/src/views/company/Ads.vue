<template>
  <Loader v-if="load"/>
  <table class="userTable" v-else>
    <caption>
      <input
        type="search"
        role="search"
        placeholder="rechercher une annonce dans ..."
        v-model="search"
        @input="filterAds"
        style="min-width: 35rem; height: ; padding: .5rem; margin: .5rem;"
      >
      <select
        @change="filterAds"
        style="cursor: pointer; text-align:center; width: max-content;"
        v-model="filter">
        <option value="">Toutes les annonces</option>
        <option value="online">en ligne</option>
        <option value="solded">soldé</option>
      </select>
      <i
        class="material-symbols-outlined"
        style="vertical-align: middle; cursor: pointer"
      >
        search
      </i>

    </caption>
    <thead v-if="ads.length">
      <tr>
        <th>Image</th>
        <th>Titre</th>
        <th>Type</th>
        <th>Proposition</th>
        <th>Date publication</th>
        <th>Date vente</th>
        <th>status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody v-if="ads.length">
      <tr
        v-for="ad in ads"
        :key="ad.id"
      >
        <Ad :ad="ad" />
      </tr>
    </tbody>
    <div align="center" v-else>Rien à signaler ici ...</div>
    <tfoot v-if="ads.length">
      <td colspan="8" class="tablefoot"></td>
    </tfoot>
  </table>
</template>

<script>
import Ad from './Ad.vue';
import Loader from '@/components/partials/Loader.vue';

export default {
  name: 'Ads',
  components: { Ad, Loader },
  emits: ['filterAds'],
  data(){
    return {
      filter: '',
      search: ''
    }
  },
  props: ['ads', 'load'],
  methods:{
    filterAds(){
      this.$emit('filterAds', [this.filter, this.search])
    }
  }
}
</script>

<style>

.userTable {
  width: 100%;
  text-align: center;
  border: 1px solid var(--white);
  border-spacing: 1px;
  font-family: 'Cairo', sans-serif;
  margin: auto;
}

caption {
  font-weight: bold;
}

.userTable td {
  padding: .5rem;
  background-color: var(--gray);
}

.userTable th {
  background-color: var(--hovercolor);
  color: var(--white);
  padding: .5rem;
}

.block,
.view,
.deleteA {
  margin: .2rem;
  cursor: pointer;
  border: none;
  padding: .3rem .5rem;
  color: var(--white);
  font-weight: bold;
}

.view {
  background-color: var(--blue);
}

.deleteA {
  background-color: var(--red);
}

.block{
  background-color: var(--hovercolor);
  color: var(--gray);
}

.tablefoot {
  padding: 0;
  border-bottom: 3px solid var(--greenfun);
}

</style>

<style scoped>
  img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>