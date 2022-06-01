let details = document.querySelector(".details")

function fillDetails(data)
{
	`
	<div class="left">
			<div class="cadre img">
				<img src="${data.poster_path}" alt="" class="image img">
			</div>
	</div>
	<div class="right">
		<span class="top">$${data.title}</span>
		<p class="descrp">
			${data.overview}
		</p>
		<div class="mini-container">
			<div class="right-left">
				<p class="items">
					<span class="gender">Gender:</span> <span class="cats">${data.gender}</span>
				</p>
				<p class="items">
					<span class="gender">Productosr:</span> <span class="cats">$${data.production_companies}</span>
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