
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
            <button onclick="addToCart(event)">add to cart</button>
        </div>
    </div>
    `
    container.innerHTML = content
}

function addToCart(e)
{
    parent = e.target.parentElement.parentElement.parentElement
    imgLink = document.querySelector(".img").src
    quantities = document.querySelector("#number").value
    title = document.querySelector(".green").textContent
    price = document.querySelector(".rt-price").textContent
    description = document.querySelector(".center > p").textContent

    let toAdd = 
            `
            <div class="item">
                <img class="item-image" src="${imgLink}" title="${title}">
                <div class="bottom">
                    <p class="title">${title}</p>
                    <p class="description">${description}</p>
                    <input oninput="updatePrices(event)" type="number" value="${quantities}" min="1" name="0" id="number">
                    <p class="prices">${price}<span class="m"> x ${quantities}</span></p>
                </div>
                <p class="icone-del" onclick="deleteFromCart(event)"><i class="fa-regular fa-trash-can"></i></p>
            </div>
            `
    carts = localStorage.getItem("carts")
    if (carts)
    {
        carts = JSON.parse(carts)
        carts.push(toAdd)
    }
    else
    {
        carts = []
        carts.push(toAdd)
    }
    localStorage.setItem("carts", JSON.stringify(carts))
    updateCartAmount()
}


window.addEventListener("load", detail)