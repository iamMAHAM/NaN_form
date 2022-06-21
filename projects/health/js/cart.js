let price = document.querySelector(".amount")
let items = document.querySelector(".items")
let carts = localStorage.getItem("carts")
let container = document.querySelector(".container")
let del = document.querySelector(".icone-del")

carts = JSON.parse(carts)


if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

function countPrices()
{
    let res = 0
    children = items.children
    for (let i = 0; i < children.length; i++)
    {
        res += eval(children[i].children[1].children[3].textContent.replace("€", "").replace("x", "*").replace(",", "."))
    }
    price.textContent = res.toFixed(2) + " €"
}

function updatePrices(e)
{
    e.target.nextElementSibling.children[0].textContent = "x " + e.target.value
    if (e.target.value){countPrices()}
}

function fillCart(array)
{
    if (array && array.length >= 1)
    {
        for (let i = 0; i < array.length; i++)
        {
            items.innerHTML += array[i]
        }
        countPrices()
    }
    else
    {
        items.style.margin = "auto auto"
        let data = document.createElement("p")
        data.textContent = "EMPTY CART BRO ! :)"
        data.style.fontSize = "50px"
        data.style.fontWeight = "bold"
        data.style.padding = "100px"
        items.prepend(data)
    }
}


function deleteFromCart(e)
{
    parent = e.target.parentElement.parentElement.parentElement
    toDel = e.target.parentElement.parentElement
    carts = JSON.parse(localStorage.getItem("carts").trim())
    parent.removeChild(toDel)
    for (let i = 0; i < carts.length; i++)
    {
        if (carts[i].trim() === toDel.outerHTML.trim())
        {
            console.log("ëëëëëëëëMMMMMMMMMMATCH")
            index = carts.indexOf(carts[i])
            console.log("index found", index)
            carts.splice(index, 1)
        }
    }
    console.log(carts)
    localStorage.setItem("carts", JSON.stringify(carts))
    countPrices()
    updateCartAmount()
}
window.addEventListener("load", ()=>{
    fillCart(carts)
})