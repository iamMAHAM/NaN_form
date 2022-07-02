const http = require("node:http")
const ws = require("ws")
const genId = require("./lib/func")
const server = http.createServer()
let users = []
const wss = new ws.WebSocketServer({server})

wss.on("connection", (ws)=>{
    ws.on("message", (i)=>{
        const message = JSON.parse(i.toString())
        switch (message.type){
            case 'connection':
                ws.id = genId(7)
                ws.username = message.data
                users.push({
                    id: ws.id,
                    username: ws.username
                })
                wss.clients.forEach((client)=>{
                    if (client.id === ws.id){
                        client.send(JSON.stringify({
                            type: 'connection',
                            data: {
                                id: ws.id,
                                username: ws.username,
                                users: users.filter(u => u.id !== ws.id)
                            }
                        }))
                    }else{
                        client.send(JSON.stringify({
                            type: "new_user",
                            data: {
                                id: ws.id,
                                username: ws.username
                            }
                        }))
                    }
                })
                break
            
            case 'dual_request':
                console.log(message)
                console.log("dual_request to id")
        }
    })
})

server.listen(3000, ()=>{
    console.log("server demarré")
})
