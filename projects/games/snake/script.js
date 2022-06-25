/**All constants */
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const widthSquare = 25
const heigthSquare = 25
var fps = 5;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;



window.addEventListener("load", ()=>{
    const snake = new Snake([[5, 18], [6, 18], [7, 18], [8, 18], [9, 18]], ctx, canvas, widthSquare, heigthSquare)
    snake.draw()



    const move = ()=>{
        if (!snake.dead){
            requestAnimationFrame(move)
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                snake.move()
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