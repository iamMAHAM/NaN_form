class Apple{
    constructor(body = [], ctx, cv, ws, hs){
        this.ctx = ctx
        this.cv = cv
        this.ws = ws
        this.hs = hs
        this.body = body
        this.wasEat = false
    }

    draw(){
        let baseImg = new Image()
        baseImg.src = '../img/apple.png'
        baseImg.onload = ()=>{
            this.ctx.drawImage(baseImg, this.body[0]* this.ws, this.body[1]* this.hs, this.ws, this.hs);
        }
    }

    genPosition(){
        this.wasEat = false
        let x = Math.floor(Math.random() * this.cv.width / this.ws)
        let y = Math.floor(Math.random() * this.cv.height / this.hs)
        this.body = [x, y]
    }

    checkEat(snake){
        let snakeHead = snake.body[snake.body.length -1]
        console.log("snake : ", snakeHead, "|| apple : ", this.body)
        if (JSON.stringify(snakeHead) === JSON.stringify(this.body)){
            // alert("found")
            this.wasEat = true
            snake.justEat = true
            this.genPosition()
        }
    }
}