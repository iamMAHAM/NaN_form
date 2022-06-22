/*-------------- Targetting elements---------------------------------*/

/*register target */
let registerParent = document.querySelector(".register-fields.register")
let register = document.querySelector(".register-button")

/*login target */
let loginParent = document.querySelector(".register-fields.login")
let login = document.querySelector(".login-button")
let emailLogin = document.querySelector(".email")
let password = document.querySelector(".passwd")

/*left element */
let is_connected = false;
let checkbox = document.querySelector(".apple-switch")
checkbox.checked = true

/*-------------- Register Functions---------------------------------*/
function registerF(e)
{
	let user = {}
    let keys = ["name", "surname", "email", "password", "age", "country", "photo"]
	e.preventDefault()
	for (let i = 1, j = 0; i < 7; i++, j++)
	{
		user[keys[j]] = registerParent.children[i].value
	}
	user[keys[6]] = document.querySelector("#avatar").value
	localStorage.setItem("user", JSON.stringify(user))
	checkbox.checked = true
    toggle()
}

/*-------------- Login Functions---------------------------------*/
function loginF(e)
{
	e.preventDefault()
	let user = JSON.parse(localStorage.getItem("user"))
	let eml = user.email
	let passw = user.password
	if (eml === emailLogin.value && passw === password.value)
	{
		localStorage.setItem("is_connected", "true")
		window.location.href = "index.html"
	}
	else
	{
		localStorage.setItem("is_connected", "false")
		emailLogin.style.borderColor = "red"
		password.style.borderColor  = "red"
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

/*-------------- Event Listener---------------------------------*/

window.addEventListener("load", ()=>{
	is_connected = localStorage.getItem("is_connected")

	if (is_connected === "true"){window.location.href = "index.html"}
	else{
		checkbox.addEventListener("click", toggle)
		register.addEventListener("click", registerF)
		login.addEventListener("click", loginF)
	}
})