let infos = document.querySelector(".infos")
let infosdiv = document.querySelectorAll(".special")
let del = document.querySelector("button.del")
let form = document.querySelector("form")
let cInfo = document.querySelector(".current-info")
let users_info = null

users_info = sessionStorage.getItem("session")
console.log(users_info)
if (users_info){
    try{
        users_info = JSON.parse(users_info)
        cInfo.innerHTML = 
        `
            <p>Name : <span class="special" id="name">${users_info.name} </span></p>
            <p>surname : <span class="special" id="surname">${users_info.surname}</span></p>
            <p>country : <span class="special" id="country">${users_info.country}</span></p>
            <p>email : <span class="special" id="email">${users_info.email}</span></p>
            <p>passwd : <span class="special" id="password">${users_info.password}</span></p>
        `
    } catch{
        window.location.href = "/"
    }
}else{
    window.location.href = "/"
}

window.addEventListener("DOMContentLoaded", ()=>{
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
    // if (message.type === 'update'){location.reload()}
})
