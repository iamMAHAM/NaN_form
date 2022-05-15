function equation1(a, b, c)
{
	let x = (c - b)/a
	if (a == 1)
		a = ""
	return (`l'équation ${a}x + ${b} = ${c} à pour solution x = ${x}`)
}

function isPrime(x)
{
	if (x > 100)
	{
		console.log("Désolé la limite est de 100")
		return
	}
	for (let i = 1; i < x; i++)
	{
		if ((x % i) == 0)
		{
			console.log(x, "n'est pas un nombre premier")
			return
		}
	}
	console.log(x, "est un nombre premier")
}

function divisor(x)
{
	let array = []
	if (x > 100)
	{
		console.log("Désolé la limite est de 100")
		return
	}

	for (let i = 1; i <= x; i++)
	{
		if ((x % i) == 0)
		{
			array.push(i)
		}
	}

	console.log(`les diviseurs de ${x} sont : ` + array)
}

function factoriel(x)
{
	let fact = x
	if (x === 0 || x === 1)
	{
		console.log(`${x}! = 1`)
		return
	}
	else if (x < 0)
	{
		console.log("Votre nombre est négatif")
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
	console.log(`${x}! = ${fact}`)
}

function fibonacci(limite)
{
	let array = []
	let a = 0
	let b = 1
	let c = a + b

	array.push(a, b, c)
	while (c < limite)
	{	
		c = a + b
		array.push(c)
		a = b
		b = c
	}
	return (`les ${limite} premiers termes sont : ` + (array))
}


console.log(equation1(1, 1, 0))
isPrime(32)
divisor(100)
factoriel(4)
console.log(fibonacci(4))