/*parent selector*/
let container = document.querySelector("div")
let body = document.body

/*creating the buttons */
let div = document.createElement("div")
div.style.border = "2px solid #555"
div.className = "s_cond"
let clickButton = document.createElement("button")
let resetButton = document.createElement("button")
let addButton = document.createElement("button")
clickButton.textContent = "Color"
resetButton.textContent = "Reset"
resetButton.disabled = true
clickButton.disabled = true
addButton.textContent = "Add"

clickButton.className = "bous"
resetButton.className = "bous"
addButton.className = "bous"

/*adding button to body */
container.appendChild(div)
container.appendChild(clickButton)
container.appendChild(resetButton)
container.appendChild(addButton)

/* usefull functions */
function addBlock()
{
	let block = document.createElement("div")
	block.className = "divs"
	block.style.border = "2px solid #555"
	block.style.backgroundColor = getRandomColor()
	console.log(block)
	div.appendChild(block)
	if (countChild(div) == 9)
	{
		addButton.disabled = true
	}
	else
	{
		resetButton.disabled = false
		clickButton.disabled = false
		resetButton.disabled = false
	}
}

function getRandomColor()
{
	let letters = "0123456789ABCDEF"
	let color = "#"
	for (var i = 0; i < 6; i++)
	{
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

function resetAll()
{
	let lastChild = div.lastElementChild
	while (lastChild)
	{
		div.removeChild(lastChild)
		lastChild = div.lastElementChild
	}
	resetButton.disabled = true
	resetButton.disabled = true
	addButton.disabled = false
	clickButton.disabled = true
}

function randomColor()
{
	for (let i = 0; i < div.children.length; i++)
	{
		div.children[i].style.backgroundColor = getRandomColor()
		console.log(div.children[i])
	}
}

function countChild(element)
{
	return element.children.length
}

function appendToDiv()
{
	for (let i = 0; i < 9; i++)
	{
		addBlock()
	}
}
/*Event Listener */
appendToDiv()
clickButton.addEventListener("click", randomColor)
resetButton.addEventListener("click", resetAll)
addButton.addEventListener("click", addBlock)
