<template>
  <div class="profile">
    <table class="table-profile">
      <tr>
        <td style="text-align:center; vertical-align: middle;">
          <section>
            <label for="avatar">
              <i class="fa material-symbols-outlined">
                photo_camera
              </i>
              <input type="file" id="avatar" style="visibility:hidden;" accept=".png,.jpg,jpeg,.PNG,.JPEG, .webp" name="avatar" @change="changeAvatar">
            </label>
            <img :src="form.avatar" ref="preview" id="preview" alt="Avatar">
          </section>
        </td>
        <td>
          <ul id="fields" ref="ab">
            <li>
              <b>Full name</b>
              <input type="text" class="fields" maxlength="100" v-model="form.fullName" style="pointer-events: none !important"/>
            </li>
            <li ref="ab">
              <b>Email</b>
              <input type="email" class="fields" maxlength="150" v-model="form.email" />
            </li>
            <li ref="ab">
              <b>Address</b>
              <input type="tel" class="fields" maxlength="100" v-model="form.address" />
            </li>
            <li>
              <b>Birthday</b>
              <input type="text" class="fields" maxlength="250" v-model="form.birth" style="pointer-events: none !important"/>
            </li>

            <li>
              <b>Password</b>
              <input
                type="password"
                class="fields"
                maxlength="50"
                @change="changePass"
              />
              <i
                class="material-symbols-outlined vs"
                @click="toggleVisibility"
              >
                visibility_off
              </i>
            </li>
            <div class="error" v-if="error">minimum 8 caractères (majuscule, miniscule , symbole)</div>
          </ul>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { auth, updateOne, uploadImage } from '@/lib/firestoreLib'
import { uuidv4 } from '@firebase/util'
import { updateProfile } from '@firebase/auth'
import validator from 'validator'
export default {
	name: 'profile',
  props: ['form'],
  emits: ['changePass'], 
  data(){return { error: false}},
  methods:{
    changeAvatar(e){
      const file = e.target.files[0]
      const preview = this.$refs.preview
      uploadImage(`profiles/${auth?.currentUser?.uid}/${uuidv4() + '-' +file.name}`, file)
      .then(url=>{
        updateProfile(auth?.currentUser, {
          photoURL: url
        })
        .then(()=>{
          updateOne("users", auth?.currentUser?.uid, {avatar: url})
        })
        .then(()=>{
          const url = window.URL.createObjectURL(file)
          preview.src = url
        })
      })
    },
    changePass(e){
      if (validator.isStrongPassword(this.form.password)){
        this.$emit("changePass", e.target.value)
        this.error = false
        return
      }
      this.error = true
    }
  },
  setup(){
    const toggleVisibility = (e)=>{
      const vs = e.target
      const ps = e.target.previousElementSibling
      ps.type = ps.type === 'password' ? 'text' : 'password'
      vs.textContent = ps.type ==='password' ? 'visibility_off' : 'visibility'
    }

    return {toggleVisibility}
  }
}
</script>


<style scoped>
.profile a, li, em, button, input, textarea, select{
	text-decoration: none;
	list-style: none;
	font-style: normal;
	outline: none !important;
	transition: 0.5s;
	resize: none;
}
.profile .table-profile td:nth-child(1) section{
    position:relative;
    width: 20rem;
    margin: auto;
}

.fields{
    margin: 0 .5rem;
    background:none;
    font-size: 16px;
    outline:none;
    border:0;
    color:gray;
    width:65%;
  }

.profile .table-profile td:nth-child(1) .fa{
    position:absolute;
    right:25px;
    top:25px;
    font-size:2em;
}

#preview{
    width:200px;
    height:200px;
    border-radius:50%;
}

.profile .table-profile td h3{
    color:gray;
    font-weight:normal;
}

#submit{
	margin-top: 1rem;
    color: var(--hovercolor);
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    font-size: 18px;
    width: auto;
    background-color: var(--white);
    border: .5px solid var(--hovercolor);
    border-radius: 5px;
}

#fields{
  position: relative;
  vertical-align: middle;
  padding: 2.5rem;
  pointer-events: none;
}

#fields li{
    padding: 20px 0;
    border-bottom: .01rem solid var(--navcolor);
    display: flex;
    justify-content: space-between;
}

.input .wait{
	width: 5rem;
	height: .5rem;
}
</style>

<style scoped>

.fa{
    color:var(--white);
    cursor: pointer;
}

.profile{
    width:90%;
    margin: 1.5rem auto;
}

.profile .table-profile{
    width:100%;
}

.profile .table-profile td{
    margin:30px;
    border-radius:5px;
    box-shadow:0px 6px 16px -6px rgba(1,1,1,0.5);
    padding:30px;
    background-color: var(--hovercolor);
    color:#fff;
    vertical-align:top;
}

.profile .table-profile td:nth-child(2) .fa{
    float:right;
}


#submit:hover{
	color: var(--white);
	background-color: var(--white);
}

@media (max-width:820px){
    .profile{
		position: relative;
		left: 5%;
    }
    .profile .table-profile td{
        display:block;
        width:100%;
        margin:0px;
    }

    .profile{
      width: 100%;
      margin: 0;
    }
    .profile .table-profile .section2 .quantityselector section{
        width:41%;
        margin:0px 10px;
    }
    .profile .table-profile .section2 #fields{
        position:relative;
        left:-40px;
    }

}
	.alert.success {background-color: #04AA6D;}
	.alert.info {background-color: #2196F3;}
	.alert.warning {background-color: #ff9800;}

	.closebtn {
		margin-left: 15px;
		color: white;
		font-weight: bold;
		float: right;
		font-size: 22px;
		line-height: 20px;
		cursor: pointer;
		transition: 0.3s;
	}

	.closebtn:hover {
		color: black;
	}
</style>