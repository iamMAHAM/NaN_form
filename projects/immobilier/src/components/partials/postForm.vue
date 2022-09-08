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
              <input type="text" placeholder="Titre" v-model="form.title">
            </div>
            <div class="input">
              <i class="material-symbols-outlined">waving_hand</i>
              <select v-model="form.type">
                <option disabled value="">Choisir un bien</option>
                <option value="maison">Maison</option>
                <option value="terrain">Terrain</option>
                <option value="magasin">Magasin</option>
              </select>
            </div>
            <div class="input">
              <i class="material-symbols-outlined">pentagon</i>
              <select v-model="form.proposition">
                <option disabled value="">Chosir une proposition</option>
                <option value="location">Location</option>
                <option value="vente">Vente</option>
              </select>
            </div>
            <div class="input">
              <i class="material-symbols-outlined">location_on</i>
              <input type="text" placeholder="Lieux" v-model="form.location">
            </div>
            <div class="input">
              <i class="material-symbols-outlined">functions</i>
              <input type="text" placeholder="Superficie" v-model="form.area">
              <span>m²</span>
            </div>
            <div class="input">
              <i class="material-symbols-outlined">payments</i>
              <input
                min="0"
                type="number"
                placeholder="Prix"
                v-model="form.price"
              >
              <span>FCFA</span>
            </div>
            <div class="input">
              <i class="material-symbols-outlined">draft</i>
              <input
                type="file"
                accept=".jpeg,.png"
                multiple="multiple"
                @change="createImages"
                >
            </div>
            <div class="preview">
              <img v-for="file in files" :src="file.src" :key="file.id">
            </div>
          </div>
          <div class="extra">
            <textarea class="pa" v-model="form.description">
            </textarea>
            <input
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
export default {
    props: ['show'],
    data(){
      return {
        files: [],
        fileList: [],
        form: {
          title: '',
          type: '',
          description: 'description...',
          location: '',
          proposition: '',
          area: '',
          price: 0
        }
      }
    },
    methods:{
      createImages(e){
        const inter = []
        const target = e.target
        if (target.files.length > 3){
          alert("3 images au maximum autorisées")
          target.value = ''
          this.files = []
          return
        }
        this.fileList = target.files
        console.log(this.fileList)
        Array.from(target.files).map(file=>{
          const src = window.URL.createObjectURL(file)
          file.src = src
          inter.push(file)
        })
        this.files = inter
        console.log(typeof this.fileList)
      }
    },
    mounted(){

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
  height: calc(100% - 7rem);
}
.pa{
  outline-color: var(--navcolor);
  width: 85%;
  height: 60%;
  max-width: 100%;
  max-height: 60%;
}
.ads-content >div{
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
  width: 20%;
}

.extra input[type="submit"]:hover{
  background: var(--hovercolor);
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
  height: 100%;
}
</style>