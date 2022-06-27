/**All constants */
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const widthSquare = 25
const heigthSquare = 25


let fps = 5;
let now;
let then = Date.now();
let interval = 1000/fps;
let delta;


window.addEventListener("load", ()=>{
    const snake = new Snake([[5, 18], [6, 18], [7, 18], [8, 18], [9, 18]], ctx, canvas, widthSquare, heigthSquare)
    const apple = new Apple([6, 19], ctx, canvas, widthSquare, heigthSquare)
    snake.draw()
    // 
    apple.draw()

    const move = ()=>{
        if (!snake.dead){
            requestAnimationFrame(move)
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                apple.draw()
                snake.move()
                apple.checkEat(snake)
                snake.grow()
        }
        }
        else
        {
            alert("game Over")
        }
}
    move()

    window.addEventListener("keydown", (e)=>{
        snake.setPosition(e.key)
    })
}
)