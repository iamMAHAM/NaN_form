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
        document.querySelector(".head.login").innerHTML = `
        <img class="avatar" src="img/avatar.png">
        <p onclick="logout()">Logout</p>
        `
    }
    else{
        window.location.href = "../login-register.html"
    }
}

function logout()
{
    localStorage.setItem("is_connected", "false")
}

updateCartAmount()
checkLogin()
window.addEventListener("load", () =>{
    /**Targetting common things */
    let account = document.querySelector(".head.login")
    let bookmark = document.querySelector(".bookmark")
    let cart = document.querySelector(".cart")
    let home = document.querySelector(".top-header-center.head")
    let search = document.querySelector("#search")
    /**EventListener */
    account.addEventListener("click", ()=>{
        window.location.href = "../login-register.html"
    })

    bookmark.addEventListener("click", ()=>{
        window.location.href = "../bookmark.html"
    })

    cart.addEventListener("click", ()=>{
        window.location.href = "../cart.html"
    })

    home.addEventListener("click", ()=>{
        window.location.href = "../index.html"
    })
})
