/* Targetting elements*/

let register_left = document.querySelector(".register-from-left")
let login_left = document.querySelector(".login-from-left")
let register = document.querySelector(".register")
let login = document.querySelector(".login")
let already = document.querySelector(".already")
let noyet  = document.querySelector(".noyet")
let body  = document.body

/*Functions definitions */

function registerField()
{
	login.classList.remove("active")
	register.classList.add("active")
}

function loginField()
{
	register.classList.remove("active")
	login.classList.add("active")
}

function isPresentElement(parent, elementClass)
{
	let children_arrays = parent.children
	for (let i = 0; i < children_arrays.length; i++)
	{
		if (children_arrays[i].classList.contains(`${elementClass}`))
		{
			return true
		}
	}
	return false

}

function removeElementsByClass(className)
{
	const elements = document.getElementsByClassName(className)
	while (elements.length > 0)
	{
		elements[0].parentNode.removeChild(elements[0])
	}
}

/* Event Listeners */

console.log(register_left)
register_left.addEventListener("click", registerField)

console.log(login_left)
login_left.addEventListener("click", loginField)