export class star {
    
    canvas
    pencil
    x = 0
    y = 0
    rad = 0
    speed = 0
    color = "#FFFFFF"
    db = false

    constructor(canvas, pencil) {
        this.canvas = canvas
        this.pencil = pencil
      }

    draw(move) {
        let colors = ["#FFECA1","#CBFDFF","#FFCBCB"]

        if (this.db == false) {
            this.rad = Math.random()*2.5+.5
            console.log(this.rad)
            this.x = Math.random()*window.innerWidth
            this.y = Math.random()*(window.innerHeight)
            if (Math.random() > .75) {
                this.color = colors[Math.floor(Math.random()*colors.length)]
            }
            this.speed = move
            this.db = true
        }

        if (this.x > window.innerWidth+this.rad) {
            this.x = 0-this.rad
        }

        this.x+=this.speed

        this.pencil.beginPath()
        this.pencil.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        
        this.pencil.fillStyle = this.color
        this.pencil.fill();
      }
}