/*-------------- Targetting elements---------------------------------*/

const e = require("express")

/*register target */
let registerParent = document.querySelector(".register-fields.register")
let register = document.querySelector(".register-button")
let avatar = document.querySelector("#avatar")
console.log(avatar)

/*login target */
let loginParent = document.querySelector(".register-fields.login")
let login = document.querySelector(".login-button")
let emailLogin = document.querySelector(".email")
let password = document.querySelector(".passwd")

/*left element */
let is_connected = false;
let checkbox = document.querySelector(".apple-switch")
checkbox.checked = true


/*-------------- Send Request ---------------------------------*/
async function check(path="/", data={}){
	res = await fetch(path, {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify(data)
	})
	res = await res.json()
	console.log(res)
}

/*-------------- Register Functions---------------------------------*/
function registerF(e)
{
	let user = {}
    let keys = ["name", "surname", "email", "password", "birth", "country", "avatar"]
	// e.preventDefault()
	for (let i = 1, j = 0; i < 7; i++, j++){
		user[keys[j]] = registerParent.children[i].value
	}
	user[keys[6]] = avatar.files[0].name
	checkbox.checked = true
	console.log(user)
	check("/user/create", user)
    toggle()
}

/*-------------- Login Functions---------------------------------*/
function loginF(e)
{
	e.preventDefault()
	check("/user/login")

	// {
	// 	emailLogin.style.borderColor = "red"
	// 	password.style.borderColor  = "red"
	// }
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

window.addEventListener("load", ()=>{
	checkbox.addEventListener("click", toggle)
	register.addEventListener("click", registerF)
	login.addEventListener("click", loginF)
})
