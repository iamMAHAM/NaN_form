<template>
  <table class="userTable">
    <caption>
      <input
        type="search"
        role="search"
        placeholder="rechercher un utilisateur dans ..."
        v-model="search"
        @input="filterUsers"
        style="min-width: 35rem; height: ; padding: .5rem; margin: .5rem;"
      >
      <select
        @change="filterUsers"
        style="cursor: pointer; text-align:center; width: max-content;"
        v-model="filter">
        <option value="">anybody</option>
        <option value="customer">customers</option>
        <option value="seller">sellers</option>
        <option value="company">companies</option>
        <option value="admin">admins</option>
      </select>
      <i
        class="material-symbols-outlined"
        style="vertical-align: middle; cursor: pointer"
      >
        search
      </i>

    </caption>
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
        <User :user="user" :isOwner="isOwner"/>
      </tr>
    </tbody>
    <tfoot>
      <td colspan="8" class="tablefoot"></td>
    </tfoot>
  </table>
</template>

<script>
import User from './User.vue';
import { collection, onSnapshot } from '@firebase/firestore';
import { db } from '@/lib/firebaseConfig';
export default {
  name: 'Users',
  components: { User },
  props: ['isOwner'],
  methods: {
    filterUsers(){
      if (!this.filter) this.users = this.allUsers
      this.users = this.allUsers.filter(u=>
      u.role.includes(this.filter)
      && u.fullName.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  data(){
    return {
      users:[
      ],
      filter: '',
      allUsers: [],
      search: ''
    }
  },
  mounted(){
    onSnapshot(collection(db, "users"), (snap)=>{
      const inter = []
      snap.docs.map(d=>inter.push(d.data()))
      this.users = [...inter]
      this.allUsers = [...this.users]
      this.$emit("userUpdated", this.allUsers)
    })
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