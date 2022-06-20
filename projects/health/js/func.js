let carts = null

function removeFromCart(e)
{
    parent = e.target.parentElement.parentElement
    console.log("parent", parent)
    child = e.target.parentElement
    parent.removeChild(child)
    toRemove = child.outerHTML
    for (let i = 0; i < carts.length; i++)
    {
        if (carts[i] === toRemove)
        {
            index = carts.indexOf(carts[i])
            console.log("index found", index)
            carts.splice(index, 1)
        }
    }
    localStorage.setItem("carts", JSON.stringify(carts))
}

function addToCart(e)
{
    console.log("start", e.target)
    child = e.target.parentElement.parentElement.parentElement
    carts = localStorage.getItem("carts")
    if (carts)
    {
        carts = JSON.parse(carts)
        carts.push(child.outerHTML.replace(add, remove).replace(inactive, remove))
    }
    else
    {
        carts = []
        carts.push(child.outerHTML.replace(add, remove).replace(inactive, remove))
    }
    if (e.target.parentElement.classList.contains("active")){
        e.target.parentElement.classList.remove("active")
        e.target.parentElement.classList.add("inactive")
        e.target.outerHTML = inactive
    }
    else{
        e.target.parentElement.classList.remove("inactive")
        e.target.parentElement.classList.add("active")
        e.target.outerHTML = add
    }
    localStorage.setItem("carts", JSON.stringify(carts))
}