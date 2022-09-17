<template>
  <section>
    <div class="container" ref="container">
      <div class="user signinBx">
        <div class="imgBx"><img src="../assets/reg.jpg" alt="" /></div>
        <div class="formBx">
          <form>
            <h2>Connexion</h2>
            <div class="input">
              <i class="material-symbols-outlined">alternate_email</i>
              <input
                v-model="form.email"
                type="email"
                placeholder="Email"
              >
            </div>
            <div class="input">
              <i class="material-symbols-outlined">lock</i>
              <input
                v-model="form.password"
                type="password"
                class="ps"
                placeholder="Mot de passe"
              >
              <i
                class="material-symbols-outlined vs"
                @click="toggleVisibility"
              >
                visibility_off
              </i>
            </div>
            <div class="error" v-if="errors.reqError">{{ errors.message }}</div>
            <input
              type="submit"
              value="Se Connecter"
              @click.prevent="login"
            />
            <p class="signup">
              Pas encore inscrit ?
              <a href="#" @click="toggleForm();">S'inscrire</a>
            </p>
          </form>
        </div>
      </div>
      <div class="user signupBx">
        <div class="formBx">
          <form action="" onsubmit="return false;">
            <h2>Inscription</h2>
            <div class="error" v-if="errors.reqError">{{ errors.message }}</div>
            <div class="input">
              <i class="material-symbols-outlined">badge</i>
              <input
                v-model="form.fullName"
                @change="nameChange"
                type="text"
                placeholder="Nom complet"
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
                placeholder="Email"
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
                placeholder="Address ou Lieu d'Habitation">
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
                type="date"
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
                type="file"
              >
            </div>
            <input
              type="submit"
              value="S'inscrire"
              :disabled="state"
              @click.prevent="register"
            />
            <p class="signup">
              déjà inscrit ?
              <a href="#" @click="toggleForm()">Se connecter.</a>
            </p>
          </form>
        </div>
        <div class="imgBx"><img src="../assets/reg.jpg" alt="" /></div></div>
    </div>
  </section>
</template>

<script>
import validator from 'validator';
import { signUp, signIn, auth } from '@/lib/firestoreLib';
import { onMounted } from '@vue/runtime-core';

export default {
  name: 'Auth',
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
        avatar: "https://firebasestorage.googleapis.com/v0/b/immobilier-0.appspot.com/o/profiles%2Favatar-icon.svg?alt=media&token=516f42ab-4ec8-45a0-b66c-1e4058455e4c"
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
      }
    }
  },
  methods: {
    showError(message, time=0){
      console.log("original", message)
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
      this.errors.address = !validator.isAlpha(this.form.address) && this.form.address.length >= 3
    },
    login(){
      signIn(this.form)
      .then(user=>{
        console.log(user)
        this.$router.go(-1)
      })
      .catch(e=>{
        this.showError(e, 3500)
      })
    },
    register(){
      signUp(this.form)
      .then((userInfo)=>{
        console.log(userInfo)
        this.$refs.container.classList.toggle("active")
      })
      .catch(e=>{
        this.showError(e, 3500)
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
    return { toggleForm, toggleVisibility }
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
<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap');

section .container {
  position: relative;
  width: 80rem;
  min-height: 50rem;
  height: auto;
  background: #fff;
  box-shadow: 0 1.5rem 5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

section .container .user {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

section .container .user .imgBx {
  position: relative;
  width: 50%;
  height: 100%;
  transition: 0.5s;
}

section .container .user .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

section .container .user .formBx {
  position: relative;
  width: 50%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  transition: 0.5s;
}

section .container .user .formBx form h2 {
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .2rem;
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
  color: #555;
}

section .container .user .formBx form input {
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

section .container .user .formBx form input[type='submit'] {
  border-radius: 1rem;
  max-width: max-content;
  background: var(--navcolor);
  color: #fff;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: .1rem;
  transition: 0.5s;
}

section .container .user .formBx form input[type='submit']:disabled{
  background: var(--hovercolor);
}

section .container .user .formBx form input[type='submit']:hover{
  background: var(--hovercolor);
}

.button-style,
section .container .user .formBx form .signup {
  position: relative;
  margin-top: 1.5rem;
  font-size: 1.2rem;
  letter-spacing: .1rem;
  color: #555;
  text-transform: uppercase;
  font-weight: 300;
}

section .container .user .formBx form .signup a {
  font-weight: 600;
  text-decoration: none;
  color: var(--navcolor);
}

section .container .user .formBx form .signup a:hover{
  color: var(--hovercolor);
}

section .container .signupBx {
  pointer-events: none;
}

section .container.active .signupBx {
  pointer-events: initial;
}

section .container .signupBx .formBx {
  left: 100%;
}

section .container.active .signupBx .formBx {
  left: 0;
}

section .container .signupBx .imgBx {
  left: -100%;
}

section .container.active .signupBx .imgBx {
  left: 0%;
}

section .container .signinBx .formBx {
  left: 0%;
}

section .container.active .signinBx .formBx {
  left: 100%;
}

section .container .signinBx .imgBx {
  left: 0%;
}

section .container.active .signinBx .imgBx {
  left: -100%;
}

div.input{
  margin: .5rem 0;
  border-radius: 1rem;
  padding: 0 1rem;
  align-items: center;
  display: flex;
  background: var(--gray);
}

div.input i{
  font-size: 3rem;
}

.formBx form{
  width: 100%;
}

.vs{
  cursor: pointer;
}

div.error{
  line-height: 1rem;
  font-size: 1rem;
  text-align: center;
  color: red;
  font-weight: 300;
}

@media (max-width: 99.1px) {
  section .container {
    max-width: 40rem;
  }

  section .container .imgBx {
    display: none;
  }

  section .container .user .formBx {
    width: 100%;
  }
}

</style>