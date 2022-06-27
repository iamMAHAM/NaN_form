class Snake
{
    constructor(body = [], ctx, cv, ws, hs){
        this.ctx = ctx
        this.cv = cv
        this.ws = ws
        this.hs = hs
        this.body = body
        this.movement = 'moveRight'
        this.justEat = false
        this.dead = false
    }

    draw(){
        this.ctx.clearRect(0, 0, this.cv.width, this.cv.height)
        for (let i = 0; i < this.body.length; i++){
            this.ctx.fillStyle = "#1d1d1d"
            this.ctx.fillRect(this.body[i][0] * this.ws, this.body[i][1] * this.hs, this.ws, this.hs)
        }
    }

    setPosition(key){
        switch (key){
            case "ArrowLeft": this.movement = 'moveLeft' ; break
            case "ArrowRight": this.movement = 'moveRight'; break
            case "ArrowDown": this.movement = 'moveDown'; break
            case "ArrowUp": this.movement = 'moveTop'; break
        }
    }

    checkCollision(){
        let last = JSON.stringify(this.body[this.body.length -1])
        let str = JSON.stringify(this.body.slice(0, this.body.length - 1))
        let match = str.includes(last)
        last = this.body[this.body.length -1]
        if (match || last[0] === this.cv.width/this.ws || 
                last[1] === this.cv.height / this.ws ||
                last[0] < 0 || last[1] < 0){
                this.dead = true
        }
    }

    grow(){
        if (this.justEat){
            console.log("oklm")
            let last = this.body[this.body.length - 1]
            if (this.movement === 'moveDown'){
                this.body.push([last[0], last[1]+1])
            }
            else if (this.movement === 'moveTop'){
                this.body.push([last[0], last[1]-1])
            }
            else if (this.movement === 'moveLeft'){
                this.body.push([last[0] -1, last[1]])
            }
            else{
                this.body.push([last[0] + 1, last[1]])
            }
        }
        this.checkCollision()
    }

    move()
    {
        this.justEat = false
        let last = this.body[this.body.length - 1]
        switch (this.movement){
            case 'moveDown':
                this.body.shift()
                this.body.push([last[0], last[1]+1])
                break

            case 'moveTop':
                this.body.shift()
                this.body.push([last[0], last[1]-1])
                break

            case 'moveLeft':
                this.body.shift()
                this.body.push([last[0] -1, last[1]])
                break

            case 'moveRight':
                this.body.shift()
                this.body.push([last[0] + 1, last[1]])
                break
        }
        this.draw()
    }
}
