/* Targetting elements*/

let login = document.querySelector(".login-button")
let email = document.querySelector(".email")
let password = document.querySelector(".passwd")
/*Functions definitions */

function loginF(e)
{
	eml = localStorage.getItem("email")
	passw = localStorage.getItem("password")
	if (eml === email.value && passw === password.value)
	{
		
	}
	else {alert("connection failed")}
}

/* Event Listeners */
console.log(login)
login.addEventListener("click", loginF)