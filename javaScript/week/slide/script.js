let slider = document.querySelector("div.slider")
let container = document.querySelector(".container")
let direction = null

function fillSlider(imgs = [])
{
    for (let i  = 0; i < imgs.length; i++)
    {
        ab =
        `   <img class="img" src="${imgs[i]}" alt="">
        `
        slider.innerHTML += ab
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
    fillSlider(images)

    let prev = document.querySelector(".prev")
    let next = document.querySelector(".next")

    function prevImg(){
        if (direction === -1){container.style.direction = 1}
        container.style.justifyContent = "flex-end"
        slider.style.transform = `translate(100%)`
    }

    function nextImg(){
        direction = -1
        container.style.justifyContent = "flex-start"
        slider.style.transform = `translate(-100%)`
    }

    // setInterval(nextImg, 2000)
    prev.addEventListener("click", prevImg)
    next.addEventListener("click", nextImg)

    slider.addEventListener("transitionend", ()=>{
        if (direction === 1){
            slider.appendChild(slider.firstElementChild)
        } else{
            slider.prepend(slider.lastElementChild)
        }
        slider.style.transition = "none"
        slider.style.transform = "translate(0)"
        setTimeout(()=>{
            slider.style.transition = "all 1s"
        })
    })
})
