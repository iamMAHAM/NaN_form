let loginButton = document.querySelector("#login_button")
let bg = document.querySelector(".bg")
let form = document.querySelector("form")
let showHide = document.querySelector("#afficher")
let closeButton = document.querySelector("#close-button")
let passDiv = document.querySelector(".pwd")
let body = document.body

function login_page()
{
	bg.style.display = "block"
	form.style.display = "block"
	body.style.height = "100%"
	body.style.overflow = "hidden"
}

function close_page()
{

	bg.style.display = "none"
	form.style.display = "none"
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

loginButton.addEventListener("click", login_page)
closeButton.addEventListener("click", close_page)
passDiv.addEventListener("clcik", showOrHide)