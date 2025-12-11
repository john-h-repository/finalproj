export class menu01 {

    canvas
    pencil
    scale
    menuButton
    hue = 0
    hueSpeed = 0.5    

    constructor(canvas, pencil, scale) {
        this.canvas = canvas
        this.pencil = pencil
        this.scale = scale

        this.menuButton = { text: "START DIS GAME 🗣️🗣️‼️‼️",
            onClick: () => {
                return 'start'
            }, 
            x:0, y:0, w:0, h:0 }
    }

    draw() {

        this.hue += this.hueSpeed
        if (this.hue > 360) this.hue -= 360

        const bgColor = `hsl(${this.hue}, 40%, 8%)`
        const bgColorButton = `hsl(${this.hue}, 40%, 16%)`
        const strokeColor = `hsl(${this.hue}, 60%, 50%)`    

        this.pencil.fillStyle = bgColor
        this.pencil.strokeStyle = strokeColor
        this.pencil.lineWidth = 7 * this.scale
        this.pencil.globalAlpha = 0.6

        const boxW = this.canvas.width * 0.4
        const boxH = this.canvas.height * 0.5
        const boxX = this.canvas.width * 0.5 - boxW * 0.5
        const boxY = this.canvas.height * 0.5 - boxH * 0.5

        this.pencil.fillRect(boxX, boxY, boxW, boxH)
        this.pencil.strokeRect(boxX, boxY, boxW, boxH)
        this.pencil.globalAlpha = 1

        this.pencil.font = `${56 * this.scale}px serif`
        this.pencil.fillStyle = '#ffffffd5'

        const title = "THE SPACESHIP SECTIONS IN"
        const subtitle = "GEOMETRY DASH EXCEPT WAY COOLER™"
        const titleWidth = this.pencil.measureText(title).width
        const subtitleWidth = this.pencil.measureText(subtitle).width
        this.pencil.fillText(title, this.canvas.width * 0.5 - titleWidth * 0.5, boxY + 125 * this.scale)
        this.pencil.fillText(subtitle, this.canvas.width * 0.5 - subtitleWidth * 0.5, boxY + 250 * this.scale)

        const btnWidthPadding = 50 * this.scale
        const btnHeight = 68 * this.scale
        const spacing = 70 * this.scale

        this.pencil.font = `${48 * this.scale}px serif`

        let startY = boxY + (275 * this.scale)

        const textWidth = this.pencil.measureText(this.menuButton.text).width
        const bw = textWidth + btnWidthPadding

        const bx = this.canvas.width * 0.5 - bw * 0.5
        const by = startY + (btnHeight + spacing)
        this.menuButton.x = bx
        this.menuButton.y = by
        this.menuButton.w = bw
        this.menuButton.h = btnHeight
        this.pencil.fillStyle = bgColorButton
        this.pencil.fillRect(bx, by, bw, btnHeight)
        this.pencil.strokeStyle = strokeColor
        this.pencil.lineWidth = 4 * this.scale
        this.pencil.strokeRect(bx, by, bw, btnHeight)

        this.pencil.fillStyle = "#ffffffdd"
        this.pencil.fillText(this.menuButton.text, bx + (bw - textWidth) / 2, by + (48 * this.scale))
    }

    click(e) {
        let rect = this.canvas.getBoundingClientRect();
        let mx = e.clientX - rect.left;
        let my = e.clientY - rect.top;

        if (
            mx >= this.menuButton.x &&
            mx <= this.menuButton.x + this.menuButton.w &&
            my >= this.menuButton.y &&
            my <= this.menuButton.y + this.menuButton.h
        ) {
            return this.menuButton.onClick();
        }
    }
}