const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let levels = []
let currentLevel = {}
let barre = [
    [4, 9],
    [5, 9],
]
let bricks = []
let balle = [5, 8]
const heightSquare = 25
const widthSquare = 40
let move = 'topLeft'
let gameOver = false
let inter = null

// draw
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //draw bricks
    for (let i = 0; i < bricks.length; i++) {
        for (let j = 0; j < bricks[i].length; j++) {
            const [x, y] = bricks[i][j]
            ctx.fillStyle = 'dodgerblue'
            ctx.fillRect(
                widthSquare * x,
                heightSquare * y,
                widthSquare,
                heightSquare
            )
        }
    }
    for (let i = 0; i < barre.length; i++) {
        ctx.fillStyle = 'red'
        ctx.fillRect(
            widthSquare * barre[i][0],
            heightSquare * barre[i][1],
            widthSquare,
            heightSquare
        )
    }
    ctx.beginPath()
    ctx.arc(
        widthSquare * balle[0],
        heightSquare * balle[1],
        10,
        0,
        Math.PI * 2,
        true
    )
    ctx.fillStyle = 'blue'
    ctx.fill()
}

//  eheck if Collision
const checkCollision = ([x, y]) => {
    let index = bricks.findIndex((b) =>
        b.find((v) => v[0] === x - 1 && y - 1 === v[1])
    )
    if (index !== -1) {
        bricks.splice(index, 1)
    }
    if (bricks.length === 0) {
        clearInterval(inter)
        currentLevel = levels[currentLevel.level]
        barre = [
            [4, 9],
            [5, 9],
        ]
        balle = [5, 8]
        bricks = genBricks(currentLevel)
        draw()
        moveBall()
    }
}

// move ball
const moveBall = () => {
    inter = setInterval(() => {
        let x = balle[0]
        let y = balle[1]
        if (x === 0) {
            move = y === 0 || move === 'bottomLeft' ? 'bottomRight' : 'topRight'
        } else if (y === 0) {
            move = x === 9 || move === 'topLeft' ? 'bottomLeft' : 'bottomRight'
        } else if (x === 9) {
            move = move === 'topRight' ? 'topLeft' : 'bottomLeft'
        } else if (
            y === 8.5 &&
            barre.find(
                (b) =>
                    (b[0] === Math.floor(x) ||
                        b[0] === Math.floor(x) - 1 ||
                        b[0] === Math.ceil(x)) &&
                    b[1] === Math.ceil(y)
            )
        ) {
            if (move === 'bottomLeft') {
                move = 'topLeft'
            } else if (move === 'bottomRight') {
                move = 'topRight'
            }
        } else if (y === 9.75) {
            clearInterval(inter)
            gameOver = true
        }
        if (!gameOver) {
            switch (move) {
                case 'topLeft':
                    balle = [balle[0] - 0.25, balle[1] - 0.25]
                    break
                case 'topRight':
                    balle = [balle[0] + 0.25, balle[1] - 0.25]
                    break
                case 'bottomRight':
                    balle = [balle[0] + 0.25, balle[1] + 0.25]
                    break
                case 'bottomLeft':
                    balle = [balle[0] - 0.25, balle[1] + 0.25]
            }
            checkCollision(balle)
            draw()
        } else {
            alert('game over')
        }
    }, 10 * currentLevel?.speed)
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 39 && barre[1][0] < 8) {
        barre.shift()
        barre.push([barre[0][0] + 1, barre[0][1]])
        draw()
    } else if (e.keyCode === 37 && barre[0][0] > 0) {
        barre.pop()
        barre.unshift([barre[0][0] - 1, barre[0][1]])
        draw()
    }
})

window.addEventListener('load', async () => {
    levels = await (await fetch('./levels.json')).json()
    currentLevel = levels[0]
    bricks = genBricks(currentLevel)
    draw()
    moveBall()
})

// genRandom
const genRandom = (length) => {
    let y = Math.floor(Math.random() * 4)
    let x = Math.floor(Math.random() * (canvas.width / widthSquare - length))
    return [x, y]
}
// gen Bricks
const genBricks = ({ bricks, brickSquareLength }) => {
    let output = []
    let total = bricks * brickSquareLength
    if (total < 4 * (canvas.width / widthSquare)) {
        for (let b = 0; b < bricks; b++) {
            let brick = []
            let first = genRandom(brickSquareLength)
            while (
                output.find((b) =>
                    b.find(
                        (v) =>
                            (v[0] === first[0] ||
                                first[0] + (brickSquareLength - 1) === v[0]) &&
                            v[1] === first[1]
                    )
                )
            ) {
                first = genRandom(brickSquareLength)
            }
            brick.push(first)
            if (brickSquareLength > 1) {
                for (let i = 1; i < brickSquareLength; i++) {
                    let prev = brick[i - 1]
                    brick.push([prev[0] + 1, prev[1]])
                }
            }
            output.push(brick)
        }
    }

    return output
}
