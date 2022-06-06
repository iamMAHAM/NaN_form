const apiKey  = "714e977060730eeb086fbb1570c15633"
const baseUrl = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/w500"
let searchs = document.querySelector(".find")
let loupe = document.querySelector(".loupe")
let container = document.querySelector(".container")

async function search()
{
    toSearch = searchs.value
    res = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${toSearch}&language=fr`)
    res = await res.json()
    fillImages(res.results)
}

function fillImages(array)
{
    container.innerHTML = ""
	for (let i = 0; i < array.length; i++)
	{
		container.innerHTML +=
		`
		<div class="cadre" id=${array[i].id} href="details.html" onclick="newPage(event)">
			<span class="definition oncadre">HD</span>
			<span class="rate oncadre">${array[i].vote_average}</span>
			<img src="${imgUrl+array[i].poster_path}" alt="" class="image">
			<p class="title oncadre">${array[i].original_title.toLowerCase()}</p>
		</div>
		`
	}
}

loupe.addEventListener("click", search)