/*-------------- Targetting elements---------------------------------*/

/*register target */
let registerParent = document.querySelector(".register-fields.register")
let register = document.querySelector(".register-button")
let avatar = document.querySelector("#avatar")
let hasSession = null

/*check if there is already a session*/
hasSession = sessionStorage.getItem("session")
console.log(hasSession)
if (hasSession){
	try {
		JSON.parse(hasSession)
		window.location.href = "index"
	} catch {
	}
}

/*login target */
let loginParent = document.querySelector(".register-fields.login")
let login = document.querySelector(".login-button")
let emailLogin = document.querySelector(".email.login")
let password = document.querySelector(".passwd")

/*left element */
let is_connected = false;
let checkbox = document.querySelector(".apple-switch")
checkbox.checked = true

/*-------------- Send Request ---------------------------------*/
async function check(path="/", data={}){
	console.log("new request on ", path)
	console.log("with data : ", data)
	res = await fetch(path, {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify(data)
	})
	res = await res.json()
	return res
}

/*-------------- Register Functions---------------------------------*/
async function registerF()
{
	let user = {}
    let keys = ["name", "surname", "email", "password", "birth", "country", "avatar"]
	// e.preventDefault()
	for (let i = 1, j = 0; i < 7; i++, j++){
		user[keys[j]] = registerParent.children[i].value
	}
	user[keys[6]] = avatar.files[0].name
	console.log(user)
	res = await check("/user/create", user)
    if (res.status === "ok"){
		checkbox.checked = true
		toggle()
	}
}

/*-------------- Login Functions---------------------------------*/
async function loginF(e)
{
	credential = {
		email: emailLogin.value,
		password: password.value
	}
	res = await check("/user/login", credential)
	if (res.status === "true"){
		window.location.href = "http://localhost:3000/index"
		sessionStorage.setItem("session", JSON.stringify(res.message))
	}else{
		emailLogin.style.borderColor = "red"
		password.style.borderColor  = "red"
		setTimeout(()=>{
			emailLogin.style.borderColor = "white"
			password.style.borderColor  = "white"
		}, 3000)
	}
}

/*-------------- Login Functions---------------------------------*/
function toggle()
{
    console.log(checkbox.checked)
    if (checkbox.checked)
    {
        console.log("login page --> || <--- register page")
        loginParent.classList.remove("hide")
        loginParent.classList.add("active")
        registerParent.classList.remove("active")
        registerParent.classList.add("hide")
    }
    else
    {
        console.log("register page --> || <--- login page")
        registerParent.classList.remove("hide")
        registerParent.classList.add("active")
        loginParent.classList.remove("active")
        loginParent.classList.add("hide")
    }
}

/*-------------- Verification---------------------------------*/

/*-------------- Event Listener-------------------------------*/

window.addEventListener("DOMContentLoaded", ()=>{
	checkbox.addEventListener("click", toggle)
	register.addEventListener("click", registerF)
	login.addEventListener("click", loginF)
})
