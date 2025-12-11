export class star {
    canvas
    pencil
    x = 0
    y = 0
    rad = 0
    speed = 0
    color = "#FFFFFF"
    db = false
    imgs = []
    chosenImg = null
    tintedImg = null

    constructor(canvas, pencil) {
        this.canvas = canvas
        this.pencil = pencil

        const img1 = new Image()
        img1.src = '../textures/star06.png'

        const img2 = new Image()
        img2.src = '../textures/star08.png'

        this.imgs.push(img1, img2)
    }

    draw() {
        let colors = ["#FFECA1","#CBFDFF","#FFCBCB"]

        if (!this.db) {
            this.rad = Math.random() * 2.5 + 0.7
            this.x = Math.random() * this.canvas.width
            this.y = Math.random() * this.canvas.height
            if (Math.random() > 0.75) {
                this.color = colors[Math.floor(Math.random() * colors.length)]
            }
            this.speed = Math.round((this.rad * -2) + 0.8)
            if (this.speed === 0) this.speed = -1
            this.chosenImg = this.imgs[Math.floor(Math.random() * this.imgs.length)]

            this.tintedImg = document.createElement('canvas')
            this.tintedImg.width = this.rad * 20
            this.tintedImg.height = this.rad * 20
            let baked = this.tintedImg.getContext('2d')
            baked.drawImage(this.chosenImg, 0, 0, this.rad*15, this.rad*15)
            baked.globalCompositeOperation = 'source-in'
            baked.fillStyle = this.color
            baked.fillRect(0, 0, this.rad*15, this.rad*15)
            this.rotation = Math.random() * Math.PI * 2

            this.db = true
        }

        if (this.x < -this.rad) {
            this.x = this.canvas.width + this.rad
        }

        this.x += this.speed

        this.pencil.drawImage(this.tintedImg, this.x, this.y)
    }
}
