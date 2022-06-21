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

window.addEventListener("load", () =>{
    /**Targetting common things */
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
    updateCartAmount()
    checkLogin()
})
