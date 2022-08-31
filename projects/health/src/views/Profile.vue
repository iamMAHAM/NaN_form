<template>
  <div class="profile">
        <table>
            <tr>
            <td>
                <section>
                    <label for="avatar">
                    <i class="fa material-icons"
						>
						photo_camera
					</i>
                    <input
						type="file"
						id="avatar"
						style="visibility:hidden;"
						accept=".png,.jpg,jpeg,.PNG,.JPEG" 
						name="avatar"
						@change="handleChange"
					>
                    </label>
                    <img
						:src="form.avatar ? form.avatar : '../H.png'"
						ref="preview"
						id="preview"
						alt="Avatar"
					>
                </section>
                <h1>{{ form.firstName }} {{ form.lastName }}</h1>
                <h3>{{ form.role }}</h3>
            </td>
            <td>
                <ul id="fields" ref="ab">
                    <li>
                        <b>Full name</b>
                        <input type="text" 
							class="fields"
							maxlength="100"
							:value='`${form.firstName} ${form.lastName}`'
						/>
                        <i v-if="ok"
							class="material-icons fa edit"
						>
							edit_square
						</i>
                    </li>
                    <li ref="ab">
                        <b>Email</b>
                        <input type="email" 
							class="fields"
							maxlength="150"
							v-model="form.email" 
						/>
                        <i class="material-icons fa edit"
							>
							edit_square
						</i>
                    </li>
                    <li ref="ab">
                        <b>Contact number</b>
                        <input type="tel" 
							class="fields"
							maxlength="10"
							v-model="form.contact"
						/>
                        <i class="material-icons fa edit"
							>
							edit_square
						</i>
                    </li>
                    <li>
                        <b>Birthday</b>
                        <input
							type="text" 
							class="fields"
							maxlength="250"
							v-model="form.birth"
						/>
                        <i class="material-icons fa edit"
							>
							edit_square
						</i>
                    </li>

                    <li>
                        <b>Change Password</b>
                        <input
							type="password" 
							class="fields"
							maxlength="50"
							v-model="form.new_password"
						/>
                        <i class="material-icons fa edit"
							>
							edit_square
						</i>
                    </li>
                </ul>
                <div
					class="input"
				>
                    <input
						ref="submit"
						type="submit"
						value="submit"
						id="submit"
						@click="submitForm"
						v-if="!request"
					>
					<img
						src="../assets/loading.gif"
						class="wait"
						v-if="request"
					>
                </div>
            </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { uploadImage, updateUserInfo } from '@/lib/firestoreLib'
import { v4 } from "uuid"
export default {
	name: 'profile',
	data(){
		return {
			form: {
				id: '',
				avatar: null,
				email: '',
				password: '',
				birth: '',
				contact: '',
				new_password: ''
			},
			ok: false,
			edit_buttons: null,
			edit_conf: null,
			request: false
		}
	},
	mounted(){
		this.edit_buttons = document.querySelectorAll(".fa.edit")
		const user = JSON.parse(localStorage.getItem("user"))
		this.form = user
		this.updateEvent(1, this.edit_buttons, this.editEvent)

	},
	methods:{
		editEvent(e){
			const target = e.target
			const field = target.previousElementSibling
			field.style.pointerEvents = "auto"
			field.focus()
			target.outerHTML = '<i class="fa material-icons">check</i>'
			this.edit_conf = document.querySelectorAll(".fa")
			this.updateEvent(0, this.edit_buttons, this.editEvent)
    		this.updateEvent(1, this.edit_conf, this.closeEvent)
		},
		closeEvent(e){
			const target = e.target
			const field = target.previousElementSibling
			field.style.pointerEvents = "none"
			target.outerHTML = '<i class="fa material-icons">edit_square</i>'
			this.edit_buttons = document.querySelectorAll(".fa")
			this.updateEvent(0, this.edit_conf, this.closeEvent)
			this.updateEvent(1, this.edit_buttons, this.editEvent)
		},
		updateEvent(flag, array, listener){
			if (flag){
				Array.from(array).forEach(child=>{
					child.addEventListener("click", listener)
				})
			} else{
				Array.from(array).forEach(child=>{
					child.removeEventListener("click", listener)
				})
			}
		},
		handleChange(e){
			const target = e.target
			const cleanName = target.files[0].name + v4()
			this.$refs.preview.src = URL.createObjectURL(target.files[0])
			uploadImage(`profiles/${cleanName}`, target.files[0], async url=>{
				this.form.avatar = url
				await updateUserInfo(this.form.id, {avatar: url})
				localStorage.setItem("user", JSON.stringify(this.form))
			})
		},
		async submitForm(e){
			this.request = true
			e.preventDefault()
			await updateUserInfo(this.form.id, this.form)
			localStorage.setItem("user", JSON.stringify(this.form))
			this.request = false
		}

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

.fields{
	text-align: justify;
	background:none;
	font-size: 16px;
	outline:none;
	border:0;
	color:gray;
	width:60%;
	pointer-events:none;
}

.profile table td:nth-child(1) section{
    position:relative;
    width:200px;
    height:200px;
    margin:5vh auto;
}


.profile table td:nth-child(1) .fa{
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

.profile table td h3{
    color:gray;
    font-weight:normal;
}

.input{
    text-align: center;
}

#submit{
	margin-top: 1rem;
    color: var(--black);
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    font-size: 18px;
    width: auto;
    background-color: var(--white);
    border: .5px solid var(--black);
    border-radius: 5px;
}

ul{
    position: relative;
    left: -20px;
}

ul li{
    padding: 20px 0;
    color: gray; 
    border-bottom:1px solid var(--black);
}

b{
    color:#fff;
}

.input .wait{
	width: 5rem;
	height: .5rem;
}
</style>

<style>

.fa{
    color:var(--green);
    cursor: pointer;
}

.profile{
    width:90%;
    margin:10vh auto;
}

.profile table{
    width:100%;
}

.profile table td{
    margin:30px;
    border-radius:5px;
    box-shadow:0px 6px 16px -6px rgba(1,1,1,0.5);
    padding:30px;
    background-color: var(--black);
    color:#fff;
    vertical-align:top;
}

.profile table td:nth-child(1){
    text-align:Center;
}

.profile table td:nth-child(2) .fa{
    float:right;
}


#submit:hover{
	color: var(--white);
	background-color: var(--green);
}

@media (max-width:820px){
    .profile{
		position: relative;
		left: 5%;
    }
    .profile table td{
        display:block;
        width:90%;
        margin:0px;
    }
    .profile table .section2 .quantityselector section{
        width:41%;
        margin:0px 10px;
    }
    .profile table .section2 ul{
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