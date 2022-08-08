const postData = (url, body, callback) => {
    fetch(url, {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify(body)
    }).then(response=>{return response.json()})
    .then(data=> {
        return callback(data)
    })
}
 
export default postData;