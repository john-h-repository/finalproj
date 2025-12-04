export class player {
    x = 50
    y = 50
    width = 70
    height = 50
    canvas
    pencil
    ySpeed = 0
    xSpeed = 0
    vertPower = .1
    hozPower = .1
    velocity = 0
    maxY = 1
    maxX = 1
    movement

    constructor(canvas, pencil, movement) {
        this.pencil = pencil
        this.canvas = canvas 
        this.movement = movement
    }

    draw() {
        this.pencil.fillStyle = "blue"
        this.pencil.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    move() {
        this.y += this.ySpeed
        this.x += this.xSpeed
        if (this.movement != null){ 
            if (this.movement["w"]){
                this.ySpeed -= this.vertPower
            }
            if (this.movement["s"]){
                this.ySpeed += this.vertPower
            }
            if (this.movement["a"]){
                this.xSpeed -= this.hozPower
            }
            if (this.movement["d"]){
                this.xSpeed += this.hozPower
            }
        }

        if (this.ySpeed > this.maxY) {
            this.ySpeed = this.maxY
        }
        if (this.xSpeed > this.maxX) {
            this.xSpeed = this.maxX
        }
    }
}