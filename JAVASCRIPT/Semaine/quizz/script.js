/*Selection of elements */

let time = document.querySelector("#de")
let currentGrade = document.querySelector("#current-grade")
let checks = document.querySelectorAll(".checkbox")
let next = document.querySelector("#next")
let question = document.querySelector(".question")
let response = document.querySelectorAll(".response")
let inter = null
let index = null
let questions = null
let currentArray = []
/* Functions */

function upgradeRate()
{
	currentGrade.textContent = Number(currentGrade.textContent) + 2
}

function addChecked(e)
{
	currentArray.sort()
	if (e.target.checked)
	{
		let value = Number(e.target.value)
		console.log("value added", value)
		currentArray.push(value)
	}
	else
	{
		let value = Number(e.target.value)
		console.log("value removed",value)
		currentArray.splice(currentArray.indexOf(value), 1)
	}
	currentArray.sort()
}

function uncheckAll()
{
	for (let i = 0; i < checks.length; i++)
	{
		checks[i].checked = false
	}
}

function addOrRemoveListener(array, action)
{
	if (action === "add")
	{
		for (let i = 0; i < array.length; i++)
		{
			array[i].addEventListener("click", counter)
			array[i].addEventListener("click", addChecked)
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
				verifyAnswer()
			}
		}
	}, 1000)
}

function nextQuestions()
{
	uncheckAll()
	clearInterval(inter)
	time.textContent = 60
	addOrRemoveListener(document.querySelectorAll(".checkbox"), "add")
	verifyAnswer(index)
	randomQuestion()
}

function verifyAnswer(index)
{
	console.log("current", currentArray)
	correct = questions[index].correctIndex.sort()
	console.log(correct)
	if (JSON.stringify(correct) === JSON.stringify(currentArray))
	{
		upgradeRate()
	}
	else
	{
		alert("you failed this question")
	}
}

function randomQuestion()
{
	index = getRandomIndex(questions)
	let elms = questions[index]
	question.textContent = elms.question
	for (let i = 0; i < 4; i++)
	{
		switch (i)
		{
			case 0:
				response[i].textContent = elms.answers[i]
			case 1:
				response[i].textContent = elms.answers[i]
			case 2:
				response[i].textContent = elms.answers[i]
			case 3:
				response[i].textContent = elms.answers[i]
		}
	}
}
/*Json treatment*/

function getRandomIndex(array)
{
	return Math.floor(Math.random() * array.length)
}

window.addEventListener("load", async () =>
{
	questions = await fetch("./quizz.json")
	questions = await questions.json()
	questions = questions.questions
	randomQuestion()
})

/*AddEventListener */
addOrRemoveListener(checks, "add")
next.addEventListener("click", nextQuestions)