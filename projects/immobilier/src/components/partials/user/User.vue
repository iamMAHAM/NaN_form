<template>
  <Modal
    ref="modal"
  >
  </Modal>
  <td><img :src="user.avatar" alt="img"></td>
  <td>{{ user.fullName}}</td>
  <td>{{ user.email }}</td>
  <td>{{ role }}</td>
  <td>{{ age }}</td>
  <td>{{ user.address }}</td>
  <td>{{ user.isVerified}}</td>
  <td v-if="!user.owner && !(auth?.currentUser?.uid === user.id)">
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
    <!-- <button
      class="block"
      @click="blockUser"
    >
      <i class="material-symbols-outlined"
      >
        block
      </i>
    </button> -->
    <button
      class="deleteA"
      @click="deleteUser"
    >
      <i class="material-symbols-outlined">delete</i>
    </button>
  </td>
  <td v-else>
    <i class="material-symbols-outlined">block</i>
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
          <option value="customer">customer</option>
          <option value="seller">seller</option>
          <option value="company">company</option>
          <option value="admin" v-if="isOwner">admin</option>
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
import { updateOne, deleteOne, auth, deleteFiles, deleteFile, deleteAllAds} from '@/lib/firestoreLib';
import Modal from '../Modal.vue';
export default {
  name: 'User',
	props: ['user', 'isOwner'],
  components: {Modal},
  data(){
    return {
    show: false,
    backup: {},
    showss: true,
    auth: auth,
  }},
	methods:{
		async deleteUser(){
      const ok = await this.$refs.modal.show({
        title: 'Delete user',
        type: 'confirm',
        display: true,
      })
			if (ok){
        Promise.all([
         deleteOne("users", this.user.id),
         deleteFiles(`images/ads/${this.user.id}`),
         deleteFiles(`images/messages/${this.user.id}`),
         deleteFiles(`profiles/${this.user.id}`),
         deleteFiles(`verif/${this.user.id}`),
         deleteAllAds(this.user.id)
        ])
			}else{
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
    },
    async submit(){
      const ok = await this.$refs.modal.show({
        type: 'confirm',
        display: true,
        title: 'Update user ?',
        resultMessage: 'Mis à jour effectuée .'
      })
      ok
      ? updateOne("users", this.user?.id, this.user)
      : ''
      this.show = false
    }
	},
  computed:{
    role(){
      return this.user.role = this.user.role ? this.user.role : 'customer'
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
  z-index: 10;
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
