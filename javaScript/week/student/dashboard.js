let closes = document.querySelector(".fa-solid.fa-xmark")
let modals = document.querySelector(".modals")
let add  = document.querySelector(".add_subject")


window.addEventListener("DOMContentLoaded", ()=>{
    closes.addEventListener("click", ()=>{
        modals.style.display = "none"
    })

    add.addEventListener("click", ()=>{
        modals.style.display = "block"
    })
})
