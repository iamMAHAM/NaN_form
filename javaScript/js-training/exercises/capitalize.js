'use strict'

/*
 * Create a `capitalize` function that takes a string
 * and transforms it to upper case only for the first letter,
 * and in lowercase for the rest of the string
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

//* Begin of tests
const assert = require('assert')

assert.strictEqual(typeof capitalize, "function")
assert.strictEqual(capitalize('str'), 'Str')
assert.strictEqual(capitalize('qsdqsdqsd'), 'Qsdqsdqsd')
assert.strictEqual(capitalize('STR'), 'Str')
assert.strictEqual(capitalize('zapZAP'), 'Zapzap')
// End of tests */
