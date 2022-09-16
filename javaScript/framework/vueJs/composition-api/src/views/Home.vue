<template>
  <div class="main">
    <form action="">
        <p>name : {{ form.name}} -----> age: {{ form.age }}</p>
        <input type="text" name="" id="" v-model="form.name">
        <input type="number" name="" id="" v-model="form.age">
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name: 'Home',
    setup(){
        const form = ref({
            name: 'akoto',
            age: 30
        })

        const incrementAge = ()=> {console.log(h1.value.textContent = "great")}
        return {
            form,
            incrementAge
        }
    }
}
</script>

<style>

</style>