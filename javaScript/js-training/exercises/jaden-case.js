'use strict'

/*
 * Jaden Smith Case
 *
 * Make a `jadenCase` function that takes a string as parameter
 * and return the string with each words capitilized.
 *
 * Example : "How are you ?" -> "How Are You ?"
 *
 */

function capitalize(string)
{
	let array = []
	for (let i = 0; i < string.length; i++)
	{
		if (i == 0)
		{
			let cap = string[i].toUpperCase()
			array.push(cap)
		}
		else
		{
			let low = string[i].toLowerCase()
			array.push(low)
		}
	}
	return array.join("")
}

function jadenCase(string)
{
	let array = string.split(" ")
	for (let i = 0; i < array.length; i++)
	{
		array[i] = capitalize(array[i])
	}
	return (array.join(" "))
}
//* Begin of tests
const assert = require('assert')
assert.strictEqual(jadenCase("Salut comment tu vas"), "Salut Comment Tu Vas")
// assert.fail('You must write your own tests')
// End of tests */
