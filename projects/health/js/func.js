function lol(){
    window.location.href = "../login-register.html"
}

function updateCartAmount()
{
    carts = JSON.parse(localStorage.getItem("carts"))
    if (carts)
        document.querySelector("div.total").textContent = carts.length
}

function checkLogin()
{
    is_connected = localStorage.getItem("is_connected")
    if (is_connected === "true")
    {
        document.querySelector(".head.login").removeEventListener("click", lol)
        document.querySelector(".head.login").innerHTML = `
        <img class="avatar" onclick="#" src="img/avatar.png">
        <span onclick="logout()">Logout</span>
        `
    }
    else{
        window.location.href = "../login-register.html"
    }
}

function logout()
{
    localStorage.setItem("is_connected", "false")
    window.location.href = "../login-register.html"
}

function mediaQ()
{
    om = document.querySelector("div.top-header-right").classList.toggle("show")
}

function addToCart(e)
{
    parent = e.target.parentElement.parentElement.parentElement
    console.log(parent)
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

window.addEventListener("load", () =>{
    /**Targetting common things */
    let menu = document.querySelector(".icon")
    let account = document.querySelector(".head.login")
    let bookmark = document.querySelector(".bookmark")
    let cart = document.querySelector(".cart")
    let home = document.querySelector(".top-header-center.head")

    /**EventListener */
    account.addEventListener("click", lol)

    bookmark.addEventListener("click", ()=>{
        window.location.href = "../bookmark.html"
    })

    cart.addEventListener("click", ()=>{
        window.location.href = "../cart.html"
    })

    home.addEventListener("click", ()=>{
        window.location.href = "../index.html"
    })

    menu.addEventListener("click", mediaQ)
    updateCartAmount()
    checkLogin()
})
