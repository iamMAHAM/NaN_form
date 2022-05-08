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
	if (!div.classList.contains("hide"))
	{
		div.classList.add("hide")
		div.style.animation = "hide-text 5s 0s cubic-bezier(1, -0.61, 1, 1) forwards"
		await sleep(5000)
		button.textContent = "Show me"
	}
	else
	{
		div.classList.remove("hide")
		div.style.animation = "none"
		button.textContent = "Hide me"
	}
}

button.addEventListener("click", showOrHide)
