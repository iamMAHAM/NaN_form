<template>
  <table>
    <caption>Utilisateurs</caption>
    <thead>
      <tr>
        <th>Avatar</th>
        <th>Nom complet</th>
        <th>Email</th>
        <th>Role</th>
        <th>age</th>
        <th>Address</th>
        <th>Verifié</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
      >
        <User :user="user" />
      </tr>
    </tbody>
    <tfoot>
      <td colspan="8" class="tablefoot"></td>
    </tfoot>
  </table>
</template>

<script>
import { find } from '@/lib/firestoreLib';
import User from './User.vue';
export default {
  name: 'Users',
  components: { User },
  data(){
    return {
      users:[
      ]
    }
  },
  mounted(){
    find("users", false)
    .then(users=>{
      console.log(users)
      this.users = users
    })
  }
}
</script>

<style>

table {
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

table td {
  padding: .5rem;
  background-color: var(--gray);
}

table th {
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