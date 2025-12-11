import { star } from "./visuals/star.js";
import { player } from "./elements/player.js";
import { asteroid } from "./elements/asteroid.js";
import { menu02 } from "./visuals/gameover.js";
import { menu01 } from "./visuals/menu.js";

let canvas = document.getElementById("myCanvas")
let pencil = canvas.getContext("2d")
let pressed = {}
let state = 'menu'

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// so the ui doesnt get completely screwed up when this is inevitably played on 1080p
let scale = canvas.height / 1440

let plr = new player(canvas, pencil, pressed)
let startScreen = new menu01(canvas, pencil, scale)
let deathScreen = new menu02(canvas, pencil, scale)
let stars = []
let asteroids = []

let rate = 0.02
let baserate = 0.02
let sizerate = 100
let speedrate = 5

let hue = 0
let hueSpeed = 0.5  

let dead = false
let started = false

let scaler
let highScore

let score = 0

for (let i = 0; i < 750; i++) {
    stars.push(new star(canvas, pencil))
}

const skybox = new Image()
skybox.src = './textures/skybox.png'
let skyboxX = 0
let skyboxSpeed = .5

function drawSkybox() {
    if (!skybox.complete) return

    const imgH = canvas.height
    const imgW = skybox.width * (canvas.height / skybox.height)

    pencil.save()
    pencil.globalAlpha = 0.7

    let x = -skyboxX
    while (x < canvas.width) {
        pencil.drawImage(skybox, x, 0, imgW, imgH)
        x += imgW
    }

    pencil.restore()
    
    skyboxX += skyboxSpeed
    if (skyboxX >= imgW) skyboxX -= imgW
}


function setup() {
    rate = 0.02
    baserate = 0.02
    sizerate = 100
    speedrate = 5
    score = 0
    plr.draw(dead, true)
    asteroids = []
    state = 'game'
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

    highScore = setInterval(() => {
        if (dead == false) {
           score+=1
        }
    }, 1000)
}

function update() {
    pencil.clearRect(0, 0, canvas.width, canvas.height)
    pencil.fillStyle = "black"
    pencil.fillRect(0, 0, canvas.width, canvas.height)

    drawSkybox()

    for (let s of stars) s.draw()

    if (started == true) {
        plr.move(dead)
        plr.draw(dead)

        hue += hueSpeed
        if (hue > 360) hue -= 360

        const hsColor = `hsl(${hue}, 80%, 50%)` 

        pencil.font = `${64 * scale}px serif`
        pencil.fillStyle = hsColor
        const titleWidth = pencil.measureText(score).width
        pencil.fillText(score, canvas.width * 0.5 - titleWidth * 0.5, canvas.height * 0.05)

        if (Math.random() <rate) {spawnAsteroid(); rate = baserate} else {rate+=0.0001}

        for (let a of asteroids) {
            a.asteroid()
            
            if (plr.collidesWithAsteroid(a) && dead == false) {
                console.log("u died lol")
                clearInterval(scaler)
                clearInterval(highScore)
                dead = true
            }
        }
        
        if (dead == true) deathScreen.draw(score)
        asteroids = asteroids.filter(a => a.x + a.rad > 0)
    }
    if (started == false) startScreen.draw()
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
    let result = startScreen.click(e)
        console.log(result)
    if (result == "start") {
        setup()
        started = true
    }
    let result1 = deathScreen.click(e)
    console.log(result1)

    if (result1 == "restart") {
        setup()
        deathScreen.isHS = false
    }
    if (result1 == "menu") {
        started = false
        deathScreen.isHS = false
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