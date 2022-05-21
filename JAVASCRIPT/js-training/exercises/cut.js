'use strict'

/*
 * Create the `cutFirst` function that takes a string and remove the 2 first characters
 * Create the `cutLast` function that takes a string and remove the 2 last characters
 * Create the `cutFirstLast` function that takes a string as parameter
 * and remove the 2 first characters and 2 last characters
 *
 * @notions String methods
 * https://github.com/nan-academy/refs/blob/master/js-training/methods.md#string---transform
 */

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

//* Begin of tests
const assert = require('assert')
assert.strictEqual(typeof cutFirst, "function")
assert.strictEqual(typeof cutLast, "function")
assert.strictEqual(typeof cutFirstLast, "function")
assert.strictEqual(cutFirst("Bonjour"), "njour")
assert.strictEqual(cutLast("Bonjour"), "Bonjo")
assert.strictEqual(cutFirstLast("Bonjour"), "njo")
//assert.fail('You must write your own tests')
// End of tests */
