const http = require("node:http")
const ws = require("ws")
const genId = require("./lib/func")
const server = http.createServer()
let users = []
const wss = new ws.WebSocketServer({server})
let sessions = {}

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
                                id: 'player-' + ws.id,
                                username: ws.username,
                                users: users.filter(u => u.id !== ws.id)
                            }
                        }))
                    }else{
                        client.send(JSON.stringify({
                            type: "new_user",
                            data: {
                                id: 'player-' + ws.id,
                                username: ws.username
                            }
                        }))
                    }
                })
                break
            
            case 'dual_request':
                id = genId(10)
                sessions[id] = {
                    param: {
                        speed: message.speed,
                        wall: message.wall
                    },
                    players:[
                        {
                            route: ws,
                            id: ws.id,
                            username: ws.username,
                            snake: [],
                            score: 0
                        }
                    ],
                    apple: [0, 0]
                }
                wss.clients.forEach(client =>{
                    if (client.id === message.target_id.replace("player-", "")){
                        client.send(JSON.stringify({
                            type: 'dual_request',
                            request_id: message.request_id,
                            param: sessions[id].param,
                            session_id: id
                        }))
                    }
                })
                break
            
            case 'global':
                console.log("global message", message)

                if (message.status === 'Accept'){
                    client = ws
                }else{//in case of refusal
                    client = sessions[message.session_id].players[0].route
                    delete sessions[message.session_id]
                }
                client.send(JSON.stringify({
                    type: 'global',
                    status: message.status
                }))
                break
        }
    })
})

server.listen(3000, ()=>{
    console.log("server demarré")
})
