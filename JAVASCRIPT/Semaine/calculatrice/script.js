
function addChar(input, character)
{
	if(input.value == null || input.value == "0")
		input.value = character
	else
		input.value += character
}

function cos(form) 
{
	form.display.value = Math.cos(form.display.value);
}

function sin(form) 
{
	form.display.value = Math.sin(form.display.value);
}

function tan(form) 
{
	form.display.value = Math.tan(form.display.value);
}

function sqrt(form) 
{
	form.display.value = Math.sqrt(form.display.value);
}

function ln(form) 
{
	form.display.value = Math.log(form.display.value);
}

function exp(form) 
{
	form.display.value = Math.exp(form.display.value);
}

function deleteChar(input) 
{
	input.value = input.value.substring(0, input.value.length - 1)
}

function changeSign(input) 
{
	if(input.value.substring(0, 1) == "-")
		input.value = input.value.substring(1, input.value.length)
	else
		input.value = "-" + input.value
}

function compute(form) 
{
	form.display.value = eval(form.display.value)
}

function square(form) 
{
	form.display.value = eval(form.display.value) * eval(form.display.value)
}

function checkNum(str) 
{
	for (var i = 0; i < str.length; i++)
	{
		var ch = str.substring(i, i+1)
		if (ch < "0" || ch > "9")
		{
			if (ch != "/" && ch != "*" && ch != "+" && ch != "-" && ch != "."
				&& ch != "(" && ch!= ")")
				{
					return false
				}
		}
	}
	return true
}

function fact(form)
{
	let x = form.display.value
	let fact = x
	if (x === 0 || x === 1)
	{
		form.display.value = 1;
		return
	}
	else if (x < 0)
	{
		form.display.value = "ERROR"
		return
	}
	else
	{
		let next = (x - 1)
		while (next != 1)
		{
			fact *= next
			next--
		}
	}
	form.display.value = fact;
}

function Snd()
{
	
}