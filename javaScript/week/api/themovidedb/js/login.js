/* Targetting elements*/

let login = document.querySelector(".login-button")
let email = document.querySelector(".email")
let password = document.querySelector(".passwd")
let sessionToken = null
let sessionId = null
let config = null
let res = null
/*Functions definitions */

async function loginF(e)
{
	e.preventDefault()
	eml = localStorage.getItem("email")
	passw = localStorage.getItem("password")
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

/* Event Listeners */

window.addEventListener("load", () => {
	isConnected = localStorage.getItem("is_connected")
	if (isConnected == "true"){window.location.href = "index.html"}
	login.addEventListener("click", loginF)
})