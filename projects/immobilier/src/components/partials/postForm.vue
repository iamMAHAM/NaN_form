<template>
  <Modal ref="modal"/>
  <div class="post-modal" v-if="show">
    <form class="post-modal-form" @submit.prevent="">
      <span
        class="close"
        @click="$emit('close')"
      >
        x
      </span>
      <h1 class="title">
          <span>Publier une Annonce</span>
      </h1>
      <div class="main-content" ref="content" @click="clicked">
          <div class="ads-rows">
            <div class="input">
              <i class="material-symbols-outlined">title</i>
              <input
                type="text"
                placeholder="Titre"
                v-model="form.title"
                >
            </div>
            <div class="error" v-if="errors.title">minimum 5 caractères</div>
            <div class="input">
              <i class="material-symbols-outlined">waving_hand</i>
              <select v-model="form.type" required>
                <option disabled value="">Choisir un bien</option>
                <option value="maison">Maison</option>
                <option value="terrain">Terrain</option>
                <option value="magasin">Magasin</option>
                <option value="hotel">Hotel</option>
              </select>
            </div>
            <div class="error" v-if="errors.type">valeur de categorie inconnue</div>
            <div class="kami" v-if="form.type === 'maison'" >
              <div class="input">
                <i class="material-symbols-outlined">bed</i>
                <input type="number" placeholder="Chambres" v-model="form.options.beedroom">
              </div>
              <div class="input">
                <i class="material-symbols-outlined">bathroom</i>
                <input type="number" placeholder="Salle de bain" v-model="form.options.bathroom">
              </div>
              <div class="error" v-if="errors.options">renseignez ces champs</div>
            </div>
            <div class="input">
              <i class="material-symbols-outlined">pentagon</i>
              <select v-model="form.proposition" required>
                <option disabled value="">Chosir une proposition</option>
                <option value="location">Location</option>
                <option value="vente">Vente</option>
              </select>
            </div>
            <div class="error" v-if="errors.proposition">valeur inconnue</div>
            <div class="input">
              <i class="material-symbols-outlined" @click="emp = !emp" style="cursor: pointer;" v-if="emp">location_on</i>
              <i class="material-symbols-outlined" @click="emp = !emp" style="cursor: pointer;" v-else>map</i>
              <input type="text" placeholder="Lieu" v-model="form.location" required v-if="emp">
              <div v-else>
                <input type="text" placeholder="Longitude" required v-model="coordinate.long">
                <input type="text" placeholder="Latitude"  required v-model="coordinate.lat">
              </div>
            </div>
            <div class="error" v-if="errors.location">emplacement invalide</div>
            <div class="input">
              <i class="material-symbols-outlined">functions</i>
              <input min="1" type="number" placeholder="Superficie" v-model="form.area">
              <span>m²</span>
            </div>
            <div class="error" v-if="errors.area">superficie invalide</div>
            <div class="input">
              <i class="material-symbols-outlined">payments</i>
              <input
                min="2000"
                type="number"
                placeholder="Prix"
                v-model="form.price"
              >
              <span>FCFA</span>
            </div>
            <div class="error" v-if="errors.price">montant invalide</div>
            <div class="input">
              <i class="material-symbols-outlined">draft</i>
              <input
                min="0"
                type="file"
                accept=".jpeg,.png"
                multiple="multiple"
                @change="createImages"
                >
            </div>
            <div class="error" v-if="errors.files">minimium 1 et maximum 3</div>
            <div class="preview">
              <img v-for="file in files" :src="file.src" :key="file.id">
            </div>
            <div class="preview" v-if="flag === 'edit'">
              <div class="c" style="position: relative; height: 100px; width: 100px; margin: .3rem;" v-for="img in form.images">
                <img :src="img" :key="img" style="width: 100%; height: 100%; margin: 0;">
                <i class="material-symbols-outlined"
                  @click="form.images.splice(form.images.indexOf(img), 1)"
                  style="
                    position: absolute;
                    right: 0;
                    top: 0;
                    color: var(--red);
                    cursor: pointer;
                  "
                  >
                  close
                </i>
              </div>
            </div>
          </div>
          <div class="extra">
            <textarea class="pa" v-model="form.description"></textarea>
            <div class="error" v-if="errors.description">minimum 150 caractères</div>
            <input
              v-if="!req"
              @click.prevent="postAds"
              class="button-style"
              type="submit"
              :value="this.flag === 'edit' ? 'modifier' : 'Poster'"
            >
            <Loader :view="3" :height="30" :width="30" v-if="req"/>
          </div>
      </div>
    </form>
  </div>
