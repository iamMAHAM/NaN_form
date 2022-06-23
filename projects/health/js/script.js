/*Targetting elements*/

// let login = document.querySelector(".login")
// let bookmark = document.querySelector(".bookmark")
// let cart = document.querySelector(".cart")
// let search = document.querySelector("#search")
let items = document.querySelector(".items")
let datas = null
let remove = `<i class="fa-regular fa-trash-can"></i>`
let add = `<i class="fa-solid fa-heart"></i>`
let inactive = `<i class="fa-regular fa-heart"></i>`
/*declaring variables*/

let res = null
let baseUrl = "https://www.pharma-gdd.com/"


/*Functions*/

function redirectInfo(e)
{
    classList = e.target.classList
    console.log(parent)
    console.log("className", e.target.className)
    if (classList.contains("fa-regular") || classList.contains("fa-solid")){return}
    else {element = e.target.parentElement}
    element = [].slice.call(element.children)
    console.log(element)
    toStore = element[3].textContent
    localStorage.setItem("detail", toStore)
    window.location.href = "details.html"

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
        <div class="item" onclick="redirectInfo(event)">
            <div class="top">
                <p class="status"><i class="fa-solid fa-circle-check"></i> en stock</p>
                <p class="bookmark inactive" onclick=func(event)><i class="fa-regular fa-heart"></i></p>
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

function removeBookmark(e, child=null)
{
    if (window.location.href.includes("bookmark.html")) /** we are on bookmark page */{}
    else{datas = JSON.parse(datas)} /**other */
    if (!child)
    {
        parent = e.target.parentElement.parentElement.parentElement.parentElement
        child = e.target.parentElement.parentElement.parentElement
        parent.removeChild(child)
        toRemove = child.outerHTML
    }
    else{
        toRemove = child.outerHTML.replace(add, remove).replace(inactive, remove)
    }

    console.log(toRemove)
    for (let i = 0; i < datas.length; i++)
    {
        if (datas[i] === toRemove)
        {
            console.log("match")
            index = datas.indexOf(datas[i])
            console.log("index found", index)
            datas.splice(index, 1)
        }
        console.log(datas[i])
    }
    localStorage.setItem("bookmarks", JSON.stringify(datas))
}

function addBookmark(e)
{
    datas = localStorage.getItem("bookmarks")
    child = e.target.parentElement.parentElement.parentElement
    if (e.target.parentElement.classList.contains("active"))/**if already on bookmark */
    {
        e.target.parentElement.classList.remove("active")
        e.target.parentElement.classList.add("inactive")
        console.log("BEFORE Bhd REMOVE", child)
        removeBookmark(e, child)
        e.target.outerHTML = inactive
        return
    }
    else{
        if (datas)
        {
            datas = JSON.parse(datas)
            console.log(datas)
            datas.push(child.outerHTML.replace(add, remove).replace(inactive, remove))
        }
        else
        {
            datas = []
            datas.push(child.outerHTML.replace(add, remove).replace(inactive, remove))
        }
        e.target.parentElement.classList.remove("inactive")
        e.target.parentElement.classList.add("active")
        e.target.outerHTML = add
        localStorage.setItem("bookmarks", JSON.stringify(datas))
    }
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
})
