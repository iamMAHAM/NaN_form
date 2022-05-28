'use strict'

/*
 * Create a `multiply` function that takes two number as arguments
 * and returns the result of the multiplication of those two.
 * But you must do this without using the operators * or /
 * and no loops. You need to do it using recursion.
 *
 * @notions Primitive and Operators, Functions, Recursion
 */

// Your code :

function sameSign(x, y)
{
	if (x == 0 && y == 0)
	{
		return true
	}
	return (((x > 0 && y > 0) || (x < 0 && y < 0)) ? true : false)
}

function multiply(x, y)
{
	let min = 0
	let max = 0
	if (sameSign(x, y))
	{
		[min,max] = (x > y )?[Math.abs(y),Math.abs(x)] : [Math.abs(x),Math.abs(y)]
	}
	else
	{
		[min,max] = (x > y )?[x,y] : [y,x]
	}
	let mul = max
	if (min > 0)
	{
		return mul += multiply(min-1, max)
	}
	else
	{
		return (0)
	}
	
}

//* Begin of tests
const assert = require('assert')

assert.strictEqual(typeof multiply, 'function')
assert.strictEqual(multiply.length, 2)
assert.strictEqual(multiply.toString().includes('Math.imul'), false)
assert.strictEqual(multiply.toString().includes('while'), false)
assert.strictEqual(multiply.toString().includes('for'), false)
assert.strictEqual(multiply.toString().includes('*'), false)
assert.strictEqual(multiply.toString().includes('/'), false)
assert.strictEqual(multiply(34, 78), 2652)
assert.strictEqual(multiply(123, 0), 0)
assert.strictEqual(multiply(0, -230), 0)
assert.strictEqual(multiply(0, 0), 0)
assert.strictEqual(multiply(123, -22), -2706)
assert.strictEqual(multiply(-22, 123), -2706)
assert.strictEqual(multiply(-22, -123), 2706)
// End of tests */
