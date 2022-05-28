'use strict'

/*
 * Create a `yell` function that takes a string
 * and return the same string in upper case
 *
 */
function yell(string)
{
	return string.toUpperCase()
}

//* Begin of tests
const assert = require('assert')

assert.strictEqual(yell("hello"), "HELLO")
// assert.fail('You must write your own tests')
// End of tests */
