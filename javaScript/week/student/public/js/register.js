let coloneone = document?.querySelector(".column.one")
let colonetwo = document?.querySelector(".column.two")
let register = document?.querySelector(".register")

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
    res = await res.json()
    console.log(res)
}

window.addEventListener("DOMContentLoaded", ()=>{
    register.addEventListener("click", registerF)
})