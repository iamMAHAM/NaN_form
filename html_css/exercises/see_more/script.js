let vp = document.querySelector(".vp")
let bottom = document.querySelector(".bottom")

vp.addEventListener("click", () =>
{
	if (bottom.classList.contains("active"))
	{
		vp.textContent = "See more"
	}
	else
	{
		bottom.classList.remove("active")
		vp.textContent = "Hide me"
	}
})