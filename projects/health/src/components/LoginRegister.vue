<template>
<transition>
    <div class="modal">
        <div class="register-fields" v-if="register">
            <span class="close"
			:onclick="closeModal"
			>
				x
			</span>
            <p class="register-title">Register</p>
            <input
                class="fields"
                type="text"
                placeholder="First Name"
                required
				v-model="fields.firstName"
            />
            <input
                class="fields"
                type="text"
                placeholder="Last Name"
                required
				v-model="fields.lastName"
            />
            <input
                class="fields"
                type="text"
                placeholder="email"
                required
				v-model="fields.email"
            />
            <input
                class="fields"
                type="password"
                placeholder="password"
                required
				v-model="fields.password"
            />
            <input
                class="fields"
                type="date"
                name="birth"
                required
				v-model="fields.birth" 
            />
            <div class="bottom">
				<p
					class="not-registred"
				>
					already registred ? <span
											class="reg"
											ref="log"
											:onclick="loginRegister"
										>
											login
										</span>
				</p>
				<img src="../assets/loading.gif"
					v-if="request"
					class="wait"
				>
                <button
					v-if="!request"
                	class="register-button"
					:onclick="registerCheck"
                >
                    register
                </button>
            </div>
            <div class="error" v-if="error"> {{ errorMessage}}</div>
        </div>
        <div class="validated" v-if="registrated">
            <span
				class="close"
				:onclick="closeModal"
			>
				x
			</span>
            <h1 class="register-success">Registration Successfull</h1>
            <img class="v" src="../assets/v.png" alt="" />
            <p class="message">
                We've sent you an email to <span id="email">{{ fields.email }}.</span><br />
                You need to confirm your account ...
            </p>
        </div>
		<div class="login" v-if="login">
			<span
				class="close"
				:onclick="closeModal"
			>
				x
			</span>
            <p class="register-title">LOGIN</p>
            <input
                class="fields"
                type="text"
                placeholder="email"
                required
				v-model="fields.email"
            />
            <input
                class="fields"
                type="password"
                placeholder="password"
                required
				v-model="fields.password"
            />
			<div class="bottom">
				<p
					class="not-registred"
				>
					not registred yet ? <span
											class="reg"
											ref="reg"
											:onclick="loginRegister"
										>
											register
										</span>
				</p>
				<img src="../assets/loading.gif"
					v-if="request"
					class="wait"
				>
                <button
					v-if="!request"
                	class="register-button"
					:onclick="loginCheck"
                >
                    login
                </button>
            </div>
			<div class="error" v-if="error">{{ errorMessage}}</div>
			<div class="success" v-if="success">login success</div>
		</div>
    </div>
</transition>
</template>

<script>
import {signIn, signUp} from "@/lib/firestoreLib"

export default {
	name: 'register',
	props: ['show'],
	data(){
		return {
			fields: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				birth: '',
				role: 'user'
			},
			errorMessage: "",
			login: true,
			register: false,
			error: false,
			success: false,
			registrated: false,
			request: false,
		}
	},
	methods: {
		submit(){
			// do something here !!!
		},
		loginRegister(e){
			const target = e.target
			if (target === this.$refs.log){
				this.register = false
				this.login = true
			} else if (target === this.$refs.reg){
				this.register = true,
				this.login = false
			}
		},
		closeModal(){
			console.log("close event")
			this.$emit("close")
			this.login = true
			this.registrated = false
			this.register = false
		},
		loginCheck(){
			console.log("loginCheck")
			this.request = true
			signIn(this.fields, (res)=>{
				console.log(res)
				if (res.user){
					localStorage.setItem("user",JSON.stringify(res.user))
					this.success = true
					this.request = false
					setTimeout(()=>this.success = false, 4000)
					this.$emit("loggedIn")
				}else{
					console.log(res)
					this.errorMessage = res.error.replace("auth/", '').replace("-", ' ')
					this.error = true
					this.request = false
					setTimeout(()=>this.error = false, 5000)
				}
			})
		},
		registerCheck(){
			this.request = true
			signUp(this.fields, (res)=>{
				if (res.status){ // register success
					this.register = false,
					this.login = false,
					this.registrated = true
					this.request = false
					return
				}
				// case of failure
				this.errorMessage = res.message.replace("auth/", '').replace("-", ' ')
				this.error = true
				this.request = false
				setTimeout(()=>this.error = false, 5000)
			})
		}
	}
}
</script>

<style>
	div.modal{
		background: rgba(0, 0, 0, 0.3);
		z-index: 5;
		top: 0;
		position: absolute;
		width: 100vw;
		height: 100vh;
	}

	.login,
	.register-fields{
		background-color: var(--black);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 1.5rem;
		border-radius: 1rem;
		width: 35rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.fields{
		color: var(--black);
		border-radius: .5rem;
		width: 25rem;
		font-style: oblique;
		margin: .8rem;
		font-size: 1.8rem;
		padding: .5rem;
	}

	.fields::placeholder{
		color: var(--black);
	}

	.register-title{
		padding: 1rem;
		color: var(--white);
		text-transform: uppercase;
		font-weight: bold;
		font-size: 2.5rem;
	}

	.register-button{
		cursor: pointer;
		border-radius: .5rem;
		color: var(--black);
		background-color: var(--white);
		margin: .5rem 1rem;
		font-size: 2rem;
		padding: .5rem;
	}

	.success,
	.error{
		width: 70%;
		/* border-top-right-radius: 1rem;
		border-top-left-radius: 1rem; */
		border-radius: 1rem;
		background-color: var(--white);
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		text-align: center;
		color: var(--red);
		font-size: 2.5rem;
	}

	.success{
		color: var(--green);
	}

	.validated{
		color: var(--white);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		padding: 2.5rem;
		border-radius: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		height: 25rem;
		background-color: var(--black);
	}

	.close{
		font-size: 2.5rem;
		cursor: pointer;
		color: var(--red);
		position: absolute;
		top: 0;
		right: 1.8rem;
	}

	.register-success{
		color: var(--green);
	}

	.v{
		width: 10rem;
		height: 10rem;
	}

	.message{
		font-size: 2.2rem;
	}

	#email{
		font-style: italic;
		font-weight: bold;
	}

	.login{
		opacity: 1;

	}

	.not-registred{
		font-size: 1.8rem;
		color: var(--white);
	}

	.reg{
		cursor: pointer;
		font-size: 2.2rem;
		text-decoration: underline;
	}

	.bottom .wait{
		height: 1rem;
		width: 7.5rem;
	}

	.reg:hover{
		color: var(--green);
	}

	.enter-from{
		opacity: 0;
	}

	.enter-to{
		opacity: 1;
	}

	.enter-active{
		transition: opacity 5s ease-in-out;
	}
</style>