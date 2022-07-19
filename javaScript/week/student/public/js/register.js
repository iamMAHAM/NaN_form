let coloneone = document?.querySelector(".column.one")
let colonetwo = document?.querySelector(".column.two")
let register = document?.querySelector(".register")
let info = document?.querySelector(".error")

const iterateParent = (parent, datas={})=>{
    Array.from(parent.children).forEach(child=>{
        datas[child.children[1].name] = child.children[1].value
    })
}

const registerF = async (e)=>{
    e.preventDefault()
    let datas = {}
    iterateParent(coloneone, datas)
    iterateParent(colonetwo, datas)
    res = await fetchData("/user/create", datas)
    console.log(res)
    res.status === "false" ? info.style.color = "crimson" : info.style.color = "green"
    info.textContent = res.results.message
    info.style.display = "block"
    setTimeout(()=>{
        info.style.display = "none"
    },3000)
    res.status === "ok" ? window.location.href = "/login" : null

}

window.addEventListener("DOMContentLoaded", ()=>{
    register.addEventListener("click", registerF)
})