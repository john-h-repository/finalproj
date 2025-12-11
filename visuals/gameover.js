export class menu02 {

    canvas
    pencil
    scale
    deathButtons
    isHS = false
    hue = 0
    hueSpeed = 0.5    

    constructor(canvas, pencil, scale) {
        this.canvas = canvas
        this.pencil = pencil
        this.scale = scale

        this.deathButtons = [ 
            { text: "try AGAIN !!",
            onClick: () => {
                return 'restart'
            }, 
            x:0, y:0, w:0, h:0 },

            { text: "back 2 menu",
                onClick: () => {
                return 'menu'
            }, 
            x:0, y:0, w:0, h:0 },
        ]
    }

    draw(score) {

        let storedScore = parseInt(localStorage.getItem("highScore") || "0")
        if (score > storedScore) {
            this.isHS = true
            localStorage.setItem("highScore", score)
        }
        console.log(this.isHS )

        this.hue += this.hueSpeed
        if (this.hue > 360) this.hue -= 360

        const hsColor = `hsl(${this.hue}, 80%, 50%)`

        const scale = this.canvas.height / 1440

        this.pencil.fillStyle = '#1b0000ff'
        this.pencil.strokeStyle = '#920101ff'
        this.pencil.lineWidth = 7 * scale
        this.pencil.globalAlpha = 0.6

        const boxW = this.canvas.width * 0.25
        const boxH = this.canvas.height * 0.6
        const boxX = this.canvas.width * 0.5 - boxW * 0.5
        const boxY = this.canvas.height * 0.5 - boxH * 0.5

        this.pencil.fillRect(boxX, boxY, boxW, boxH)
        this.pencil.strokeRect(boxX, boxY, boxW, boxH)
        this.pencil.globalAlpha = 1

        this.pencil.font = `${80 * scale}px serif`
        this.pencil.fillStyle = '#ffffffd5'

        const title = "you died... 💔"
        const titleWidth = this.pencil.measureText(title).width
        this.pencil.fillText(title, this.canvas.width * 0.5 - titleWidth * 0.5, boxY + 150 * scale)

        this.pencil.font = `${50 * scale}px serif`
        this.pencil.fillStyle = '#ffffffd5'
        const scoreTitle = "YOUR SCORE:"
        const scoreTitleWidth = this.pencil.measureText(scoreTitle).width
        this.pencil.fillText(scoreTitle, this.canvas.width * 0.5 - scoreTitleWidth * 0.5, boxY + 300 * scale)
        
        this.pencil.font = `${128 * scale}px serif`
        if (this.isHS) {this.pencil.fillStyle = hsColor} else {this.pencil.fillStyle = '#ffffffd5'}
        const scoreText = score
        const scoreWidth = this.pencil.measureText(scoreText).width
        this.pencil.fillText(scoreText, this.canvas.width * 0.5 - scoreWidth * 0.5, boxY + 450 * scale)
        
        if (this.isHS) {
            this.pencil.font = `${18 * scale}px serif`
            const HSMessage = 'NEW HIGH SCORE BABY LETS GOOOOOOO 🤩🤩🤩'
            const HSMessageWidth = this.pencil.measureText(HSMessage).width
            this.pencil.fillText(HSMessage, this.canvas.width * 0.5 - HSMessageWidth * 0.5, boxY + 500 * scale)   
        }

        const btnWidthPadding = 100 * scale
        const btnHeight = 68 * scale
        const spacing = 70 * scale

        this.pencil.font = `${48 * scale}px serif`

        let startY = boxY + (580 * scale)

        this.deathButtons.forEach((btn, i) => {
            const textWidth = this.pencil.measureText(btn.text).width
            const bw = textWidth + btnWidthPadding

            const bx = this.canvas.width * 0.5 - bw * 0.5
            const by = startY + i * (btnHeight + spacing)

            btn.x = bx
            btn.y = by
            btn.w = bw
            btn.h = btnHeight

            this.pencil.fillStyle = "#500000cc"
            this.pencil.fillRect(bx, by, bw, btnHeight)

            this.pencil.strokeStyle = "#5e0101"
            this.pencil.lineWidth = 4 * scale
            this.pencil.strokeRect(bx, by, bw, btnHeight)

            this.pencil.fillStyle = "#ffffffdd"
            this.pencil.fillText(btn.text, bx + (bw - textWidth) / 2, by + (48 * scale))
        })
    }

    click(e) {
        let rect = this.canvas.getBoundingClientRect();
        let mx = e.clientX - rect.left;
        let my = e.clientY - rect.top;

        for (let btn of this.deathButtons) {
            if (
                mx >= btn.x &&
                mx <= btn.x + btn.w &&
                my >= btn.y &&
                my <= btn.y + btn.h
            ) {
                return btn.onClick();
            }
        }
    }
}