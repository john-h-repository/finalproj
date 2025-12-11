export class player {
    canvas
    pencil
    x
    y
    width = 50
    height = 50
    ySpeed = 0
    xSpeed = 0
    vertPower = .325
    hozPower = .05
    maxY = 4
    maxX = 2
    movement
    imgs = []
    chosenImg = null
    rotdb = false
    deadrot
    sizedb = false

    hitbox = { x: 0, y: 0, width: 0, height: 0 }

    constructor(canvas, pencil, movement) {
        this.pencil = pencil
        this.canvas = canvas 
        this.movement = movement

        const img1 = new Image()
        img1.src = '../textures/none.png'

        const img2 = new Image()
        img2.src = '../textures/right.png'
        
        const img3 = new Image()
        img3.src = '../textures/rightdown.png'

        const img4 = new Image()
        img4.src = '../textures/rightup.png'

        const img5 = new Image()
        img5.src = '../textures/up.png'

        const img6 = new Image()
        img6.src = '../textures/down.png'
        
        const img7 = new Image()
        img7.src = '../textures/dead.png'

        this.imgs.push(img1, img2, img3, img4, img5, img6, img7)

        this.chosenImg = this.imgs[0]

        this.x = this.canvas.width * .2
        this.y = this.canvas.height * .5

        this.updateHitbox()
    }

collidesWithAsteroid(asteroid) {

    const playerCenterX = this.x + this.width / 2
    const playerCenterY = this.y + this.height / 2

    const asteroidCenterX = asteroid.x + asteroid.rad / 2
    const asteroidCenterY = asteroid.y + asteroid.rad / 2

    const dx = playerCenterX - asteroidCenterX
    const dy = playerCenterY - asteroidCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)

    const playerRadius = Math.min(this.width-10, this.height-10) / 2
    const asteroidRadius = asteroid.rad / 2

    return distance < (playerRadius + asteroidRadius)
}

    updateHitbox() {
        const paddingX = 12
        const paddingY = 12
        this.hitbox.x = this.x + paddingX
        this.hitbox.y = this.y + paddingY
        this.hitbox.width = this.width - paddingX * 2
        this.hitbox.height = this.height - paddingY * 2
    }

    draw(dead, reset) {
        if (!dead) {
            this.pencil.drawImage(this.chosenImg, this.x, this.y, this.width, this.height)
            return
        }
        if (reset) {
            this.x = this.canvas.width * .2
            this.y = this.canvas.height * .5
            this.width = 50
            this.height = 50
            this.ySpeed = 0
            this.xSpeed = 0
        }

        if (this.width <= 0 || this.height <= 0) return
        if (dead && this.sizedb == false) this.width = 75, this.height = 75, this.sizedb = true
        this.pencil.save()
        this.pencil.translate(this.x + this.width / 2, this.y + this.height / 2)
        if (this.rotdb == false) {
            this.deadrot = Math.random() * Math.PI * 2
            this.width -=3
            this.height -=3
            this.rotdb = true
            setTimeout(() => {
                this.rotdb = false
            }, 1000/15)
        }
        this.pencil.rotate(this.deadrot)
        this.pencil.drawImage(this.imgs[6], -this.width / 2, -this.height / 2, this.width, this.height )
        this.pencil.restore()

        //debug hitbox drawin
        // this.pencil.fillStyle = "rgba(255, 0, 0, 0.4)"  // semi-transparent red
        // this.pencil.fillRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height)
    }

    move(dead) {
        if (!dead) {
            let keysY = this.movement.w || this.movement.s
            let keysX = this.movement.a || this.movement.d

            this.y += this.ySpeed
            this.x += this.xSpeed
            if (keysY){ 
                if (this.movement.w){
                    this.ySpeed -= this.vertPower
                    this.chosenImg = this.imgs[4]
                }
                if (this.movement.s){
                    this.ySpeed += this.vertPower
                    this.chosenImg = this.imgs[5]
                }
            } else {
                this.ySpeed -= Math.sign(this.ySpeed) * .035
                if (Math.abs(this.ySpeed) < this.vertPower) this.ySpeed = 0
            }
            if (keysX){
                if (this.movement.a){
                    this.xSpeed -= this.hozPower
                }
                if (this.movement.d){
                    this.xSpeed += this.hozPower
                    this.chosenImg = this.imgs[1]
                }
            } else {
                this.xSpeed -= Math.sign(this.xSpeed) * .02
                if (Math.abs(this.xSpeed) < this.vertPower) this.xSpeed = 0
            }
            // this code is bad and you should feel bad mr lino pirrotta
            if (keysX && keysY) {
                if (this.movement.w && this.movement.d){
                    this.chosenImg = this.imgs[3]
                }
                if (this.movement.s && this.movement.d){
                    this.chosenImg = this.imgs[2]
                }
            }
            if ((!keysX && !keysY) || this.movement.a) {
                this.chosenImg = this.imgs[0]
                if (this.movement.w) {
                    this.chosenImg = this.imgs[4]
                } else if (this.movement.s) {
                    this.chosenImg = this.imgs[5]
                }
            }

            this.ySpeed = Math.max(-this.maxY, Math.min(this.ySpeed, this.maxY))
            this.xSpeed = Math.max(-this.maxX, Math.min(this.xSpeed, this.maxX))
            
            // console.log('x speed = ', this.xSpeed)
            // console.log('y speed = ', this.ySpeed)
            this.updateHitbox()
        }
    }
}