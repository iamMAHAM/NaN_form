function updateCartAmount()
{
    carts = JSON.parse(localStorage.getItem("carts"))
    if (carts)
        document.querySelector("div.total").textContent = carts.length
}

updateCartAmount()

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