</template>

<script>
import validator from 'validator'
import { auth, findOne,postAd, updateOne, uploadImage } from '@/lib/firestoreLib'
import Loader from './Loader.vue'
import Modal from './Modal.vue'
import { uuidv4 } from '@firebase/util'

export default {
    props: ['show', 'close', 'formDetails', 'flag'],
    components:{
      Loader,
      Modal
    },
    emits: ['close'],
    data(){
      return {
        get error(){
          const errors = Object.values(this.errors)
          let flag = false
          errors.map(e =>e ? flag = true : '')
          return flag
        },
        files: [],
        fileList: [],
        form: { ...this.formDetails, options:this.formDetails?.options || {}}  || {
          title: '',
          type: '',
          description: 'description ...',
          location: '',
          proposition: '',
          area: 0,
          price: 0,
          options: {},
        },
        errors:{
          type: false,
          title: false,
          description: false,
          location: false,
          proposition: false,
          area: false,
          price: false,
          files: false,
          options: false
        },
        req: false,
        emp: true,
        coordinate: this.formDetails?.coordinate && {
          long: this.formDetails?.coordinate[0],
          lat: this.formDetails?.coordinate[1]
          }
          || {}
      }
    },
    methods:{
      createImages(e){
        const inter = []
        const target = e.target
        if (target.files.length > 3){
          target.value = ''
          this.errors.files = true
          this.files = []
          return
        }
        this.errors.files = false
        this.fileList = [...target.files]
        Array.from(target.files).map(file=>{
          const src = window.URL.createObjectURL(file)
          file.src = src
          inter.push(file)
        })
        this.files = inter
      },
      handleErrors(){
        const type = ['maison', 'terrain', 'magasin', 'hotel'].includes(this.form.type)
        const prop = ['vente', 'location'].includes(this.form.proposition)
        this.errors.type = !validator.isAlpha(this.form.type) || !type
        this.errors.title = !(this.form.title.trim() === this.form.title && this.form.title.length >= 5)
        this.errors.description = this.form.description.length < 150 
        this.errors.location = !(this.form.title.trim() === this.form.title && this.form.title.length >= 3)
        this.errors.proposition = !validator.isAlpha(this.form.proposition) || !prop 
        this.errors.area = validator.isNumeric(`${this.form.area}`) && parseFloat(this.form.area) <= 0
        this.errors.price = validator.isNumeric(`${this.form.price}`) && parseFloat(this.form.price) <= 1000
        this.errors.files = !this.files.length || this.files.length > 3
        this.errors.options = this.form.type === "maison" && this.form.options
        if (this.form.type === "maison"){
          this.errors.options = !(this.form?.options?.bathroom && this.form.options.beedroom
                                && validator.isNumeric(String(this.form.options?.bathroom))
                                && validator.isNumeric(String(this.form.options?.beedroom)))
        }
      },
      clicked(e){
        const target = e.target
        if (target.classList.contains("main-content") && target.classList.contains("failed")){
          this.$router.push("/profile")
          this.$emit("close")
        }
      },
      postAds(){
        this.handleErrors()
        if (this.flag === 'edit'){
          Object.keys(this.errors).map(e=> this.errors[e] = false)
        }
        if (!this.error){ // add !
          if (auth?.currentUser){
            this.req = true
            findOne("users", auth.currentUser.uid)
            .then(async user=>{
              if (user.isVerified){
                if (!this.emp) {this.form.coordinate = [this.coordinate?.long, this.coordinate?.lat]}// gps coordinate case
                this.form.ownerId = auth.currentUser.uid
                if (user.role === 'company'){this.form.isPro = true}
                if (this.flag === 'edit'){
                  const inter = []
                  for (const file of this.fileList){
                    const url =  await uploadImage(`profiles/${auth?.currentUser?.uid}/${uuidv4() + '-' +file.name}`, file)
                    inter.push(url)
                  }
                  this.form.images?.push(...inter)
                  delete this.form?.flag
                  Promise.all([
                    updateOne('totals_ads', this.form.id, this.form),
                    updateOne(`ads/X1eA1Bk8tfnVXHqduiTg/${this.form.type}`, this.form.id, this.form),
                    updateOne(`users/${auth?.currentUser.uid}/ads`, this.form.id, this.form)
                  ])
                  .then(()=>{
                    this.$refs.modal.show({
                      type: 'info',
                      title: 'Modification',
                      message: 'Annonce modifiée avec succèss !'
                    })
                    this.req = false
                  })
                  .catch(e=>{
                    this.$refs.modal.show({
                      type: 'error',
                      title: 'Erreur',
                      display: false,
                      errorMessage: e?.code ? e.code : e.message
                    })
                    this.req = false
                    return
                  })
                }else{
                  this.form.images = this.fileList
                  postAd(auth.currentUser.uid, this.form)
                  .then(()=>{
                    this.req = false
                    this.$emit('close')
                    this.$refs.modal.show({
                      type: 'info',
                      title: 'Annonce',
                      message: 'Annonce publiée avec succès . En attente de validation ...'
                    })
                  })
                  .catch(e=>{
                    this.$refs.modal.show({
                      type: 'error',
                      errorMessage: e.code ? e.code : e.message
                    })
                    this.req = false
                  })
                } // vendor update
              }else{
                this.$refs.modal.show({
                  type: 'info',
                  title: 'Vérification requise',
                  message: 'veuillez verifier votre identité'
                })
                this.req = false
              }

            })
          }
          else {
            this.$emit("close")
            this.$router.push("/auth")
          }
        }
      },
    }
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  border-radius: 1rem;
  width: .1rem;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background: var(--navcolor);
}
</style>
<style>
.post-modal{
    z-index: 12;
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .1);
}

