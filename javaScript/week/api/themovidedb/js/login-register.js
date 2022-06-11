/*-------------- Targetting elements---------------------------------*/

/*register target */
let registerParent = document.querySelector(".register-fields.register")
let register = document.querySelector(".register-button")
let email = document.querySelector(".email")
let pass  = document.querySelector(".password")
let age = document.querySelector(".age")
let name = document.querySelector(".name")
let surname  = document.querySelector(".surname")
let country = document.querySelector(".country")

/*login target */
let loginParent = document.querySelector(".register-fields.login")
let login = document.querySelector(".login-button")
let emailLogin = document.querySelector(".email")
let password = document.querySelector(".passwd")
let sessionToken = null
let sessionId = null
let config = null
let res = null

/*left element */
let checkbox = document.querySelector(".apple-switch")
checkbox.checked = true

/*-------------- Register Functions---------------------------------*/
function registerF(e)
{
    let keys = ["name", "surname", "email", "password", "age", "country"]
	e.preventDefault()
	for (let i = 1, j = 0; i < 7; i++, j++)
	{
		localStorage.setItem(keys[j], registerParent.children[i].value)
	}
	checkbox.checked = true
    toggle()
}

/*-------------- Login Functions---------------------------------*/
function loginF(e)
{
	e.preventDefault()
	let eml = localStorage.getItem("email")
	let passw = localStorage.getItem("password")
	if (eml === email.value && passw === password.value)
	{
		localStorage.setItem("is_connected", "true")
		window.location.href = "index.html"
	}
	else
	{
		localStorage.setItem("is_connected", "false")
		email.style.borderColor = "red"
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
checkbox.addEventListener("click", toggle)
register.addEventListener("click", registerF)
login.addEventListener("click", loginF)