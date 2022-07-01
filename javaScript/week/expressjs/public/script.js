let slider = document.querySelector("div.slider")
let container = document.querySelector(".container")
let direction = null
let index = 0

window.addEventListener("load", async ()=>{
    let prev = document.querySelector(".prev")
    let next = document.querySelector(".next")

const nextImg = ()=> {
	direction = -1
	slider.style.transform = 'translate(-100%)';  
	}
	
	const prevImg = ()=> {
		direction = 1  
		slider.style.transform = 'translate(100%)';  
	}

	prev.addEventListener("click", prevImg)
	next.addEventListener("click", nextImg)

	slider.addEventListener('transitionend', ()=> {
		
	if (direction === 1) {
	  slider.prepend(slider.lastElementChild);
	} else {
	  slider.appendChild(slider.firstElementChild);
	}

	slider.style.transition = 'none';
	slider.style.transform = 'translate(0)';
	setTimeout(() => {
	slider.style.transition = 'all 0.5s';
	}, false)
    })
})

