const fetchData = async (path="/", datas={})=>{
    res = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {"content-type": "application/json"}
    })
    res = await res.json()
    return res
}

