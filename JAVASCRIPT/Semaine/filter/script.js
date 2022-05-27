/**Select all elements*/
let messages = document.querySelector(".messages")
let send = document.querySelector("#send")
let input = null
let banned_word = ["sauvage", "fou", "lol"]

/**function definition */
function insertMessage()
{
	input = document.querySelector("#input")
	let div = document.createElement("div")
	div.className = "message"
	div.innerHTML = `
		<p>
			${input.value}
		</p>`
	if (input.value && filterMessage(input.value))
	{
		messages.appendChild(div)
	}
	
}


function filterMessage(message)
{
	let notBanned = true
	for (let i = 0; i < banned_word.length; i++)
	{
		if (message.includes(banned_word[i]))
		{
			notBanned = false
		}
	}
	return notBanned
}

/**Event Listener */
send.addEventListener("click", insertMessage)