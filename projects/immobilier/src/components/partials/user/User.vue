<template>
  <td><img :src="user.avatar" alt="img"></td>
  <td>{{ user.fullName}}</td>
  <td>{{ user.email }}</td>
  <td>{{ role }}</td>
  <td>{{ age }}</td>
  <td>{{ user.address }}</td>
  <td>{{ user.isVerified}}</td>
  <td>
    <button
      class="view"
    >
      <i
        class="material-symbols-outlined"
        @click="shows"
      >
        edit
      </i>
    </button>
    <button
      class="block"
      @click="updateUser"
    >
      <i class="material-symbols-outlined">block</i>
    </button>
    <button
      class="deleteA"
      @click="deleteUser"
    >
      <i class="material-symbols-outlined">delete</i>
    </button>
  </td>
  <div class="modal-user" v-if="show">
    <div class="user-info-content">
      <div class="lslslsl">
        <img :src="user?.avatar">
        <div
          style="color: var(--white); text-transform: capitalize;"
        >
          {{ user?.fullName }}
        </div>
      </div>
      <div class="input">
        <i class="material-symbols-outlined">verified</i>
        <select v-model="user.isVerified">
          <option disabled value="">Status</option>
          <option :value="true">vérifié</option>
          <option :value="false">non vérifié</option>
        </select>
      </div>
      <div class="input">
        <i class="material-symbols-outlined">local_police</i>
        <select v-model="user.role">
          <option disabled :value="undefined">choisir un rôle</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <button
        type="submit"
        @click="cancel"
      >
        Annuler
        <i class="material-symbols-outlined" style="color: var(--red)">close</i>
      </button>
      <button
        type="submit"
        @click="submit"
      >
        Valider
        <i class="material-symbols-outlined" style="color: var(--greenfun)">check</i>
      </button>
    </div>
  </div>
</template>

<script>
import { updateUserInfo, deleteOne, auth, findOne,} from '@/lib/firestoreLib';
export default {
  name: 'User',
	props: ["user"],
  data(){return {show: false, backup: {}}},
	methods:{
		async updateUser(){
			updateUserInfo(this.user.id, this.user)
			.then(alert("user updated with success"))
			.catch(e=>console?.log(e))
		},
		async deleteUser(){
			if (window.confirm("really delete this user ?")){
				console.log(this.user)
				deleteOne("users", this.user.id)
			}
		},
    shows(){
      this.backup.role = this.user.role
      this.backup.isVerified = this.user.isVerified
      this.show = true
    },
    cancel(){
      this.user.role = this.backup.role,
      this.user.isVerified = this.backup.isVerified
      this.show = false
    }
	},
  computed:{
    role(){
      return this.user.role ? this.user.role : 'user'
    },
    age(){
      return new Date().getFullYear() -  parseInt(this.user?.birth?.split("-")[0])
    }
  }
}
</script>

<style scoped>
  img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>

<style>
.modal-user{
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .3);
}

.user-info-content{
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 2s;
}

.user-info-content button{
  cursor: pointer;
  color: var(--white);
  font-size: 2rem;
  border-radius: .5rem;
  padding: 1rem;
  background: var(--navcolor);
}

.user-info-content button:hover{
  background: var(--hovercolor);
}

.user-info-content button *{
  vertical-align: middle;
}

.user-info-content img{
  background: var(--white);
  width: 15rem;
  height: 15rem;
}
</style>
