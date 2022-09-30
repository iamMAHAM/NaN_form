class Arr
{
	length = 0
	content = {}
	constructor(...args)
	{
		this.length = args.length
		for (let i in args)
		{
			this.content[i] = args[i]
		}
	}

	splice(index, nElement, item)
	{
		if (index >= 0)
		{		
			if (nElement === 0){this.insert(index - 1, item)}
			else{this.content[index - 1] = item}
		}
		else
		{
			index = this.length + index
			if (nElement === 0){this.insert(index, item)}
			else{this.content[index] = item}
		}
	}

	min()
	{
		let min = this.content[0]
		let index = 0
		for (let i = 1; i < this.length; i++)
		{
			if (min > this.content[i])
			{
				min = this.content[i]
			}
		}
		return min
	}

	max()
	{
		let max = this.content[0]
		for (let i = 1; i < this.length; i++)
		{
			if (max < this.content[i])
			{
				max = this.content[i]
			}
		}
		return max
	} 

	join(separator)
	{
		let joined = ""
		for (let i = 0; i < this.length; i++)
		{
			joined += this.content[i] + separator
		}
		return joined
	}

	delete(index)
	{
		let deleted = this.content[index]
		delete this.content[index]
		for (let i = index; i < this.length - 1; i++)
		{

			this.content[i] = this.content[i + 1];
		}
		delete this.content[this.length - 1]
		this.length--;
		return deleted;
	}

	push(item)
	{
		this.content[this.length] = item
		this.length++
		return this.length
	}

	insert(index, item)
	{
		for (let i = this.length; i >= index; i--)
		{
		    this.content[i] = this.content[i - 1]
		}
		this.content[index] = item
		this.length++
		return this.content
	}

	at(index)
	{
		return this.content[index]
	}

	pop()
	{
		let toDelete = this.content[this.length - 1]
		delete this.content[this.length - 1]
		this.length--
		return toDelete
	}

	concat(arr)
	{
		for (let  i = 0; i < arr.length; i++)
		{
			this.content[this.length] = arr.content[i]
			this.length++
		}
	}

	find(item)
	{
		for (let i in this.content)
		{
			if (this.content[i] === item){return i}
		}
		return undefined
	}

	includes(item)
	{
		for (let  i = 0; i < this.length -1; i++)
		{
			if (this.content[i] === item){return true}
		}
		return false
	}

	forEach(callback)
	{
		for (let i = 0; i < this.length; i++)
		{
			callback(this.content[i])
		}
	}
}

let arr = new Arr("a", "b", "c", "d", "e", "f", "g", "h", 'i')
let integer = new Arr(1, 2, 3, 4, 9)
let arr1 = new Arr("j", "k", "l")
let arr2 = new Arr(2, 3, 4, 5)


integer.splice(2, 1, 7)
console.log(integer)
