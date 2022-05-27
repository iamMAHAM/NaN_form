/**Select all elements*/
let messages = document.querySelector(".messages")
let send = document.querySelector("#send")
let input = null
let banned_word = ["sauvage", "fou", "lol"]
let form = document.querySelector("form")
let textarrea = document.querySelector("textarea")
let banned = document.querySelector("#banned")

/**function definition */
localStorage.setItem('banned_word', banned_word);
function insertMessage()
{
	banned_word = localStorage.getItem("banned_word").split(",")
	input = document.querySelector("#input")
	let div = document.createElement("div")
	div.className = "message"
	div.innerHTML = `
		<p>
			${input.value}
		</p>`
	if (input.value && bypassFilter(input.value))
	{
		messages.appendChild(div)
		banned.style.display = "none"
	}
	
}

function bypassFilter(message)
{
	banned_word = localStorage.getItem("banned_word")
	let notBanned = true
	for (let i = 0; i < banned_word.length; i++)
	{
		if (message.includes(banned_word.split(",")[i]))
		{
			notBanned = false
			banned.style.display = "block"
		}
	}
	return notBanned
}

async function updateWords()
{
	banned_word = localStorage.getItem("banned_word").split(",")
	let new_words = textarrea.value.split(" ")
	for (let i = 0; i < new_words.length; i++)
	{
		if (new_words[i] != "")
			banned_word.push(new_words[i])
	}
	localStorage.setItem("banned_word", banned_word)
}

/**Event Listener */
send.addEventListener("click", insertMessage)