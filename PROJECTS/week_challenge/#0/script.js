let p = document.querySelector("p")
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
		await sleep(2000)
		button.textContent = "Show me"
	}
	else
	{
		p.classList.remove("anim")
		button.textContent = "Hide me"
	}
}

button.addEventListener("click", showOrHide)
