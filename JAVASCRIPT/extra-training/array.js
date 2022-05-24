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

	splice(index, nElement)
	{
		for (let i = index; i < index + nElement; i++)
		{
			console.log(this.delete(i))
		}

		// for (let i = 0; i < this.length; i++)
		// {
		// 	console.log(i)
		// 	let properties = Object.getOwnPropertyNames(this.content)
		// 	Object.defineProperty(this.content, properties[i] = i)
		// }
	}

	selectMin()
	{
		let min = this.content[0]
		let index = 0
		for (let i = 1; i < this.length; i++)
		{
			if (min > this.content[i])
			{
				min = this.content[i]
				index = i
			}
		}
		return [min, index]
	}

	selectMax()
	{
		let max = this.content[0]
		let index = 0
		for (let i = 1; i < this.length; i++)
		{
			if (max < this.content[i])
			{
				max = this.content[i]
				index = i
			}
		}
		return [max, index]
	}

	sort(reverse=false)
	{
		let aux = []
		if (reverse && typeof reverse === "boolean")
		{
			while (this.length > 0)
			{
				[number, index] = selectMax()
				aux.push(number)
				this.splice(index, 1)
			}
		}
		else if (typeof reverse != "boolean")
		{
			return ("unexpected argument : did you mean true or false ?")
		}
		else
		{
			while (this.length > 0)
			{
				[number, index] = selectMin()
				aux.push(number)
				this.splice(index, 1)
			}
		}
		return aux
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
		for (let i = index; i < this.length - 1; i++)
		{
			this.content[i] = this.content[i + 1];
		}
		let deleted = this.content[this.length - 1];
		delete this.content[this.length - 1];
		this.length--;
		return deleted;
	}

	push(item)
	{
		this.content[this.length] = item;
		this.length++;
		return this.length;
	}
	


}

let arr = new Arr("1er", "0", "lol", "je", 3, "lolefefe", "mangerbouger")

arr.splice(2, 3)
console.log(arr.selectMin())
