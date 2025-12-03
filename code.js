import { Game } from "./states/game.js"
import { GameOver } from "./states/gameOver.js"
import { Title } from "./states/title.js"
import { Toolbox } from "./toolbox.js"

let canvas = document.getElementById("myCanvas")
let pencil = canvas.getContext("2d")
let toolbox = new Toolbox()

let game = new Game(canvas, pencil)
let gameOver = new GameOver(canvas, pencil)
let title = new Title(canvas, pencil)

let state = title

function gameLoop() {
    pencil.clearRect(0, 0, canvas.width, canvas.height)

    let cmd = state.update()

    if (cmd == 'title') {state = title}
    if (cmd == 'game') {state = game}
    if (cmd == 'gameOver') {state = gameOver}
    if (cmd == 'gameWon') {state = gameWon}

}
setInterval(gameLoop, 1000 / 60)