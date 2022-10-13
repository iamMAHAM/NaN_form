<template>
  <Modal
    ref="modal"
  >
  </Modal>
  <postForm :show="show" :formDetails="{...ad}" @close="show = false" :flag='flag'/>
  <td><img :src="ad?.images[0] || getImage('assets/home.svg')" alt="img"></td>
  <td>{{ ad?.title?.replace(ad.title.substring(10), '...').toLowerCase()}}</td>
  <td>{{ ad?.type }}</td>
  <td>{{ ad?.proposition }}</td>
  <td>{{ dateFormat(ad?.publishedAt) }}</td>
  <td>{{ dateFormat(ad?.soldedAt)}}</td>
  <td>{{ ad.status}}</td>
  <td>
    <button
      title="view"
      v-if="ad.status !== 'pending'"
      class="deleteA"
      style="background: var(--hovercolor)"
      @click="$router.push(`/details/${ad.type}/${ad.id}?owner=${ad.ownerId}`)"
    >
      <i class="material-symbols-outlined">visibility</i>
    </button>

    <button
      title="edit"
      v-if="ad.status !== 'pending' && ad.status !== 'solded' && !$route.path.includes('/admin/dashboard')"
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
      v-if="!$route.path.includes('/admin/dashboard') && ad.status === 'online'"
      title="solde"
      class="deleteA"
      style="background: var(--greenfun)"
      @click="soldeAds"
    >
      <i class="material-symbols-outlined">sell</i>
    </button>
    <button
      title="delete"
      class="deleteA"
      v-if="ad.status === 'online' || ad.status === 'pending' || $route.path.includes('admin/dashboard')"
      @click="deleteAd"
    >
      <i class="material-symbols-outlined">delete</i>
    </button>
    <button
      title="recycle"
      class="deleteA"
      style="background: var(--greenfun)"
      v-if="ad.status === 'solded' && !$route.path.includes('admin/dashboard')"
      @click="shows"
    >
      <i class="material-symbols-outlined">recycling</i>
    </button>
  </td>
</template>

<script>
import { deleteOne, auth, abortPost, soldeAd} from '@/lib/firestoreLib';
import Modal from '@/components/partials/Modal.vue';
import postForm from '@/components/partials/postForm.vue';
export default {
  name: 'Ad',
	props: ["ad"],
  components: {Modal, postForm},
  data(){
    return {
    show: false,
    backup: {},
    flag: 'edit',
    showss: true
  }},
	methods:{
    dateFormat(date){
      try{ return date ? date?.toDate()?.toLocaleString() : NaN }
      catch(e){}
    },
    getImage(path){
      return require('@/' + path)
    },
		async deleteAd(){
      const ok = await this.$refs.modal.show({
        title: 'Delete ad',
        message: 'supprimer l\'annonce ?',
        resultMessage: 'supprimé avec succès',
      })
			if (ok){
        Promise.all([
          deleteOne(`/users/${this.ad.ownerId}/ads`, this.ad.id),
          deleteOne(`ads/X1eA1Bk8tfnVXHqduiTg/${this.ad.type}`, this.ad.id),
          abortPost(this.ad.tempId),
          deleteOne('totals_ads', this.ad.id)
        ]).catch(e=>{
          this.$refs.modal.show({
            title: 'Erreur',
            resultMessage: e.message,
            display: false,
            type: 'error',
          })
        })
			}
		},
    shows(e){
      this.flag = e.target.textContent.trim()
      this.backup = {...this.ad}
      this.show = true
    },
    async soldeAds(){
      const ok = await this.$refs.modal.show({
        message: 'marqué comme vendu ?',
        resultMessage: 'annonce marqué comme vendu'
      })
      if (ok) soldeAd(auth?.currentUser.uid, this.ad)
    },
	},
}
</script>

<style scoped>
  img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
button:disabled{
  opacity: .6;
}
</style>

<style>

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

td button:hover{
  opacity: .9;
}
</style>