form.post-modal-form{
  overflow-y: scroll;
  border-radius: 1rem;
  margin: auto;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white);
  height: 70%;
}

h1.title{
  padding: .5rem;
  font-weight: 450;
  text-align: center;
}

.title i{
    display: inline-block;
    font-size: 3rem;
    margin: auto 0;
}
.title span{
    border-radius: .5rem;
    margin-top: .5rem;
    display: inline-block;
    padding: .5rem;
    border: .1px solid var(--hovercolor);
}

.main-content{
  position: relative;
  width: 100%;
  display: flex;
}
.pa{
  text-align: center;
  outline-color: var(--navcolor);
  min-width: 22vw;
  max-width: 22vw;
  min-height: 40vh;
  max-height: 45vh;
}
.main-content >div{
  /* display: block; */
  position: relative;
  height: max-content;
  padding: 1rem;
  text-align: center;
  width: 50%;
}

.preview,
.ads-rows,
.extra{
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.extra input[type="submit"]{
  color: var(--white);
  background: var(--navcolor);
  cursor: pointer;
  border-radius: .5rem;
  width: 30%;
}

.extra input[type="submit"]:disabled,
.extra input[type="submit"]:hover{
  background: var(--hovercolor);
}

.extra input[type="submit"]:disabled{
  pointer-events: none;
}

.ads-rows div.input{
  width: 100%;
}

select,
.main-content input{
  position: relative;
  width: 100%;
  padding: 1rem;
  background: var(--gray);
  color: var(--navcolor);
  border: none;
  outline: none;
  box-shadow: none;
  margin: .2rem 0;
  font-size: 1.4rem;
  letter-spacing: .1rem;
  font-weight: 300;
}

.preview{
  width: 100%;
  flex-direction: row;
}

.preview img{
  margin: .3rem;
  width: 30%;
  height: 65%;
}

.main-content >span{
  color: red;
}

.main-content.success::after,
.main-content.failed::after{
  padding: 1rem;
  text-align: center;
  content: "Vérifier Mon identité";
  background: var(--navcolor);
  color: var(--white);
  font-size: 1.5rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: -2rem;
  border-radius: 1rem;
  pointer-events: all;
  cursor: pointer;
}

.main-content.success::after{
  background: var(--white);
  color: green;
  width: 100%;
  content: "Annonce publiée avec succès : En attente de validation ...";
}



@media only screen and (max-width: 1186px){
  .title span{
    font-size: 2.2rem;
  }
  .extra input[type="submit"]{
    width: 35%;
  }
}

.close{
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  right: 1rem;
  color: red;
}
@media only screen and (max-width: 1098px){
  .main-content{
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .main-content >div{
    width: 70%;
  }

  .extra{
    height: calc(15rem);
  }

  .ads-rows{
    height: calc(100% - 20rem);
  }

  .pa{
    min-height: 20vh;
    min-width: 35vw;
  }

  .preview img{
    height: 5rem;
  }
}

@media only screen and (max-width: 777px){
  form.post-modal-form{
    width: 80%;
  }
  .pa{
    min-width: 70vw;
  }
}
</style>