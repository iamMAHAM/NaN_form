let price = document.querySelector(".amount")
let items = document.querySelector(".items")

function countPrices()
{
    let res = 0
    children = items.children
    for (let i = 0; i < children.length; i++)
    {
        res += eval(children[i].children[1].children[2].textContent.replace("€", "").replace("x", "*").replace(",", "."))
    }
    price.textContent = res.toFixed(2) + " €"
}

function updatePrices(e)
{
    e.target.previousElementSibling.children[2].children[0].textContent = "x " + e.target.value
    if (e.target.value){countPrices()}
}

window.addEventListener("load", countPrices)