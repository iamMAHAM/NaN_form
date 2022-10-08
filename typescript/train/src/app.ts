const container = document.querySelector(".container")
const button = document.querySelector("button")

/**
 * 
 * @param e 
 */
const increment = (e: Event)=>{
    const target = e.target as Element
    console.log(target.textContent)
}

button?.addEventListener('click', increment)