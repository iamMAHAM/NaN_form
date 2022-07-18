let infos = document.querySelector(".infos")
let infosdiv = document.querySelectorAll(".special")
let del = document.querySelector("button.del")
let form = document.querySelector("form")
let cInfo = document.querySelector(".current-info")
let update = document.querySelector(".update")
let submit = document.querySelector(".submit")
let users_info = null

users_info = sessionStorage.getItem("session")
if (users_info){
    try{
        users_info = JSON.parse(users_info)
        cInfo.id = users_info.id
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

const fetchUpdate = async (e)=>{
    let toUpdate = {}
    e.preventDefault()
    Array.from(update.children).forEach(child=>{
        child = child.children[0]
        toUpdate[child.name] = child.value
    })
    toUpdate["id"] = cInfo.id
    res = await fetch("/user/update", {
        method: 'POST',
        body: JSON.stringify(toUpdate),
        headers: {'content-type': 'application/json'}
    })
    res = await res.json()
    sessionStorage.setItem("session", JSON.stringify(res.res[0]))
    if (res){window.location.href = "/index"}
}

const deleteUser = async (e)=>{
    e.preventDefault()
    res = await fetch("/user/delete", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(users_info)
    })
    res = await res.json()
    if (res.status === "ok"){
        sessionStorage.removeItem("session")
        window.location.href = "/"
    }
}

window.addEventListener("DOMContentLoaded", ()=>{
    del.addEventListener("click", deleteUser)
    submit.addEventListener("click", fetchUpdate)
})
