<template>
<section>
  <div class="container active" ref="container">
    <div class="user signupBx">
      <div class="formBx">
        <form action="" onsubmit="return false;">
          <h2>Inscription entreprise</h2>
          <div class="error" v-if="errors.reqError">{{ errors.message }}</div>
          <div class="input">
            <i class="material-symbols-outlined">badge</i>
            <input
              v-model="form.fullName"
              @change="nameChange"
              type="text"
              placeholder="Nom de l'entreprise"
              >
          </div>
          <div
            v-if="errors.fullName"
            class="error"
            >
            nom invalide
          </div>
          <div class="input">
            <i class="material-symbols-outlined">alternate_email</i>
            <input
              v-model="form.email"
              @change="emailChange"
              type="email"
              placeholder="Email business"
              >
          </div>
          <div
            v-if="errors.email"
            class="error"
            >
            email invalide
          </div>
          <div class="input">
            <i class="material-symbols-outlined">lock</i>
            <input
              v-model="form.password"
              type="password"
              class="ps"
              placeholder="Mot de passe"
              @change="passwordChange"
              >
            <i
              class="material-symbols-outlined vs"
              @click="toggleVisibility"
              >
            visibility_off
            </i>
          </div>
          <div
            v-if="errors.password"
            class="error"
            >
            minimum 8 caractères <br>
            (symbole, majuscule, chiffre, lettre)
          </div>
          <div class="input">
            <i class="material-symbols-outlined">location_city</i>
            <input
              v-model="form.address"
              @change="addressChange"
              type="text"
              placeholder="Address de l'Entreprise">
          </div>
          <div
            v-if="errors.address"
            class="error"
            >
            address invalide
          </div>
          <div class="input">
            <i class="material-symbols-outlined">calendar_month</i>
            <input
              v-model="form.birth" 
              @change="birthChange"
              placeholder="Date de création de l'entreprise"
              type="text"
              onfocus="(this.type='date')"
              min="1900-01-01" max="2003-01-01"
              >
          </div>
          <div class="error"
            v-if="errors.birth"
            >
            date invalide
          </div>
          <div class="input">
            <i class="material-symbols-outlined">imagesmode</i>
            <input
              type="text"
              placeholder="Avatar de l'entreprise"
              onfocus="this.type='file'"
              ref="avatar"
              @change="flag = true"
              >
          </div>
          <input
            v-if="!req"
            type="submit"
            value="Suivant"
            @click.prevent="next"
            />
          <Loader :view="3" :width="30" :height="30" v-if="req"/>
          <p class="signup"  v-if="!req">
            déjà inscrit ?
            <a href="#" @click="toggleForm()">Se connecter.</a>
          </p>
        </form>
      </div>
      <div class="formBx" style="width: 100%; overflow: scroll; display: none;">
        <form action="" onsubmit="return false;">
          <h2>Verification des informations</h2>
          <userVerification
            :props="{
              company: true,
              selfie: 'photo de l\'entrprise (vue de déhors)',
              recto: '',
              verso: '',
              facture: '',
              show: false
            }"
          />
          <input
            v-if="!req"
            type="submit"
            value="Précédent"
            @click.prevent="prev"
            />
          <input
            style="margin-left: 1rem"
            v-if="!req"
            type="submit"
            value="Soumettre"
            :disabled="state"
            @click.prevent="register"
            />
          <!-- <input
            v-if="!req"
            type="submit"
            value="S'inscrire"
            :disabled="state"
            @click.prevent="register"
            /> -->
          <Loader :view="3" :width="30" :height="30" v-if="req"/>
          <p class="signup"  v-if="!req">
            déjà inscrit ?
            <a href="#" @click="toggleForm()">Se connecter.</a>
          </p>
        </form>
      </div>
      <div class="imgBx"><img src="../assets/reg.jpg" alt="" /></div>
    </div>
    <div class="reset-password" v-if="passr">
      <div class="input">
        <i class="material-symbols-outlined">alternate_email</i>
        <input type="text" v-model="form.email" placeholder="Adresse email">
      </div>
      <div class="reset-actions">
        <input type="submit"
          style="
          padding: 1rem;
          "
          @click="reinitPassword"
          value="Soumettre"
          >
        <input type="submit"
          style="
          padding: 1rem;
          color: var(--red);
          "
          @click="passr = false"
          value="Annuler"
          >
      </div>
    </div>
  </div>
</section>
</template>""

