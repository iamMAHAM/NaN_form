const fetchData = async (path="/", datas={})=>{
    res = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {"content-type": "application/json"}
    })
    res = await res.json()
    return res
}


const upload = (path)=>{
    const formdata = new FormData()
    formdata.append("image", path)
    fetch("https://api.imgur.com/3/image/", {
        method: "post",
        headers: {
            Authorization: "Client-ID 4849c20ef2a8dcc"
        },
        body: formdata
    }).then(data => data.json()).then(data => {
        console.log(data.data)
    })
}
