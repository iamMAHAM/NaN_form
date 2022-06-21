let price = document.querySelector(".amount")
let items = document.querySelector(".items")
let carts = localStorage.getItem("carts")
let container = document.querySelector(".container")
carts = JSON.parse(carts)

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
    e.target.previousElementSibling.children[2].children[0].textContent = "x " + e.target.value
    if (e.target.value){countPrices()}
}

function fillCart(array)
{
    if (array)
    {
        for (let i = 0; i < array.length; i++)
        {
            items.innerHTML += array[i]
        }
        countPrices()
    }
    else
    {
        items.margin = "auto auto"
        let data = document.createElement("p")
        data.textContent = "EMPTY CART BRO ! :)"
        data.style.fontSize = "50px"
        data.style.fontWeight = "bold"
        data.style.padding = "100px"
        items.prepend(data)
    }
}

window.addEventListener("load", ()=>{
    fillCart(carts)
})