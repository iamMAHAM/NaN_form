const at = (array, index)=>{
    if (index < 0) index = length(array)  + index
    return array[index]
}

const concat = (a1, a2)=>{
    let inter = []
    let i = 0, j = 0
    while (i < length(a1)){
        inter[i] = a1[i]
        i++
    }
    while (j < length(a2)){
        inter[i] = a2[j]
        i++
        j++
    }
    return inter
}


const length = (el)=>{
    let i = 0
    while (el[i]){
        i++
    }
    return i
}

const includes = (array, item)=>{
    for (let  i = 0 ; i < length(array); i++){
        if (array[i] === item){
            return true
        }
    }
    return false
}

const push = (array, item)=>{
    array[length(array)] = item
}

const copyWithin = (array, ...args)=>{
    const within = []
    for (let i = 0; i < length(array); i++){
        if (!includes(args, array[i])){
            push(within, array[i])
        }
    }
    return within
}

function *entries(array){
    let first = 0
    while (length(array)){
        const bc = array[first]
        first++
        yield [first, bc]
    }
}

const every = (array, callback)=>{
    let i = 0
    let flag = true
    while (i < length(array)){
        flag = flag && callback(array[i])
        i++
    }
    return flag
}

const map = (array, callback)=>{
    const arra = []
    i = 0
    while (i < length(array)){
        push(arra, callback(array[i]))
        i++
    }
    return arra
}

const fill = (array, ...args) => {
    if (length(args) === 1){
        array
    }else if (length(args) === 2){

    }else{

    }
}


const array1 = [1, 2, 5, 3, 4, 6, 7, 9]
const array2 = ['bonjour', 'jeune', 'frère']
// console.log(length(array1))
// console.log(at(array1, -3))
// console.log(concat(array1, array2))
// console.log(includes(array1, 5))
// console.log(copyWithin(array1, 1, 2, 3, 4))
// const ab = entries(array2)
// console.log(ab.next().value)
// console.log(ab.next().value)
// console.log(ab.next().value)
// console.log(ab.next().value)
// console.log(ab.next().value)
// console.log(ab.next().value)
// const res = every(array1, (a)=> a = 7)
// console.log(res)

const ab = map(array1, (a)=> a=a+1)
console.log(ab)
