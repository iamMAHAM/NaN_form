function equationRxR(arra1, arra2, type)
{
    console.log("============================== DEBUT =======================================")
    console.log(`\nSYSTEME D'EQUATION (E) :\n{${printEquation(arra1)}\n{${printEquation(arra2)}`)
    if (type === "combinaison")
    {
        console.log("\nMETHODE CHOISIE : COMBINAISON\n")
        calculComb(arra1, arra2, "x")
        calculComb(arra1, arra2, "y")
    }

    else if (type === "substitution")
    {
        console.log("\nMETHODE CHOISIE : SUBSTITUTION\n")
        calculSub(arra1, arra2, "x")
    }
    console.log("============================== FIN =======================================")

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
        result[inverse] = (arra1[unknow == "x" ? 1 : 0] * (signe[1] ? x2: (-x2))) + (arra2[unknow == "x" ? 1 : 0] * (signe[0] ? x1 : (-x1)))
        result["="] = arra1[2] * (signe[1] ? x2 : (-x2)) + arra2[2] * (signe[0] ? x1 : (-x1))
    }
    console.log(`${result[inverse]}${inverse} = ${result["="]}`)
    console.log(`${inverse} = ${(result["="]/result[inverse]).toFixed(2)}`)
}

function calculSub(arra1, arra2, unknow)
{
    let unknow2 = unknow === "x" ? "y" : "x" 
    console.log(`écrivons ${unknow} en fonction de ${unknow2}`)
    let a, b, c
    let a2, b2, c2
    a = arra1[0]; b = arra1[1], c = arra1[2]
    a2 = arra2[0]; b2 = arra2[1]; c2 = arra2[2]
    let subx = `(${c} - ${b}y)/${a}`
    let suby = `(${c} - ${a}x)/${b}`
    console.log(`${unknow} = (${c} - ${b}${unknow2})/${a}`)
    console.log("substitution ... ")
    console.log(arra2)
    console.log(`replaçons ${unknow} dans ${printEquation(arra2)}`)
    op = b >= 0 ? "+" : ""
    if (unknow === "x")
    {
        console.log(`[${a2}${subx}]${op}${b2}y = ${c2}`)
        console.log(`${((a2 * b)/a) + b2}y = ${((a2 * c)/a) - c2}`)
        console.log(`y = ${((c2 - ((a2 * c)/a))/ (b2 - (a2 * b)/a)).toFixed(2)}`)
        y = ((c2 - ((a2 * c)/a))/ (b2 - (a2 * b)/a)).toFixed(2)
        console.log(`x = ${((c - b * y)/a).toFixed(2)}`)
    }
    else if (unknow === "y")
    {
        console.log(`${a2}x + [${b2}${suby} = ${c2}`)
        console.log(`${a2 - ((a * b2)/b)}x = ${c2 - ((b2 * c)/b)}`)
        console.log(`x = ${((c2 - ((b2 * c)/b))/ (a2 - (a * b2)/b)).toFixed(2)}`)
        x = ((c2 - ((b2 * c)/b))/ (a2 - (a * b2)/b)).toFixed(2)
        console.log(`y = ${((c - a * x)/b).toFixed(2)}`)  
    }

}

function isPositive(a, b) {return [a > 0, b > 0]}

function printEquation(arra = [])
{
    b = arra[1]
    b > 0 ? b = ` + ${b}` : b = ` - ${Math.abs(b)}`
    return (`${arra[0]}x${b}y = ${arra[2]}`)
}

equationRxR([2, 1, 2], [-1, 3, 8], "combinaison")
equationRxR([2, 1, 2], [-1, 3, 8], "substitution")

// console.log(ppcm(3, 9))