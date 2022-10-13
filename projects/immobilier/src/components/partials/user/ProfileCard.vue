<template>
  <Modal ref="modal" />
  <div class="flex-container space-between">
    <div class="vas">
      <button
        class="bsbs"
        style="background: var(--greenfun)"
        @click="verify"
      >
        Vérifier
      </button>
      <button
        class="bsbs"
        style="background: red"
        @click="deny"
      >
        Refuser
      </button>
    </div>
    <div class="flex-top" style="margin-top: .5rem">
      <div class="col card">
        <div class="img-placeholder">
          <img :src="userProfile?.avatar">
        </div>
        <div style="margin: auto">
          <h3>{{ userProfile?.fullName }}</h3>
          <p><i class="material-symbols-outlined">person</i>user</p>
          <p><i class="material-symbols-outlined">send</i> <a :href="'mailto:'+ userProfile?.email">Contacter</a></p>
          <p><i class="material-symbols-outlined">location_on</i>{{ userProfile?.address}}</p>
        </div>
      </div>
    </div>
    <div class="flex-bottom">
      <img
        v-for="img in userProfile?.verifInfoImages"
        :key="img.slice(3, 6)"
        :src="img"
        >
    </div>
</div>
</template>
<script>
import { deleteFiles, deleteOne, updateOne } from '@/lib/firestoreLib'
import Modal from '../Modal.vue'
export default {
  name: 'ProfileCard',
  props: ['userProfile'],
  components: {
    Modal
  },
  methods:{
    async verify(){
      const ok = await this.$refs.modal.show({
        type: 'confirm',
        display: true,
        message: 'Valider les modifications',
        resultMessage: 'validé avec succès'
      })
      if (ok){
        const isComp = this.userProfile.isCompany
        delete this.userProfile.isCompany
        Promise.all([
          updateOne("users", this.userProfile.id, {
            isVerified: true,
            role: isComp ? 'company' : 'seller',
            isAwaitingVerification: false
          }),
          deleteOne("admin/vAJXH3iQabt9AjGLAaej/verification", this.userProfile.id),
          deleteFiles(`verif/${this.userProfile.id}`)
        ])
        .catch(e=>{
          this.$refs.modal.show({
              type: 'error',
              title: 'Erreur',
              errorMessage: e.code ? e.code : e?.message,
          })
        })
      }
    },
    deny(){
      const ok = this.$refs.modal.show({
        title: 'Deny user identity ? ',
        type: 'confirm',
        display: true,
        resultMessage: 'réfusé avec succèss'
      })
      if (ok){
        Promise.all([
            updateOne("users", this.userProfile.id, {
              isAwaitingVerification: false
            }),
            deleteOne("admin/vAJXH3iQabt9AjGLAaej/verification", this.userProfile.id),
            deleteFiles(`verif/${this.userProfile.id}`)
          ])
          .catch(e=>{
            this.$refs.modal.show({
              type: 'error',
              title: 'Erreur',
              errorMessage: e.code ? e.code : e?.message,
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.flex-container {
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  column-gap: 15px;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
}

.flex-container::after{
  content: "";
  border: .1rem solid var(--white);
  position: absolute;
  width: 100%;
  bottom: -1rem;
  left: 0;
}
.col {
  width: 50%;
}

.card {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 1rem;
  background-color: #fff;
  display: flex;
  column-gap: 20px;
}

.card img {
  max-width: 250px;
}

.img-placeholder {
  position: relative;
  max-height: 200px;
  overflow: hidden;
  border-radius: 15px;
}

h3 {
  font-weight: 400;
}

p {
  font-weight: 300;
}

a {
  color: #888;
  text-decoration: none;
}

a:hover {
  color: inherit;
}

.flex-bottom{
  width: 100%;
  display: flex;
}

.flex-bottom img{
  cursor: pointer;
  margin: .5rem auto;
  width: 23%;
  height: 250px;
}
.flex-bottom img:hover{
  z-index: 2;
  transform: scale(2);
}

.flex-bottom :nth-child(1):hover{
  transform: translate(50%) scale(2);
}

.flex-bottom :nth-child(4):hover{
  transform: translate(-50%) scale(2);
}

.bsbs{
  cursor: pointer;
  color: var(--white);
  border-radius: 1rem;
  margin: .5rem;
  padding: 1rem;
}
</style>