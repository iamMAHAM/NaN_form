let partSlider = document.querySelector(".partslider")
let miniSlider = document.querySelector(".lm-right")
let leftArrow = document.querySelector(".leftarrow")
let rightArrow = document.querySelector(".rightarrow")
let index = 0
let current = null

leftArrow.disabled = true
miniSlider.style.transform = "translate(0)"
const next = ()=>{
    console.log("next image")
    index++
    miniSlider.style.transform = `translate(-${index * 250}px`
    if (index === 2){
        rightArrow.disabled = true
        leftArrow.disabled = false
    }else{
        rightArrow.disabled = false
        leftArrow.disabled = false
    }
}

const prev = ()=>{
    console.log("previous images")
    current = parseInt(miniSlider.style.transform.replace("translate(", "").replace(")", "").replace("px", ""))
    console.log(current)
    index--
    miniSlider.style.transform = `translate(${current+250}px)`
    if (index === 0){
        leftArrow.disabled = true
        rightArrow.disabled = false
    }else{
        leftArrow.disabled = false
        rightArrow.disabled = false
    }
    console.log(index)
}

window.addEventListener("DOMContentLoaded", ()=>{
    leftArrow.addEventListener("click", prev)
    rightArrow.addEventListener("click", next)
    setInterval(()=>{
        partSlider.style.transform = "translate(-200px)"
    }, 2000)

    partSlider.addEventListener("transitionend", ()=>{
        partSlider.appendChild(partSlider.firstElementChild)
        partSlider.style.transition = "none"
        partSlider.style.transform = "translate(0)"
        setTimeout(()=>{
            partSlider.style.transition = "all 2s"
        })
    })
})