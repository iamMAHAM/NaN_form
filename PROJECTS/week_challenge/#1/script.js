/**targetting elements for 2nd functions */
let second = document.querySelector(".sec")
let sinus = document.querySelector(".sin")
let cosinus = document.querySelector(".cos")
let tangente = document.querySelector(".tan")
let form = document.querySelector("form")
let arrow = document.querySelector("#arrow")
let hist = document.querySelector(".history")
let clear  = document.querySelector("#clear")
let division = document.querySelector(".div")
let facts = document.querySelector(".fact")

let sinusAtt = sinus.getAttribute("onclick")
let cosAtt = cosinus.getAttribute("onclick")
let tangAtt = tangente.getAttribute("onclick")
let factsAtt = facts.getAttribute("onclick")

function addChar(input, character)
{
	if(input.value == null || input.value == "0")
		input.value = character
	else
		input.value += character
}

function cos() 
{
	form.display.value = Math.cos(form.display.value);
}

function sin() 
{
	form.display.value = Math.sin(form.display.value);
}

function tan() 
{
	form.display.value = Math.tan(form.display.value);
}

function sqrt() 
{
	form.display.value = Math.sqrt(form.display.value);
}

function ln() 
{
	form.display.value = Math.log(form.display.value);
}

function exp() 
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

function compute() 
{
	let right = aπReplace(form.display.value)
	let content = form.display.value.replace("π", right)
	let trueContent = content.split("").join(" ") + " = " + eval(content)
	form.display.value = eval(content)
	if (isNaN(content))
	{
		appendToHistory(trueContent)
	}
}

function aπReplace(string)
{
	for (let i = 0; i < string.length; i++)
	{
		if (string[i] == "*" && string[i+1] == "π")
		{
			return (`${Math.PI}`)
		}
		else if (string[i] != "*" && string[i+1] == "π")
		{
			return (`*${Math.PI}`)
		}
		else {}
	}
}
function square() 
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
				&& ch != "(" && ch!= ")" && ch != "%" && ch != "π")
				{
					alert("unexpected char from input")
					return false
				}
		}
	}
	return true
}

function degree(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function fact()
{
	let x = form.display.value
	if (Number(x) === NaN)
	{
		alert("Not a Number")
		return
	}
	else
	{
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
}

function arcsin()
{
	let c = form.display.value
	let value = Math.floor(degree(Math.acos(form.display.value)))
	form.display.value = value
	appendToHistory(`sin⁻¹(${c}) = ${value}`)
}

function arccos()
{
	let c = form.display.value
	let value = Math.floor(degree(Math.acos(form.display.value)))
	form.display.value = value
	appendToHistory(`cos⁻¹(${c}) = ${value}`)
}

function arctan()
{
	let c = form.display.value
	let value = Math.floor(degree(Math.acos(form.display.value)))
	form.display.value = value
	appendToHistory(`tan⁻¹(${c}) = ${value}`)	
}

function Snd()
{
	if (!second.classList.contains("active"))
	{
		second.classList.add("active")
		sinus.value = "sin⁻¹(x)"
		cosinus.value = "cos⁻¹(x)"
		tangente.value = "tan⁻¹(x)"
		division.value = "%"
		facts.value = "π"
		facts.setAttribute("onclick", "addChar(form.display, 'π')")
		sinus.removeAttribute("onclick")
		sinus.addEventListener("click", arcsin)
		cosinus.removeAttribute("onclick")
		cosinus.addEventListener("click", arccos)
		tangente.removeAttribute("onclick")
		tangente.addEventListener("click", arctan) 	
	}
	else
	{
		sinus.removeEventListener("click", arcsin)
		cosinus.removeEventListener("click", arccos)
		tangente.removeEventListener("click", arctan)
		second.classList.remove("active")
		sinus.value = "sin(x)"
		cosinus.value = "cos(x)"
		tangente.value = "tan(x)"
		division.value = "/"
		facts.value = "!"
		sinus.setAttribute("onclick", sinusAtt)
		cosinus.setAttribute("onclick", cosAtt)
		tangente.setAttribute("onclick", tangAtt)
		facts.setAttribute("onclick", factsAtt)
	}
}

function arrowF()
{
	if (!arrow.classList.contains("active"))
	{
		arrow.classList.add("active")
		hist.style.width = "150px"
		hist.style.transform = "translateX(0)"

	}
	else
	{
		hist.style.width = "0"
		arrow.classList.remove("active")
		hist.style.transform = "translateX(-100%)"
	}
}

function appendToHistory(content)
{
	let span = document.createElement("span")
	span.className = "histem"
	span.textContent = content
	hist.appendChild(span)
}

function clearHistory()
{
	for (let i = 0; i < hist.children.length; i++)
	{
		if (hist.children[i].id === "clear" || hist.children[i].id === "hist"){}
		else
		{
			hist.removeChild(hist.children[i])
		}
	}
	if (hist.children.length != 2)
	{
		clearHistory()
	}
}

arrow.addEventListener("click", arrowF)
clear.addEventListener("click", clearHistory)