export class asteroid {
    x
    y
    rad
    canvas
    pencil
    speedX = 0
    speedY
    db = false
    imgs = []
    chosenImg
    rot = 0
    rotSpeed = 0


    constructor(canvas, pencil, size, speed) {
        this.canvas = canvas
        this.pencil = pencil
        this.rad = size
        this.speedX = speed
        
        const img1 = new Image()
        img1.src = '../as1.png'

        const img2 = new Image()
        img2.src = '../as2.png'

        this.imgs.push(img1, img2)

        this.rot = Math.random() * Math.PI * 2
        this.rotSpeed = (Math.random() - 0.5) * 0.1
    }

    asteroid() {

        if (this.db == false) {
            this.x = window.innerWidth + this.rad
            this.y = Math.random() * window.innerHeight


            const timeToLeft = (window.innerWidth + this.rad) / Math.abs(this.speedX)

            const roomUp = this.y - this.rad
            const roomDown = window.innerHeight - this.y - this.rad

            const maxUpVy = -roomUp / timeToLeft
            const maxDownVy = roomDown / timeToLeft

            const goDown = Math.random() < 0.5

            if (goDown) {
                this.speedY = Math.random() * maxDownVy
            } else {
                this.speedY = Math.random() * maxUpVy
            }
            this.chosenImg = this.imgs[Math.floor(Math.random() * this.imgs.length)]

            this.db = true
        }

        this.x += this.speedX
        this.y += this.speedY

        this.rot += this.rotSpeed

        this.pencil.save()
        this.pencil.translate(this.x + this.rad / 2, this.y + this.rad / 2)
        this.pencil.rotate(this.rot)
        this.pencil.drawImage(this.chosenImg, -this.rad / 2, -this.rad / 2, this.rad, this.rad)
        this.pencil.restore()

        if (this.x < 0 - this.rad) {this.db = false }
    }
}
