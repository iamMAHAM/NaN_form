function setRgb()
{
	let red = document.querySelector(".red")
	let green = document.querySelector(".green")
	let blue = document.querySelector(".blue")
	let color = document.querySelector(".color")
	color.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})` 
}

function setRgbg()
{
	let red = document.querySelector(".redl")
	let green = document.querySelector(".greenl")
	let blue = document.querySelector(".bluel")
	let color = document.querySelector(".gl")
	color.style.background = `linear-gradient(128deg, rgb(${red.value}, ${green.value}, ${blue.value}), rgba(${red.value}, ${green.value}, ${blue.value}, .3))`
}
