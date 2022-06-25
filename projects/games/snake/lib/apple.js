class Apple{
    constructor(body = [], ctx, cv, ws, hs){
        this.ctx = ctx
        this.cv = cv
        this.ws = ws
        this.hs = hs
        this.body = body
    }

    draw(){
        let baseImg = new Image()
        baseImg.src = '../img/apple.png'
        base_image.onload = ()=>{
            this.ctx.drawImage(base_image, this.body[0]* this.ws, this.body[1]);
        }
    }

}