<template>
  <vue-awesome-paginate
    :total-items="items.length"
    :items-per-page="20"
    :max-pages-shown="5"
    :current-page="1"
    :on-click="onClickHandler"
  />
</template>

<script>
export default{
  name: 'Pagination',
  props: ['items'],
  methods:{
    onClickHandler(page){
      this.$emit('changePage', page)
    }
  }
}
</script>

<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: var(--greenfun);
    border: 1px solid var(--white);
    color: white;
  }
  .active-page:hover {
    background-color: var(--greenfun);
  }
</style>