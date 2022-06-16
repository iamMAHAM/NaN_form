let canvas = document.querySelector("canvas")
let context = canvas.getContext("2d")
let heightSquare = 25
let widthSquare = 40
let bar = [[4, 9], [5, 9]]
let ball = [5, 8]
let inter = null, backTopInter=null, moveTopInter=null, moveDownInter=null, backDownInter = null

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


function backTop()
{
    console.log("backTop")
    clearInterval(inter)
    inter = setInterval(() => {
        ball = [ball[0] - 1, ball[1] - 1]
        if (ball[0] === 0)
        {
            moveTop()
        }
        draw()
    }, 200);
}

function moveTop()
{
    console.log("moveTop")
    clearInterval(inter)
    inter = setInterval(() => {
            ball = [ball[0] + 1, ball[1] - 1]
            if (ball[1] === 0){moveDown()}
            draw()
    }, 200);
}
function moveDown()
{
    console.log("moveDown")
    clearInterval(inter)
    inter = setInterval(() => {
        ball = [ball[0] + 1, ball[1] + 1]
        if (ball[0] === 10){backDown()}
        draw()
    }, 200)
}

function backDown()
{
    console.log("backDown")
    clearInterval(inter)
    inter = setInterval(() => {
        ball = [ball[0] - 1, ball[1] + 1]
        if (ball[1] === 10){interceptBall()}
        draw()
    }, 200)
}

function moveBall()
{
    inter = setInterval(() => {
        if (ball[0] === 0){moveUp()}
        else if (ball[1] === 0){moveDown()}
        else if (ball[0] === 10){backDown()}
        else {backTop()}
    }, 200);
}

function interceptBall()
{
    if (ball[0] === bar[0][0] || ball[0] === bar[1][0])
    {
        let r = ball[0] === bar[0][0] ? -1 : 1 /*get appropriate value or r*/
        console.log("ball before", ball)
        ball = [ball[0] + r, ball[1]]
        console.log(bar)
        console.log("ball after", ball)
        backTop()
    }
    else
    {
        alert("GAME OVER")
        clearInterval(inter)
    }
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