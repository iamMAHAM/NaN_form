const http = require("http")
const fs = require("fs")
const url = require("url")
const EventEmitter = require("events")

let server = http.createServer()
server.on("request", (req, res)=>{
    let path = "./"
    console.log(req.url)
    switch (req.url){
        case '/':
            path += "index.html"
            break
        
        case '/register':
            path += "register.html"
            break
        
        default:
            path += "404.html"
            break
    }
    fs.readFile(path, (err, data)=>{

        if (err){
            console.log(err)
        }
        res.writeHead(200, {
            "content-type": "text/html; charset:utf-8"
        })
        res.end(data)
        })

    })
server.listen(5500)