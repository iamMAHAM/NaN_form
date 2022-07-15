let infos = document.querySelector(".infos")
let infosdiv = document.querySelectorAll(".special")
let submit = document.querySelector("button")
let form = document.querySelector("form")

window.addEventListener("DOMContentLoaded", ()=>{
    let message = JSON.parse(infos?.textContent)
    console.log(message.res)
    console.log(infosdiv)
    if (message instanceof Array){message = message.res[0]}
    for (let i = 0; i < infosdiv.length; i++){
        console.log("name: ", infosdiv[i].id)
        infosdiv[i].textContent = message.res[infosdiv[i].id]
    }

    console.log("type", message.type)
    // if (message.type === 'update'){location.reload()}
})
