<template>
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
      <div class="main-content" ref="content">
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
              <i class="material-symbols-outlined">location_on</i>
              <input type="text" placeholder="Lieu" v-model="form.location" required>
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
          </div>
          <div class="extra">
            <textarea class="pa" v-model="form.description"></textarea>
            <div class="error" v-if="errors.description">minimum 300 caractères</div>
            <input
              @click.prevent="postAds"
              class="button-style"
              type="submit"
              value="Poster"
            >
          </div>
      </div>
    </form>
  </div>
</template>

<script>
import validator from 'validator'
import { auth, findOne,postAd } from '@/lib/firestoreLib'

export default {
    props: ['show'],
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
        form: {
          title: '',
          type: '',
          description: 'description ...',
          location: '',
          proposition: '',
          area: 0,
          price: 0
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
        }
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
        this.errors.description = this.form.description.length < 300 
        this.errors.location = !(this.form.title.trim() === this.form.title && this.form.title.length >= 3)
        this.errors.proposition = !validator.isAlpha(this.form.proposition) || !prop 
        this.errors.area = validator.isNumeric(`${this.form.area}`) && parseFloat(this.form.area) <= 0
        this.errors.price = validator.isNumeric(`${this.form.price}`) && parseFloat(this.form.price) <= 1000
        this.errors.files = !this.files.length || this.files.length > 3
      },
      postAds(){
        this.handleErrors()
        if (!this.error){
          if (auth?.currentUser){
            findOne("users", auth.currentUser.uid)
            .then(userInfo=>{
              if (userInfo.isVerified){
                this.form.ownerId = auth.currentUser.uid
                this.form.images = this.fileList
                postAd(auth.currentUser.uid, this.form)
                .then(adInfo=>{
                  this.$refs.content.classList.remove("failed")
                  this.$refs.content.classList.add("success")
                })
                .catch(e=>{
                  alert(e)
                })
              }else{
                this.$refs.content.classList.remove("success")
                this.$refs.content.classList.add("failed")
              }
            })
          }
          else {
            this.$emit("close")
            this.$router.push("/auth")
          }
          setTimeout(()=>{
            this.$refs.content.classList.remove("success")
            this.$refs.content.classList.remove("failed")
            this.$emit('close')
          }, 5000)
        }
      }
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
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .6);
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
  height: 60%;
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
  min-width: 20vw;
  max-width: 20vw;
  min-height: 30vh;
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
  text-align: center;
  content: "Impossible de publier l'annonce : vous devez vérifier votre identité avant de poster";
  color: red;
  font-size: 1.5rem;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: -2rem;
}

.main-content.success::after{
  color: green;
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
    min-height: 10vh;
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