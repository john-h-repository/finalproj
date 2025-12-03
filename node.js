import { Game } from "./states/game.js"
import { GameOver } from "./states/gameOver.js"
import { Title } from "./states/title.js"
import { Toolbox } from "./toolbox.js"
import { star } from "./visuals/star.js";

let canvas = document.getElementById("myCanvas")
let pencil = canvas.getContext("2d")
let toolbox = new Toolbox()

let game = new Game(canvas, pencil)
let gameOver = new GameOver(canvas, pencil)
let title = new Title(canvas, pencil)

let state = title

let stars = [

]

for (let i = 0; i < 20; i++) {
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
    let last = performance.now()
    let now = performance.now()
    let delta = (now - last) / 16.666
    last = now
    for (let i of stars) {
        i.draw(Math.random()*(7-2.5)+2.5, delta)
        requestAnimationFrame(animate)
        pencil.closePath()
        console.log(stars.length)
    }
}
setInterval(gameloop, 1000/60)

// let last = performance.now()

// function animate() {
//     let now = performance.now()
//     let delta = (now - last) / 16.666
//     last = now

//     stars.forEach(s => s.draw(Math.random()*(7-2.5)+2.5, delta))
//     requestAnimationFrame(animate)
// }