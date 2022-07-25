let edit_buttons = document.querySelectorAll(".fa.fa-edit")
let conf_edit = null
let change_avatar = document.querySelector("#avatar")
let preview = document.querySelector("#preview")

const updateEvent = (flag, array, listener)=>{
    if (flag){
        Array.from(array).forEach(child=>{
            child.addEventListener("click", listener)
        })
    }else{
        Array.from(array).forEach(child=>{
            child.removeEventListener("click", listener)
        })
    }
}

const editEvent  = (e)=>{
    target = e.target
    field = target.previousElementSibling
    console.log("field", field)
    field.style.pointerEvents = "auto"
    field.focus()
    target.outerHTML = '<i class="fa fa-check"></i>'
    conf_edit = document.querySelectorAll(".fa.fa-check")
    updateEvent(0, edit_buttons, editEvent)
    updateEvent(1, conf_edit, closeEvent)
}

const closeEvent = (e)=>{
    console.log(e.target)
    target = e.target
    field = target.previousElementSibling
    field.style.pointerEvents = "none"
    target.outerHTML = '<i class="fa fa-edit"></i>'
    edit_buttons = document.querySelectorAll(".fa.fa-edit")
    updateEvent(0, conf_edit, closeEvent)
    updateEvent(1, edit_buttons, editEvent)
}

window.addEventListener("DOMContentLoaded", ()=>{
    updateEvent(1, edit_buttons, editEvent)
    change_avatar.addEventListener("change", (e)=>{
        console.log(preview.src)
        preview.src = window.URL.createObjectURL(change_avatar.files[0])
    })
})