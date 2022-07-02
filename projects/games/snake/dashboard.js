const ok = document.querySelector("#ok")
const modals =  document.querySelector(".modals")
const input_pseudo = document.querySelector("#ins")
const player_games = document.querySelector(".player-games")
const dual = document.querySelector(".dual")
const modal_dual = document.querySelector(".modal-options")
const mod_val = document.querySelector(".validate")
let ws = null
let mod_values = null
let users = []

const popModal = (e)=>{
    modal_dual.style.display = "block"
    console.log(mod_val)
    mod_val.addEventListener("click",()=>{
        const select = document.querySelector("#select_wall")
        wall = select.options[select.selectedIndex].value
        mod_values = {
            type: "dual_request",
            speed: document.querySelector("#speed").value,
            request_id: e.target.parentElement.id,
            wall: wall === "true"
        }
        ws.send(JSON.stringify(mod_values))
        console.log("values : ", mod_values)
    })
}

window.addEventListener("load", ()=>{
    // socket
    ws = new WebSocket("ws://localhost:3000")
    ws.onopen = ()=>{
        ws.onmessage =  (i)=>{
            const rcv = JSON.parse(i.data)
            console.log(rcv)
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
                    console.log("new user rcv", rcv.data.username)
                        player_games.innerHTML += 
                        `
                        <div class="player-request"  id=${rcv?.data?.id}>
                            <p class="name">${rcv.data.username}</p>
                            <button class="dual" onclick="popModal()">duel</button>
                        </div>
                        `
                    break;
                    
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