/*Targetting elements*/

let search = document.querySelector("#search")
let items = document.querySelector(".items")

/*declaring variables*/
let res = null
let baseUrl = "https://www.pharma-gdd.com/"

async function redirectInfo(e)
{
    let 
}

function fillPage(array)
{
    for (let i = 0; i < array.length; i++)
    {
        items.innerHTML += 
        `
        <div class="item" id="${array[i].redirect}">
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
        </div>
        `
    }
}
/*Event Listening*/
window.addEventListener("load", async ()=>{
    res = await fetch("back/datas.json");
    res = await res.json()
    fillPage(res)
    // console.log(res)
    // for (let i = 0; i < items.children.length; i++)
    // {
    //     items.children[i].addEventListener("click", (e)=>console.log(e.target.parentElement.id))
    // }
})
