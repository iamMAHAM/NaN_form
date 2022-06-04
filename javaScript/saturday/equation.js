function equationRxR(arra1, arra2, type)
{
    printEquation(arra1)
    printEquation(arra2)

    if (type === "combinaison")
    {
        calculComb(arra1, arra2, "x")
        calculComb(arra1, arra2, "y")
    }
}

function calculComb(arra1, arra2, unknow)
{
    console.log(`éliminons ${unknow}...`)
    let inverse = unknow == "x" ? "y" : "x"
    let x1 = arra1[unknow == "x" ? 0 : 1]
    let x2 = arra2[unknow == "x" ? 0 : 1]
    let result = {"=": 0}
    result[inverse] = 0

    let signe = isPositive(x1, x2)
    if ((signe[0] && signe[1]) || (!signe[0] && !signe[1]))
    {
        result[inverse] = arra1[unknow == "x" ? 1 : 0] * (- x2) + arra2[unknow == "x" ? 1 : 0] * (x1)
        result["="] = arra1[2] * (-x2) + arra2[2] * (x1)
    }
    else
    {
        result[inverse] = (arra1[unknow == "x" ? 1 : 0] * (signe[1]?x2:(-x2))) + (arra2[unknow == "x" ? 1 : 0] * (signe[0]?x1:(-x1)))
        result["="] = arra1[2] * (signe[1]?x2:(-x2)) + arra2[2] * (signe[0]?x1:(-x1))
    }
    console.log(`${result[inverse]}${inverse} = ${result["="]}`)
    console.log(`${inverse} = ${(result["="]/result[inverse]).toFixed(2)}`)
}

function isPositive(a, b) {return [a > 0, b > 0]}

function printEquation(arra = [])
{
    b = arra[1]
    b > 0 ? b = ` + ${b}` : b = ` - ${Math.abs(b)}`
    console.log(`equation : ${arra[0]}x${b}y = ${arra[2]}`)
}

equationRxR([2, 1, 2], [-1, 3, 8], "combinaison")
// console.log(ppcm(3, 9))