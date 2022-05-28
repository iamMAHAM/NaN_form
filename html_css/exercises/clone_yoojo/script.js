let loginButton = document.querySelector("#login_button")
let registerButton = document.querySelector("#register")
let loginRegister = document.querySelector("#login_from_register")
let connectLogin = document.querySelector("")
let bg = document.querySelector(".bg")
let form1 = document.querySelector("#form1")
let form2 = document.querySelector("#form2")
let showHide = document.querySelector("#afficher")
let closeButton = document.querySelector("#close-button")
let passDiv = document.querySelector(".pwd")
let body = document.body

function loginPage()
{
	form2.style.display = "none"
	bg.style.display = "block"
	form1.style.display = "block"
	body.style.height = "100%"
	body.style.overflow = "hidden"
}

function closePage()
{
	bg.style.display = "none"
	form1.style.display = "none"
	body.style.overflow = "visible"
}

function showOrHide(e) 
{
	if (passDiv.type === "password")
	{
		passDiv.type = "text"
		showHide.textContent = "masquer"
		return
	}
	showHide.textContent = "afficher"
	passDiv.type = "password"
}

function registerPage()
{
	bg.style.display = "block"
	form1.style.display = "none"
	form2.style.display = "block"
	body.style.height = "100%"
	body.style.overflow = "hidden"
}

loginButton.addEventListener("click", loginPage)
closeButton.addEventListener("click", closePage)
passDiv.addEventListener("click", showOrHide)
registerButton.addEventListener("click", registerPage)
loginRegister.addEventListener("click", loginPage)