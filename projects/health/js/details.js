
let carts = null

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}


function detail()
{
    let container = document.querySelector(".container")
    let details = JSON.parse(localStorage.getItem("detail").trim())
    let content = 
    `
    <div class="left">
        <img src="${details.img.replace("product_thumbnail","product_show")}" alt="" class="img">
        </div>
    
        <div class="right">
        <div class="top">
            <p>${details.redirect.split("-").join(" ").replace("/fr/", "")}</p>
            <p class="green" style="text-transform: uppercase;">${details.title}</p>
        </div>
    
        <div class="center">
            <p>${details.description}</p>
            <div class="row"><p class="bold">Pour qui : </p><p>${details.who}</p></div>
            <div class="row"><p class="bold">Femme Enceinte : </p><p>${details.authw}</p></div>
            <div class="row"><p class="bold">Allaitement : </p><p>${details["milk-c"]}</p></div>
            <div class="row"><p class="bold">Forme : </p><p>${details.figure}</p></div>
        </div>
        <div class="bottom-d">
            <div class="price">
                <input type="number" value="1" min="1" name="0" id="number">
            </div>
            <span class="rt-price">${details.prices}</span>
            <button>add to cart</button>
        </div>
    </div>
    `
    container.innerHTML = content
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

let toAdd = 
`
<div class="item" id="2">
    <img class="item-image" src="${img}" title="${title-img}">
    <div class="bottom">
        <p class="title">${title}</p>
        <p class="description">${description}</p>
        <p class="prices">${price}<span class="m"> x ${quantities}</span></p>
    </div>
    <input oninput="updatePrices(event)" type="number" value="1" min="1" name="0" id="number">
</div>
`
window.addEventListener("load", detail)