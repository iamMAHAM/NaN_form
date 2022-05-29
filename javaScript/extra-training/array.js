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
}

let arr = new Arr("a", "b", "c", "d", "e", "f", 100, "m", "k", 'f')

arr.splice(-2, 1, "zoohien")
console.log("array", arr)
console.log(arr.max())