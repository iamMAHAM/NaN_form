let container = document.querySelector(".container")

function fillContainer(imgs = [])
{
    for (let i  = 0; i < imgs.length; i++)
    {
        container.innerHTML += 
        `
            <img class="img" src="${imgs[i]}" alt="">
        `
    }
}


window.addEventListener("load", async ()=>{
    let res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=714e977060730eeb086fbb1570c15633&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    res = await res.json()

    let images = []

    for (let i = 0; i < res.results.length; i++)
    {
        images.push("https://image.tmdb.org/t/p/w500"+res.results[i].poster_path)
    }

    fillContainer(images)

    let prev = document.querySelector(".prev")
    let next = document.querySelector(".next")
    let imgs = document.querySelectorAll(".img")
    let length = imgs.length
    let index = 0

    imgs[index].classList.add("active")

    function prevImg(){
        imgs[index].classList.remove("active")
        if (index > 0){
            index--;
        }
        else{
            index = length - 1
        }
        imgs[index].classList.add("active")
    }

    function nextImg(){
        imgs[index].classList.remove("active")
        if (index  < length - 1){
            index++;
        }
        else{
            index = 0
        }
        imgs[index].classList.add("active")
    }

    setInterval(nextImg, 2000)
    prev.addEventListener("click", prevImg)
    next.addEventListener("click", nextImg)
})
