/*Selection of elements */

let time = document.querySelector("#de")
let currentGrade = document.querySelector("#current-grade")
let checks = document.querySelectorAll(".checkbox")
let next = document.querySelector("#next")
let question = document.querySelector(".question")
let response = document.querySelectorAll(".response")
let quizz = document.querySelector(".quizz")
let indicator = document.querySelector(".success-failed")
let grades = document.querySelector(".grades")
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

function counter()
{
	addOrRemoveListener(checks, "remove")
	inter = setInterval(() =>
	{
		time.textContent = Number(time.textContent) - 1
		if (Number(time.textContent) === 0)
		{
			verifyAnswer()
			console.log("index before check if condition", index)
			if (index === questions.length - 1)
			{
				time.textContent = 0
				clearInterval(inter)
				quizz.style.display = "none"
				grades.style.transform = "scale(1.5)"
				return

			}
			time.textContent = 15
			newQuestion()
		}
	}, 1000)
}

function successFailed()
{
	indicator.style.display = "none"
}
function verifyAnswer()
{
	console.log("current", currentArray)
	console.log("correct no sorted ", questions[index].correctIndex)
	correct = questions[index].correctIndex.sort()
	console.log("correct sorted", correct)
	console.log("stringiofied", JSON.stringify(currentArray))
	if (JSON.stringify(correct) === JSON.stringify(currentArray))
	{
		indicator.style.display = "block"
		indicator.style.color = "green"
		indicator.textContent = "Great you succeed this question ! "
		upgradeRate()
	}
	else
	{
		indicator.style.display = "block"
		indicator.style.color = "red"
		indicator.textContent = "Sorry you failed this question ! "
	}
	setTimeout(successFailed, 2000)
}

function newQuestion()
{
	uncheckAll()
	currentArray = []
	index += 1
	let elms = questions[index]
	question.textContent = elms.question
	for (let i = 0; i < 4; i++)
	{
		response[i].textContent = elms.answers[i]
	}
}
/*Json treatment*/

window.addEventListener("load", async () =>
{
	index = -1
	questions = await fetch("./quizz.json")
	questions = await questions.json()
	questions = questions.questions
	newQuestion()
})

/*AddEventListener */
addOrRemoveListener(checks, "add")
next.addEventListener("click", newQuestion)