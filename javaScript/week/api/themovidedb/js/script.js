const apiKey  = "714e977060730eeb086fbb1570c15633"
const baseUrl = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/w500"
let container = document.querySelector(".container")
let vp = document.querySelector(".vp")
let fetched = []
let page = 0

window.addEventListener("load", async () =>
{
	extendImages()
	vp.addEventListener("click", extendImages)
})

function fillImages(array)
{
	for (let i = 0; i < array.length; i++)
	{
		console.log(container.innerHTML)
		container.innerHTML +=
		`<div class="cadre" id=${array[i].id}>
		<span class="definition oncadre">HD</span>
		<span class="rate oncadre">${array[i].vote_average}</span>
		<img src="${imgUrl+array[i].poster_path}" alt="" class="image">
		<span class="title oncadre">${array[i].title}</span>
		</div>`
	}
}

async function fetchImage()
{
	try
	{
		id = generateNumber(0, 5000)
		let details = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr`)
		if (details.ok)
		{
			details = await details.json()
			if (!details.poster_path){throw TypeError(`error while loading this id : ${id}`)}
			datos = {
				vote_average: details.vote_average,
				title: details.title,
				poster_path: details.poster_path,
			}
			fetched.push(datos)
		} else {throw TypeError(`error while loading this id : ${id}`)}
	}
	catch (e){}
	return fetched
}

async function fetchImages()
{
	fetched = []
	while (fetched.length < 20){await fetchImage()}
}

function generateNumber(min, max){ return Math.floor(Math.random() * (max -min) + min) }

async function extendImages()
{
	page += 1
	let res = await fetch(`${baseUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&language=fr&page=${page}`)
	res = await res.json()
	fillImages(res.results)
}