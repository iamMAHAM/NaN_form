'use strict'

/*
 * Create a `concatStr` function that takes 2 arguments and concatenate them
 *
 * @notions Functions, Operators
 */

// Your code :
function concatStr(string1, string2)
{
	let arr1 = string1.split(" ")
	let arr2 = string2.split(" ")
	let concat = []

	for (let i = 0; i < arr1.length; i++)
	{
		concat.push(arr1[i])
	}

	for (let j = 0; j < arr2.length; j++)
	{
		concat.push(arr2[j])
	}
	return concat.join("")
}

//* Begin of tests
const assert = require('assert')

assert.strictEqual(typeof concatStr, 'function', 'Should be a function')
assert.strictEqual(concatStr.length, 2, 'Should takes 2 arguments')
assert.strictEqual(concatStr('a', 'b'), 'ab')
assert.strictEqual(concatStr('yolo', 'swag'), 'yoloswag')
// End of tests */
