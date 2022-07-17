let infos = document.querySelector(".infos")
let infosdiv = document.querySelectorAll(".special")
let del = document.querySelector("button.del")
let form = document.querySelector("form")

window.addEventListener("DOMContentLoaded", ()=>{
    let message = JSON.parse(infos?.textContent)
    console.log(message.res)
    console.log(infosdiv)
    if (message instanceof Array){message = message.res[0]}
    for (let i = 0; i < infosdiv.length; i++){
        infosdiv[i].textContent = message.res[infosdiv[i].id]
    }

    del.addEventListener("click", async (e)=>{
        e.preventDefault()
        res = await fetch("/user/delete", {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({message: message})
        })
        res = await res.json()
        window.location.href = "/"
        
    })
    console.log("type", message.type)
    // if (message.type === 'update'){location.reload()}
})
