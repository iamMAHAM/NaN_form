let n1 = 0
let n2 = 0



function randomNumber(min, max)
{
	return (Math.floor(Math.random() * (max - min) + min))

}

function generateNumber()
{
	let span1 = document.querySelector("#nl")
	let span2 = document.querySelector("#nr")

	n1 = randomNumber(0, 100)
	n2 = randomNumber(0, 100)

	span1.textContent = n1
	span2.textContent = n2
}

generateNumber()

function checkResult(e)
{
	if (Number(e.target.value) == (n1 + n2))
	{
		generateNumber()
		e.target.value = ""
	}
}