'use strict'

/*
 * Create a `whisper` function that takes a string
 * and return the same string in lower case
 * and wrapped by `*`
 *
 */

function whisper(string)
{
	return (string.toLowerCase())
}
//* Begin of tests
const assert = require('assert')


assert.strictEqual(whisper("BonjourA"), "bonjoura")
// assert.fail('You must write your own tests')
// End of tests */
