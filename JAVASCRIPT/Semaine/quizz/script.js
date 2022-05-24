/*Selection of elements */

let time = document.querySelector("#de")
let currentGrade = document.querySelector("#current-grade")
let checks = document.querySelectorAll(".checkbox")
let next = document.querySelector("#next")
let inter = null
/* Functions */

function upgradeRate()
{
	currentGrade.textContent = Number(currentGrade.textContent) + 2
}

function addOrRemoveListener(array, action)
{
	if (action === "add")
	{
		for (let i = 0; i < array.length; i++)
		{
			array[i].addEventListener("click", counter)
		}
	}

	else if (action === "remove")
	{
		for (let i = 0; i < array.length; i++)
		{
			array[i].removeEventListener("click", counter)
		}
	}

	else
	{
		console.log("Invalid argument ")
		return
	}
		
}

function counter(e)
{
	let parent = e.target.parentElement.parentElement.parentElement
	children = parent.children
	let first = children[0]
	console.log("first", first)
	addOrRemoveListener(checks, "remove")
	inter = setInterval(() =>
	{
		time.textContent = Number(time.textContent) - 1
		if (Number(time.textContent) === 0)
		{
			time.textContent = 3
			parent.removeChild(first)
			first = children[0]
			if (children.length === 0)
			{
				time.textContent = 0
				clearInterval(inter)
			}
			upgradeRate()
		}
	}, 1000)
}

function nextQuestions()
{
	clearInterval(inter)
	time.textContent = 3
	document.querySelector(".quizz").innerHTML = `			<div class="questions">
	<span class="question">next</span>
	<div class="lines">
		<input type="checkbox" class="checkbox">
		<span class="response">Abdul Kabore</span>
	</div>
	<div class="lines">
		<input type="checkbox" class="checkbox">
		<span class="response">Akoto</span>
	</div>
	<div class="lines">
		<input type="checkbox" class="checkbox">
		<span class="response">No Body</span>
	</div>
</div>
<div class="questions">
	<span class="question">next NaN</span>
	<div class="lines">
		<input type="checkbox" class="checkbox">
		<span class="response">Not a Number</span>
	</div>
	<div class="lines">
		<input type="checkbox" class="checkbox">
		<span class="response">Number a Number</span>
	</div>
	<div class="lines">
		<input type="checkbox" class="checkbox">
		<span class="response">Not African Number</span>
	</div>
</div>
<div class="questions">
	<span class="question">Qnext HTML</span>
	<div class="lines">
		<input type="checkbox" class="checkbox">
		<span class="response">Hypertext Markup Language</span>
	</div>
	<div class="lines">
		<input type="checkbox" class="checkbox">
		<span class="response">Hola Monl Light</span>
	</div>
	<div class="lines">
		<input type="checkbox" class="checkbox">
		<span class="response">Hooly Month Light</span>
	</div>
</div>`
addOrRemoveListener(document.querySelectorAll(".checkbox"), "add")
}

/*AddEventListener */
addOrRemoveListener(checks, "add")
next.addEventListener("click", nextQuestions)