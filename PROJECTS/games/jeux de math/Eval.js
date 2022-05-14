function Eval(strings)
{
	var operators = ["+", "-", "/", "*"]
	let value = ""
	let i = 0
	while (i < strings.length)
	{
		if (operators.includes(strings[i]) && i > 0)
		{
			let nextNumber = getNumber(strings.slice(i + 1, strings.length))

			switch (strings[i])
			{
				case "+":
					value = parseInt(value) + parseInt(nextNumber.number)
					break
				
				case "-":
					value = parseInt(value) - parseInt(nextNumber.number)
					break
				case "/":
					value = parseInt(value) / parseInt(nextNumber.number)
					break
				case "*":
					value = parseInt(value) * parseInt(nextNumber.number)
					break

			}
			i += nextNumber.index + 1
		}
		else
		{
			value += strings[i]
			i++;
		}
	}
	return (value)
}

function getNumber(strings)
{
	// console.log(strings)
	let output = {number : "",
		index : 2
	}
	// if (strings.length === 1)
	// {
	// 	return ()
	// }
	for (let i = 0; i < strings.length; i++)
	{
		// console.log("string[i]", i)
		if (["+", "-", "*", "/"].includes(strings[i]))
		{
			output.index = i
			break
		}
		else
		{
			output.number += strings[i]
		}
	}
	return (output)
}

console.log(Eval("2+222/7/6"))