
function cutFirst(string)
{
	let new_string = []
	
	for (let i = 0; i <string.length; i++)
	{
		if (i == 0 || i == 1)
		{
		}
		else
		{
			new_string.push(string[i])
		}
	}
	return (new_string.join(""))
}

function cutLast(string)
{
	let new_string = []
	let length = string.length

	for (let i = 0; i < length; i++)
	{
		if ((i == (length - 1)) || (i == (length - 2)))
		{
		}
		else
		{
			new_string.push(string[i])
		}
	}
	return (new_string.join(""))	
}

function cutFirstLast(string)
{
	return (cutFirst(cutLast(string)))
}

console.log(cutFirst("Lol Bro i don't care"))
console.log(cutLast("Lol Bro i don't care"))
console.log(cutFirstLast("Lol Bro i don't care"))