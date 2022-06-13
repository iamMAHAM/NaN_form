let canvas = document.querySelector("canvas")
let context = canvas.getContext("2d")
let heightSquare = 25
let widthSquare = 40
let bar = [[4, 9], [5, 9]]
let ball = [5, 8]
let inter = null

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < bar.length; i++)
    {
        context.fillStyle = "red"
        context.fillRect(bar[i][0] * widthSquare, bar[i][1] * heightSquare, widthSquare, heightSquare)
    }
    context.fillStyle = "lime"
    context.beginPath()
    context.arc(ball[0] * widthSquare, ball[1] * heightSquare, 10, 0, Math.PI * 2, false)
    context.fill()
}


function moveBall()
{

    inter = setInterval(()=>{
        if (ball[0] === 0)
        {
            ball = [ball[0] + 1, ball[1] - 1]
            draw()
        }
        else
        {
            ball = [ball[0] - 1, ball[1] - 1]
        }
    }, 200)
}

window.addEventListener("load", () => {
    draw()
    moveBall()
})
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" &&  bar[1][0] < 9)
    {
        bar.shift()
        bar.push([bar[0][0] + 1, bar[0][1]])
        console.log(bar)
        draw()
    }

    else if (e.key === "ArrowLeft" && bar[0][0] > 0)
    {
        bar.pop()
        bar.unshift([bar[0][0] - 1, bar[0][1]])
        console.log(bar)
        draw()
    }
})