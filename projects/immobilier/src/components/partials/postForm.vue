<template>
  <div class="post-modal" v-if="show">
    <form class="post-modal-form" @submit.prevent="">
      <h1 class="title">
          <span>Publier une Annonce</span>
      </h1>
      <div class="ads-content">
          <div class="ads-rows">
            <div class="input">
              <i class="material-symbols-outlined">title</i>
              <input
                required
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
              </select>
            </div>
            <div class="error" v-if="errors.type">categorie inconnue</div>
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
              <input type="number" placeholder="Superficie" v-model="form.area">
              <span>m²</span>
            </div>
            <div class="error" v-if="errors.area">superficie invalide</div>
            <div class="input">
              <i class="material-symbols-outlined">payments</i>
              <input
                required
                min="0"
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
                required
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
            <textarea class="pa" v-model="form.description">
            </textarea>
            <input
              @click="postAd"
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
export default {
    props: ['show'],
    data(){
      return {
        get state(){
          const errors = Object.values(this.errors)
          let flag = false
          errors.map(e =>{
            e ? flag = true : ''
          })
          return flag
        },
        files: [],
        fileList: [],
        form: {
          title: '',
          type: '',
          description: 'description',
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
          start: true
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
        this.fileList = target.files
        console.log(this.fileList)
        Array.from(target.files).map(file=>{
          const src = window.URL.createObjectURL(file)
          file.src = src
          inter.push(file)
        })
        this.files = inter
      },
      handleErrors(){
        console.log("price", validator.isNumeric(`${this.form.price}`) && parseFloat(this.form.price) <= 1000)
        console.log("area", validator.isNumeric(`${this.form.area}`) && parseFloat(this.form.area) <= 0)
        this.errors.type = !validator.isAlpha(this.form.type) ? true : false  
        this.errors.title = !validator.isAlpha(this.form.title) ? true : false  
        this.errors.description = !validator.isAlphanumeric(this.form.description) ? true : false
        this.errors.location = !validator.isAlpha(this.form.location) ? true : false
        this.errors.proposition = !validator.isAlpha(this.form.proposition) ? true : false
        this.errors.area = validator.isNumeric(`${this.form.area}`) && parseFloat(this.form.area) <= 0
        ?
          true : false
        this.errors.price = validator.isNumeric(`${this.form.price}`) && parseFloat(this.form.price) <= 1000
        ?
          true : false
        this.errors.files = !this.files.length || this.files.length > 3 ? true: false
      },
      postAd(){
        this.handleErrors()
        if (!this.state){
          console.log("all valide post now ...")
        }
      }
    },
    mounted(){

    },
    updated(){
      console.log("update now ...")
    }
}
</script>

<style>
.post-modal{
    z-index: 5;
    top: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .3);
}

form.post-modal-form{
  overflow: scroll;
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

h1{
  display: block;
}
h1.title{
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

.ads-content{
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
.ads-content >div{
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
.ads-content input{
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

.ads-content >span{
  color: red;
}

@media only screen and (max-width: 1186px){
  .title span{
    font-size: 2.2rem;
  }
  .extra input[type="submit"]{
    width: 35%;
  }
}
@media only screen and (max-width: 1098px){
  h1.title{
    height: 5rem;
  }
  .ads-content{
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .ads-content >div{
    width: 70%;
  }

  .extra{
    height: calc(15rem);
  }

  .ads-rows{
    height: calc(100% - 20rem);
  }

  .pa{
    min-width: 35vw;
  }

  .preview img{
    height: 5rem;
  }
}
</style>