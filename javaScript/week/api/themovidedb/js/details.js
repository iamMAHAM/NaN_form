let details = document.querySelector(".details")
let log = document.querySelector("#logout")
function fillDetails()
{
	isConnected = localStorage.getItem("is_connected")
	if (isConnected == "true")
	{
		data = localStorage.getItem("datas")
		data = JSON.parse(data)
		console.log("this data", data)
		details.innerHTML = 
		`
		<div class="left">
				<div class="cadre img">
					<img src="${imgUrl+data.poster_path}" alt="" class="image img">
				</div>
		</div>
		<div class="right">
			<span class="top">${data.original_title}</span>
			<p class="descrp">
				${data.overview}
			</p>
			<div class="mini-container">
				<div class="right-left">
					<p class="items">
						<span class="gender">Gender:</span> <span class="cats">${data.gender}</span>
					</p>
					<p class="items">
						<span class="gender">Productors:</span> <span class="cats">${data.production_companies}</span>
					</p>
					<p class="items">
						<span class="gender">Rate:</span> <span class="cats">${data.vote_average}</span>
					</p>
				</div>
				<div class="right-right">
					<p class="items">
						<span class="gender">Version:</span> <span class="cats">VF</span>
					</p>
					<p class="items">
						<span class="gender">Quality:</span> <span class="cats">HD</span>
					</p>
					<p class="items">
						<span class="gender">Release Date:</span> <span class="cats">${data.release_date}</span>
					</p>
				</div>
			</div>
		</div>
		`
	}
	else {window.location.href = "login.html"}
	log.addEventListener("click", ()=>{
		localStorage.setItem("is_connected", "false")
		window.location.href = "login.html"
	})
}

window.addEventListener("load", fillDetails)