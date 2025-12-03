export class Title {

    canvas
    pencil

    constructor(canvas, pencil) {
        this.canvas = canvas
        this.pencil = pencil
    }

    update() {
        this.pencil.fillRect(10,10,10,10)
    }


}