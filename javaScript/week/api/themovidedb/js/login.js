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
		sessionToken = await fetch("https://api.themoviedb.org/3/authentication/token/new?api_key=714e977060730eeb086fbb1570c15633")
		sessionToken = await sessionToken.json()
		console.log(sessionToken.request_token)
		console.log(JSON.stringify({request_token: sessionToken.request_token}))
		config =
		{
			method: "POST",
			body: JSON.stringify({request_token: sessionToken.request_token})
		}
		res = await fetch("https://api.themoviedb.org/3/authentication/session/new?api_key=714e977060730eeb086fbb1570c15633", config)
		res = await res.json()
		console.log(res)
	}
	else
	{
		email.style.borderColor = "red"
		password.style.borderColor  = "red"
		
	}
}

/* Event Listeners */
login.addEventListener("click", loginF)