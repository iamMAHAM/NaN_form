let datas = document?.querySelector(".data")
let login = document?.querySelector(".submitbtn")
let fspassword = document?.querySelector(".forgotpsw")

const loginF = async (e)=>{
    e.preventDefault()
    options = {
        email: datas.children[0].value,
        password: datas.children[1].value
    }
    res = await fetchData("/user/login", options)
    if (res.status === "true"){
		window.location.href = "/user/dashboard"
		sessionStorage.setItem("session", JSON.stringify(res.message))
	}else{
		datas.children[0].style.borderColor = "red"
		datas.children[1].style.borderColor  = "red"
		setTimeout(()=>{
			datas.children[0].style.borderColor = "white"
			datas.children[1].style.borderColor  = "white"
		}, 3000)
	}
}

window.addEventListener("DOMContentLoaded", ()=>{
    login.addEventListener("click", loginF)
})