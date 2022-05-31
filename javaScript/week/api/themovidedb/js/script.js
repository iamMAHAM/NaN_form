const apiKey  = "714e977060730eeb086fbb1570c15633"
const baseUrl = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/w500"
let container = document.querySelector(".container")
let vp = document.querySelector(".vp")

window.addEventListener("load", async () =>
{
	let res = await fetch(`${baseUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&language=fr`)
	res = await res.json()
	console.log(res)
	fillImages(res.results)
	vp.addEventListener("click", extendImages)
	fetchImage(20, 25)
})

function fillImages(array)
{
	for (let i = 0; i < array.length; i++)
	{
		container.innerHTML +=
		`<div class="cadre">
		<span class="definition oncadre">HD</span>
		<span class="rate oncadre">${array[i].vote_average}</span>
		<img src="${imgUrl+array[i].poster_path}" alt="" class="image">
		<span class="title oncadre">${array[i].title}</span>
		</div>`
	}
}

async function fetchImage(from, to)
{
	let fetched = []
	for (let id = from; id < to; id++)
	{
		let details = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr`)
		console.log(details.status)
		details = await details.json()
		datos = {
			vote_average: details.vote_average,
			title: details.title,
			poster_path: details.poster_path,
		}
		fetched.push(datos)
	}
	console.log(fetched)
	return fetched

}

async function extendImages(array)
{
	for (let i = 0; i < 50; i++)
	{
		container.innerHTML
	}
}