<script>
import validator from 'validator';
import { signUp, signIn, uploadImage, resetPassword } from '@/lib/firestoreLib';
import Loader from '@/components/partials/Loader.vue';
import userVerification from './partials/user/userVerification.vue';
export default {
  name: 'Auth',
  components:{
    Loader,
    userVerification
  },
  data(){
    return{
      get state(){
        return (
          (this.form.birth && this.form.password && this.form.fullName && this.form.email && this.form.address)
          &&
          (this.errors.email || this.errors.password || this.errors.fullName || this.errors.address || this.errors.birth || this.errors.start)
        )
      },
      form: {
        email: '',
        password: '',
        fullName: '',
        birth: '',
        isVerified: false,
        address: '',
        avatar: "https://firebasestorage.googleapis.com/v0/b/immobilier-0.appspot.com/o/profiles%2Favatar-icon.svg?alt=media&token=516f42ab-4ec8-45a0-b66c-1e4058455e4c",
      },
      errors:{
        start: true,
        email: false,
        password: false,
        fullName: false,
        address: false,
        birth: false,
        reqError: false,
        message: '',
      },
      flag: false,
      req: false,
      passr: false,
    }
  },
  methods: {
    showError(message, time=0){
      this.errors.message = message.replace("auth/", '').replace("-", ' ')
      this.errors.reqError = true
      setTimeout(()=>this.errors.reqError = false, time)
    },
    nameChange(){
      this.errors.start = false
      const tri = this.form.fullName.trim()
      const isAlpha = !validator.isAlpha(this.form.fullName, 'fr-FR', {ignore: ' '})
      const sup = this.form.fullName.length < 5
      this.errors.fullName = (!(tri === this.form.fullName) || isAlpha || sup )
    },
    emailChange(){
      this.errors.start = false
      this.errors.email = !validator.isEmail(this.form.email)
    },
    passwordChange(){
      this.errors.start = false
      this.errors.password = !validator.isStrongPassword(this.form.password)
    },
    birthChange(){
      this.errors.start = false
      const birthYear = new Date(Date.parse(this.form.birth)).getFullYear()
      this.errors.birth = (new Date().getFullYear() - birthYear) < 18
    },
    addressChange(){
      this.errors.start = false
      this.errors.address = !(this.form.address.trim() === this.form.address
      && this.form.address.length >= 3
      && validator.isAlpha(this.form.address, {ignore: ' '})
      )
    },
    login(){
      if (!this.form.password){
        this.showError('incorrect password', 3500)
        return
      }
      this.req = true
      signIn(this.form)
      .then(user=>{
        this.req = false
        this.$router.push("/")
      })
      .catch(e=>{
        this.req = false
        this.showError(e, 3500)
      })
    },
    async register(){
      this.req = true
      if (this.flag){
        const target = this.$refs.avatar
        const avatar = await uploadImage(`images/${target?.files[0].name}`, target.files[0])
        this.form.avatar = avatar
      }
      signUp(this.form)
      .then((userInfo)=>{
        this.req = false
        this.$refs.container.classList.toggle("active")
      })
      .catch(e=>{
        this.req = false
        this.showError(e, 3500)
      })
    },
    reinitPassword(){
      resetPassword(this.form.email)
      .then(()=>{
        this.$refs.modal.show({
              type: 'info',
              title: 'confirmation email',
              message: 'consultez votre boite mail afin de\
              reinitialiser votre mot de passe',
          })
        this.passr = false
      })
      .catch(e=>{
        this.$refs.modal.show({
              type: 'error',
              title: 'Erreur',
              display: false,
              errorMessage: e.code ? e.code : e?.message,
        })
      })
    }
  },
  setup(){
    const toggleForm = () => {
      const container = document.querySelector('.container');
      container.classList.toggle('active');
    };
    const toggleVisibility = (e)=>{
      const vs = e.target
      const ps = e.target.previousElementSibling
      ps.type = ps.type === 'password' ? 'text' : 'password'
      vs.textContent = ps.type ==='password' ? 'visibility_off' : 'visibility'
    }

    const next = (e)=>{
      const imgBx = document.querySelector(".imgBx")
      const parent = e.target.closest('.formBx')
      imgBx.style.display = 'none'
      parent.style.display = 'none'
      console.log(parent.nextElementSibling.style.display= 'flex')
    }

    const prev = (e)=>{
      const imgBx = document.querySelector(".imgBx")
      const parent = e.target.closest('.formBx')
      imgBx.style.display = 'block'
      parent.style.display = 'none'
      console.log(parent.previousElementSibling.style.display = 'flex')
    }
    return { toggleForm, toggleVisibility, next, prev }
  }
}
</script>

<style scoped>
section {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
</style>