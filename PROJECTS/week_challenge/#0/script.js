let div = document.querySelector("#child")
let button = document.querySelector("button")

/**
 * sleep - wait a time before continue
 * @ms: the time to wait in ms 
 * Return: a Promise instance
 */
function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * showOrHide - show or hide text
 * Return: None
 */
async function showOrHide()
{
	if (!p.classList.contains("anim"))
	{
		p.classList.add("anim")
		await sleep(5000)
		button.textContent = "Show me"
	}
	else
	{
		p.classList.remove("anim")
		button.textContent = "Hide me"
	}
}

button.addEventListener("click", showOrHide)
