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
	


}

let arr = new Arr("1er", "0", "lol", "je", 3, "lolefefe", "mangerbouger")

arr.splice(2, 3)
console.log(arr)
