/* Targetting elements*/

let parent = document.querySelector(".register-fieldset")
let register = document.querySelector(".register-button")
let email = document.querySelector(".email")
let pass  = document.querySelector(".password")
let age = document.querySelector(".age")
let name = document.querySelector(".name")
let surname  = document.querySelector(".surname")
let country = document.querySelector(".country")
/*Functions definitions */
console.log(parent.children)
let keys = ["name", "surname", "email", "password", "age", "country"]
function registerF(e)
{
	for (let i = 1, j = 0; i < 7; i++, j++)
	{
		localStorage.setItem(keys[j], parent.children[i].value)
		console.log(`item : ${keys[j]} || value : ${parent.children[i].value}`)
	}
}

/* Event Listeners */
console.log(register)
register.addEventListener("click", registerF)
