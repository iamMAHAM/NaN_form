'use strict'

/*
 * Create a `keepFirst` function that takes a string as parameter
 * and return the string only keeping the 2 first characters
 *
 * Create a `keepLast` function that takes a string as parameter
 * and return the string only keeping the 2 last characters
 *
 * Create a `keepFirstLast` function that takes a string as parameter
 * and only keep 2 characters from the third character
 *
 */
function keepFirst(string)
{
	return string.slice(0, 2)
}

function keepLast(string)
{
	return string.slice(-2)
}

function keepFirstLast(string)
{
	return `${string.slice(0, 2)}${string.slice(-2)}`
}


//* Begin of tests
const assert = require('assert')
assert.strictEqual(keepFirst("bonjour"), "bo")
assert.strictEqual(keepLast("bonjour"), "ur")
assert.strictEqual(keepFirstLast("bonjour"), "bour")
// assert.fail('You must write your own tests')
// End of tests */
