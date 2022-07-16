const app = require("../server/server")

/*welcome modal selections*/
const ok = document.querySelector("#ok")
const input_pseudo = document.querySelector("#ins")
const modals =  document.querySelector(".modals")
let inter = null

/*all players div*/
const player_games = document.querySelector(".player-games")

/*choose options modal for dual*/
const modal_dual = document.querySelector(".modal-options")
let validate_options = document.querySelector(".validate")
const buttons = document.querySelector(".buttons")

/*Accept or cancel dual*/
const modal_request = document.querySelector(".modal-request")
const request_id = document.querySelector(".player-req-id")
const cancel = document.querySelector("#refuse")
const validate = document.querySelector("#accept")

/**No modals*/
const requests = document.querySelector(".requests")

/*global variables declaration*/
let ws = null
let validate_options_values = null
let users = []

const popModal = (e)=>{
    modal_dual.style.display = "block"
    validate_options =document.querySelector(".validate")
    validate_options.addEventListener("click",()=>{
        const select = document.querySelector("#select_wall")
        wall = select.options[select.selectedIndex].value
        validate_options_values = {
            type: "dual_request",
            speed: document.querySelector("#speed").value,
            request_id: document.querySelector(".player-id").textContent,
            target_id: e.target.parentElement.id,
            wall: wall === "true"
        }
        ws.send(JSON.stringify(validate_options_values))
        buttons.style.display = "flex"
        buttons.style.justifyContent = "center"
        buttons.style.fontSize = "20px"
        let timer = 60
        buttons.textContent = `Waiting for client ... \n${timer--}`
        inter = setInterval(()=>{
            buttons.textContent = `Waiting for client ... \n${timer--}`
            if (timer === 0){
                modal_dual.style.display = "none"
                clearInterval(inter)
                buttons.innerHTML = 
                `
                    <button class="cancel">Cancel</button>
                    <button class="validate">Ok</button>
                `
            }
        }, 1000)
})}

const showRequestOptions = (e)=>{
    let rcv = null
    try{
        rcv = JSON.parse(e.target.id)
    }catch{
        rcv = JSON.parse(e.target.parentElement.id)
    }
    console.log(rcv)
    modal_request.innerHTML = 
    `<div class="req" id=${rcv.session_id}>
    <p>dual Request : <br><span class="player-req-id">${rcv.request_id}</span></p>
    <div class="param">
        <p>
            speed : <span class="speed-v">${rcv.param.speed}</span>
        </p>
        <p>
            wall :  <span class="wall-v">${rcv.param.wall}</span>
        </p>
    </div>
    <div class="ok-cancel request">
        <button id="refuse" onclick=handle(event)>Cancel</button>
        <button id="accept" onclick=handle(event)>Accept</button>
    </div>
    </div>
    `
    modal_request.style.display = "block"

}

const handle = (e)=>{
    modal_dual.style.display = "none"
    ws.send(JSON.stringify({
        type: 'global',
        status: e.target.textContent, 
        session_id: e.target.parentElement.parentElement.id
    }))
    modal_request.style.display = "none"
    if (e.target.textContent === 'Cancel'){
        let id  = e.target.parentElement.parentElement.id
        let children = requests.children
        Array.from(children).forEach(child=>{
            if (child.id.includes(id)){
                requests.removeChild(child)
            }
        })
    }else{//accept
        setTimeout(()=>{
            window.location.href = "snake.html"
        }, 5000)
    }
}

window.addEventListener("load", ()=>{
    // socket
    ws = new WebSocket("ws://192.168.88.33:3000")
    ws.onopen = ()=>{
        ws.onmessage =  (i)=>{
            const rcv = JSON.parse(i.data)
            switch (rcv.type){
                case 'connection':
                    modals.style.display = "none"
                    document.querySelector(".player-id").textContent = rcv.data.id
                    document.querySelector(".player-name").textContent = rcv.data.username
                    rcv?.data?.users?.map(u => {
                        player_games.innerHTML += 
                        `
                        <div class="player-request" id=${u?.id}>
                            <p class="name">${u.username}</p>
                            <button class="dual" onclick="popModal(event)">duel</button>
                        </div>
                        `
                    })
                    break;
                case 'new_user':
                        player_games.innerHTML += 
                        `
                        <div class="player-request"  id=${rcv?.data?.id}>
                            <p class="name">${rcv.data.username}</p>
                            <button class="dual" onclick="popModal(event)">duel</button>
                        </div>
                        `
                    break;
                
                case 'dual_request':
                    console.log(rcv)
                    requests.innerHTML += 
                    `
                        <p class="request" id=${JSON.stringify(rcv)}>
                            <span class="player-req-id">${rcv.request_id}</span>
                        </p>
                    `
                    let children = requests.children
                    Array.from(children).forEach(child =>{
                        child.addEventListener("click", showRequestOptions)
                    })
                    break
                
                case 'global':
                        console.log('global', rcv)
                        if (rcv.status === 'Accept'){
                            modal_dual.style.display = "none"
                            ws.send(JSON.stringify({
                                type: 'ready',
                                
                            }))
                            alert("your pair has accepted your request\n\
                            you will be redirected in 5 seconds")
                            setTimeout(() => {
                                window.location.href = "snake.html"
                            }, 5000);
                        }else{//in case of refusal
                            alert("you pair has refused your request")
                            clearInterval(inter)
                            modal_dual.style.display = "none"
                            buttons.innerHTML = 
                            `
                                <button class="cancel">Cancel</button>
                                <button class="validate">Ok</button>
                            `
                        }
                        break


            }
           
        }
    }

    ok.addEventListener("click", ()=>{
        let pseudo = input_pseudo.value
        if (pseudo.length < 5){
            alert("le pseudo doit être au moins de 5 caractères")
        }else{
          ws.send(JSON.stringify({
            type: 'connection',
            data: pseudo
          }))
        }
    })

})