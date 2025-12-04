import { Game } from "./states/game.js"
import { GameOver } from "./states/gameOver.js"
import { Title } from "./states/title.js"
import { Toolbox } from "./toolbox.js"
import { star } from "./visuals/star.js";
import { player } from "./elements/player.js";

let canvas = document.getElementById("myCanvas")
let pencil = canvas.getContext("2d")
let toolbox = new Toolbox()
let pressed = {};

let game = new Game(canvas, pencil)
let gameOver = new GameOver(canvas, pencil)
let title = new Title(canvas, pencil)
let plr = new player(canvas, pencil, pressed)

let state = title

let stars = []


for (let i = 0; i < 0; i++) {
    let lol = stars.push(new star(canvas, pencil))
}

function gameloop() {
    let cmd = state.update()

    if (cmd == 'title') {state = title}
    if (cmd == 'game') {state = game}
    if (cmd == 'gameOver') {state = gameOver}
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    pencil.beginPath()
    pencil.clearRect(0, 0, window.innerWidth, window.innerHeight)
    pencil.fillStyle = "black"
    pencil.fillRect(0, 0, window.innerWidth, window.innerHeight)

    for (let i of stars) {
        i.draw(Math.random()*(4-1)+1)

        pencil.closePath()
    }
    plr.move()
    plr.draw()
    requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)

window.addEventListener("keydown", function(e) {
    pressed[e.key.toLowerCase()] = true
})
window.addEventListener("keyup", function(e) {
    pressed[e.key.toLowerCase()] = false
})