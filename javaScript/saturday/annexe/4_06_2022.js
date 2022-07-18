function reverse(array)
{
    let aux = []
    length = array.length - 1
    while (length > 0)
    {
        aux.push(array[length])
        length--;
    }
    return (aux)
}

function x2x5(n)
{
    let x2x5 = []
    for (let i = 0; i < n; i++)
    {
        if (i % 2 == 0 || i % 5 == 0)
        {
            x2x5.push(i)
        }
    }
    return x2x5
}

function concat(array, array1)
{
    let concat = []
    for (let i = 0; i < array.length; i++)
    {
        concat.push(array[i])
    }

    for (let j = 0; j < array1.length; j++)
    {concat.push(array1[j])
    }

    return concat
}


let array  = [1, 2, 3, 4, 5, 6, 7, 8]
let array2  = [9, 10, 11, 12, 13]
let reversed = reverse(array)
console.log(concat(array, array2))
console.log(x2x5(10))