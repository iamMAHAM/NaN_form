/*Targetting elements*/

let login = document.querySelector(".login")
let bookmark = document.querySelector(".bookmark")
let cart = document.querySelector(".cart")
let search = document.querySelector("#search")
let items = document.querySelector(".items")
let datas = null
let remove = `<i class="fa-regular fa-trash-can"></i>`
let add = `<i class="fa-regular fa-heart"></i>`
/*declaring variables*/
let res = null
let baseUrl = "https://www.pharma-gdd.com/"

function redirectInfo(e)
{
    let element = null
    let toStore = null
    if (e.target.className != "item"){element = e.target.parentElement}
    else {element = e.target}
    element = [].slice.call(element.children)
    toStore = element[3].textContent
    localStorage.setItem("detail", toStore)
    window.open("details.html")

}

function appropriateValues()
{
    let icone
    let eventListener
    if (window.location.href.includes("bookmark.html"))
    {
        icone = remove
        eventListener = removeBookmark
    }
    else
    {
        icone = add
        eventListener = addBookmark
    }
    return [icone, eventListener]
}

function fillPage(array)
{
    [icone, func] = appropriateValues()
    for (let i = 0; i < array.length; i++)
    {
        items.innerHTML += 
        `
        <div class="item" id="${i}" onclick="redirectInfo(event)">
            <div class="top">
                <p class="status"><i class="fa-solid fa-circle-check"></i> en stock</p>
                <p class="bookmark" onclick=func(event)>${icone}</p>
            </div>
            <img class="item-image" src="${array[i].img}" title="${array[i].redirect.split("-").join(" ").replace("/fr/", "")}">
            <div class="bottom">
                <p class="title">${array[i].title}</p>
                <p class="description">${array[i].description}</p>
                <p class="prices">${array[i].prices} <i class="fa-solid fa-basket-shopping add"></i></p>
            </div>
            <div class="hidden">
                ${JSON.stringify(array[i])}
            </div>
        </div>
        `
    }
}

function fillBookmark(array)
{
    [icone, func] = appropriateValues()
    for (let i = 0; i < array.length; i++)
    {
        items.innerHTML += array[i].replace(add, icone)
    }
}

function removeBookmark(e)
{
    parent = e.target.parentElement.parentElement.parentElement.parentElement
    child = e.target.parentElement.parentElement.parentElement
    parent.removeChild(child)
    toRemove = child.outerHTML.replace(remove, add)
    console.log('\n\n')

    for (let i = 0; i < datas.length; i++)
    {
        if (datas[i] === toRemove)
        {
            index = datas.indexOf(datas[i])
            console.log("index found", index)
            datas.splice(index, 1)
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(datas))
}

function addBookmark(e)
{
    child = e.target.parentElement.parentElement.parentElement
    datas = localStorage.getItem("bookmarks")
    if (datas)
    {
        datas = JSON.parse(datas)
        datas.push(child.outerHTML)
    }
    else
    {
        datas = []
        datas.push(child.outerHTML)
    }
    localStorage.setItem("bookmarks", JSON.stringify(datas))
}
/*Event Listening*/
window.addEventListener("load", async ()=>{


    if (window.location.href.includes("index.html"))
    {
        res = await fetch("back/datas.json");
        res = await res.json()
        fillPage(res)
    }
    else {
        if (localStorage.getItem("bookmarks"))
        {
            datas = localStorage.getItem("bookmarks")
            datas = JSON.parse(datas)
            fillBookmark(datas)
        }
    }
    login.addEventListener("click", ()=>{
        window.location.href = "../login-register.html"
    })

    bookmark.addEventListener("click", ()=>{
        window.location.href = "../bookmark.html"
    })

    cart.addEventListener("click", ()=>{
        window.location.href = "../cart.html"
    })
})
