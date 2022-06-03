const baseUrl = "http://api.weatherstack.com"
const token = "7252afe87a89691af3d7cc689482ab12"
let datas = null
let city = document.querySelector(".city")
let country = document.querySelector(".country")
let icone  = document.querySelector(".icone")
let temp = document.querySelector(".degree")
let search = document.querySelector(".search")
let input = document.querySelector("#search-input")
let map = document.querySelector(".map")

async function searchCountryCity()
{
	datas = await getLocation(input.value)
	console.log(datas)
	city.textContent = datas.location.name
	country.textContent = datas.location.country
	temp.textContent = datas.current.temperature + "°"
	icone.src = datas.current.weather_icons[0]
	map.src = `https://maps.google.com/maps?q=${input.value}&t=&z=7&ie=UTF8&iwloc=&output=embed`
	input.value = ""
}
async function getLocation(city)
{
	res = await fetch(`${baseUrl}/current?access_key=${token}&query=${city}`)
	res = await res.json()
	return res
}

search.addEventListener("click", searchCountryCity)