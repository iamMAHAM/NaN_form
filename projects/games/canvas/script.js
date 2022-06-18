let canvas = document.querySelector("canvas")
let context = canvas.getContext("2d")
let heightSquare = 25
let widthSquare = 40
let bar = [[4, 9], [5, 9]]
let ball = [5, 8]
let wall1 = [[1, 1], [2, 1]]
let wall2 = [[5, 1], [6, 1]]
let inter = null, moveDownv=null, backDownv = null
let toBreak = null

Array.prototype.equals = function (other, callback = (x, y) => (x === y)) {
    // Check the other object is of the same type
    if (Object.getPrototypeOf(this) !== Object.getPrototypeOf(other)) {
      return false;
    }
    if (this.length === undefined || this.length !== other.length) {
      return false;
    }
    return Array.prototype.every.call(this, (x, i) => callback(x, other[i]));
  };

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < bar.length; i++)
    {
        context.fillStyle = "red"
        context.fillRect(bar[i][0] * widthSquare, bar[i][1] * heightSquare, widthSquare, heightSquare)
    }
    createBrique(wall1)
    createBrique(wall2)
    context.fillStyle = "lime"
    context.beginPath()
    context.arc(ball[0] * widthSquare, ball[1] * heightSquare, 10, 0, Math.PI * 2, false)
    context.fill()
}

function createBrique(array)
{
    for (let i = 0; i < array.length; i++)
    {
        context.fillStyle = "wheat"
        context.fillRect(array[i][0] * widthSquare, array[i][1] * heightSquare, widthSquare, heightSquare)
    }
}


function backTop()
{
    console.log("backTop")
    clearInterval(inter)
    inter = setInterval(() => {
        ball = [ball[0] - 0.25, ball[1] - 0.25]
        if (ball[0] === 0 && ball[1] > 0){moveTop()}
        else if (ball[1] <= 0){backDown()}
        wallBreaker()
        draw()
    }, 50);
}


function backDown()
{
    backDownv = 1
    moveDownv = 0
    console.log("backDown")
    clearInterval(inter)
    inter = setInterval(() => {
        ball = [ball[0] - 0.25, ball[1] + 0.25]
        if (Math.floor(ball[1]) === 9){interceptBall()}
        else if (Math.floor(ball[0]) <= 0)
        {
            ball = [0, ball[1]]
            moveDown()
        }
        wallBreaker()
        draw()
    }, 50)
}

function moveTop()
{
    console.log("moveTop")
    clearInterval(inter)
    inter = setInterval(() => {
            ball = [ball[0] + 0.25, ball[1] - 0.25]
            if (ball[1] === 0){moveDown()}
            else if (ball[0] === 10){backTop()}
            wallBreaker()
            draw()
    }, 50);
}
function moveDown()
{
    moveDownv = 1
    backDownv = 0
    console.log("moveDown")
    clearInterval(inter)
    inter = setInterval(() => {
        ball = [ball[0] + 0.25, ball[1] + 0.25]
        if (ball[0] === 10){backDown()}
        else if (ball[1] === 9){interceptBall()}
        wallBreaker()
        draw()
    }, 50)
}

// function moveBall()
// {
//     inter = setInterval(() => {
//         if (ball[0] === 0){moveUp()}
//         else if (ball[1] === 0){moveDown()}
//         else if (ball[0] === 10){backDown()}
//         else {backTop()}
//         draw();
//     }, 50);
// }

function interceptBall()
{
    clearInterval(inter)
    if (Math.floor(ball[0]) === bar[0][0] || Math.floor(ball[0]) === bar[1][0])
    {
        let r = ball[0] === bar[0][0] ? -1 : 1 /*get appropriate value or r*/
        ball = [ball[0] , ball[1] - 0.25]

        if (moveDownv){moveTop()}
        else if (backDownv) {backTop()}
        else {console.log("Unknow range")}
    }
    else
    {
        // alert("GAME OVER")
        console.log("LOst ball", " 2 pos bar : ", [bar[0][0], bar[1][0]], "ball:", ball )
        clearInterval(inter)
    }
}

function removeE(array, tb)
{
    if (array)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (array[i].equals(tb))
            {
                if (i === 0)
                {
                    array = array.splice(0, 1)
                    console.log("NEW WALL ", array)
                }
                else
                {
                    array.splice(1, 1)
                }
            }
        }
    }

}

function wallBreaker()
{
    toBreak = [Math.floor(ball[0]), Math.floor(ball[1])]
    console.log(toBreak)
    removeE(wall1, toBreak)
    removeE(wall2, toBreak)
}
window.addEventListener("load", () => {
    draw()
    backTop()
})
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" &&  bar[1][0] < 9)
    {
        bar.shift()
        bar.push([bar[0][0] + 1, bar[0][1]])
        // console.log(bar)
        draw()
    }

    else if (e.key === "ArrowLeft" && bar[0][0] > 0)
    {
        bar.pop()
        bar.unshift([bar[0][0] - 1, bar[0][1]])
        // console.log(bar)
        draw()
    }
})