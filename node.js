import { star } from "./visuals/star.js";
import { player } from "./elements/player.js";
import { asteroid } from "./elements/asteroid.js";
import { menu02 } from "./visuals/gameover.js";

let canvas = document.getElementById("myCanvas")
let pencil = canvas.getContext("2d")
let pressed = {};

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// so the ui doesnt get completely screwed up when this is inevitably played on 1080p
let scale = canvas.height / 1440

let plr = new player(canvas, pencil, pressed)
let deathScreen = new menu02(canvas, pencil, scale)
let stars = []
let asteroids = []

let rate = 0.02
let baserate = 0.02
let sizerate = 100
let speedrate = 5

let dead = true

let scaler

for (let i = 0; i < 1000; i++) {
    stars.push(new star(canvas, pencil))
}

function setup() {
    rate = 0.02
    baserate = 0.02
    sizerate = 100
    speedrate = 5
    plr.draw(dead, true)
    dead = false

    //asteroid difficulty increaser
    scaler = setInterval(() => {
    if (dead == false) {
        baserate += 0.0065
        sizerate += 7
        speedrate += .75
        
        if (baserate >= 0.09)  baserate = 0.09
        if (sizerate >= 200) sizerate = 200
        if (speedrate >= 12) speedrate = 12

        console.warn('rate increase! spawnrate:', baserate, ', sizerate:', sizerate, 'speedrate:', speedrate)
    }
}, 15000)
}

function update() {
    pencil.clearRect(0, 0, canvas.width, canvas.height)
    pencil.fillStyle = "black"
    pencil.fillRect(0, 0, canvas.width, canvas.height)

    for (let s of stars) s.draw()

    plr.move(dead)
    plr.draw(dead)

    if (Math.random() <rate) {spawnAsteroid(); rate = baserate} else {rate+=0.0001}

    for (let a of asteroids) {
        a.asteroid()

        if (plr.collidesWithAsteroid(a) && dead == false) {
            console.log("u died lol")
            clearInterval(scaler)   
            dead = true
        }
    }

    if (dead == true) deathScreen.draw()
    asteroids = asteroids.filter(a => a.x + a.rad > 0)
}

function spawnAsteroid() {
    const size = 50 + Math.random() * sizerate
    const speedX = -5 - Math.random() * speedrate
    const a = new asteroid(canvas, pencil, size, speedX)
    asteroids.push(a)
}

// for score thing idk: 60 * 5/3


// originally sourced it from stackoverflow but chatgpt tweaked it to
// make it not the choppiest thing ever when its not properly timed to framerate
const step = 1000 / 60
let accumulator = 0
let last = performance.now()

function loop(now) {

    requestAnimationFrame(loop)

    let delta = now - last
    last = now

    if (delta > 100) delta = 100

    accumulator += delta

    while (accumulator >= step) {
        update()
        accumulator -= step
    }
}
requestAnimationFrame(loop)



canvas.addEventListener("click", (e) => {
    if (!dead) return;
    let result = deathScreen.click(e)
    console.log(result);

    if (result == "restart") {
        setup(); // or whatever your logic is
    }
    
});
window.addEventListener("keydown", function(e) {
    pressed[e.key.toLowerCase()] = true
})
window.addEventListener("keyup", function(e) {
    pressed[e.key.toLowerCase()] = false
})
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
document.addEventListener("fullscreenchange", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})