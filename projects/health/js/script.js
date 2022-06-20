/*Targetting elements*/

let search = document.querySelector("#search")
let items = document.querySelector(".items")
let addToCartButton = document.querySelectorAll(".add")

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

function fillPage(array)
{
    for (let i = 0; i < array.length; i++)
    {
        items.innerHTML += 
        `
        <div class="item" id="${i}" onclick="redirectInfo(event)">
            <div class="top">
                <p class="status"><i class="fa-solid fa-circle-check"></i> en stock</p>
                <p class="bookmark"><i class="fa-regular fa-heart"></i></p>
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
/*Event Listening*/
window.addEventListener("load", async ()=>{
    res = await fetch("back/datas.json");
    res = await res.json()
    fillPage(res)
    console.log(res)
})
