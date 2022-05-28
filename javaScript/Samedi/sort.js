/**
 * selectMin - a function that select a min from an array
 * @array: the array
 * Return: an array of min and his index
 */
function selectMin(array)
{
	let min = array[0]
	let index = 0
	for (let i = 1; i < array.length; i++)
	{
		if (min > array[i])
		{
			min = array[i]
			index = i
		}
	}
	return [min, index]	
}

/**
 * selectMax - a function that select a max from an array
 * @array: the array
 * Return: an array of max and his index
 */
function selectMax(array)
{
	let max = array[0]
	let index = 0
	for (let i = 1; i < array.length; i++)
	{
		if (max < array[i])
		{
			max = array[i]
			index = i
		}
	}
	return [max, index]
}

/**
 * sort - a fucntion that sort items from an array
 * @array: the array
 * @reverse: a boolean that specifify the order of sorting
 * Return: An array sorted
 */
function sort(array, reverse=false)
{
	let aux = []
	if (reverse && typeof reverse === "boolean")
	{
		while (array.length > 0)
		{
			[number, index] = selectMax(array)
			aux.push(number)
			array.splice(index, 1)
		}
	}
	else if (typeof reverse != "boolean")
	{
		return ("unexpected argument : did you mean true or false ?")
	}
	else
	{
		while (array.length > 0)
		{
			[number, index] = selectMin(array)
			aux.push(number)
			array.splice(index, 1)
		}
	}
	return aux;
}

let array = [3, 0, 8, 9, 128, 19, 30, 5, 60]
let array1 = ["opq", "abc", "lmn","def", "ijk"]

console.log(sort(array))
console.log(sort(array1, reverse=true))
