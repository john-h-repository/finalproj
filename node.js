import { star } from "./visuals/star.js";
import { player } from "./elements/player.js";
import { asteroid } from "./elements/asteroid.js";

let canvas = document.getElementById("myCanvas")
let pencil = canvas.getContext("2d")
let pressed = {};

let plr = new player(canvas, pencil, pressed)
let stars = []
let asteroids = []

// so the ui doesnt get completely screwed up when this is inevitably played on 1080p
let baseH = 1440
let scale = canvas.height / baseH

let rate = 0.02
let baserate = 0.02
let sizerate = 100
let speedrate = 5

let dead = false

for (let i = 0; i < 1000; i++) {
    stars.push(new star(canvas, pencil))
}

function spawnAsteroid() {
    const size = 50 + Math.random() * sizerate
    const speedX = -5 - Math.random() * speedrate
    const a = new asteroid(canvas, pencil, size, speedX)
    asteroids.push(a)
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

        if (plr.collidesWithAsteroid(a)) {
            console.log("u died lol")    
            dead = true
        }
    }

    if (dead == true) deathScreen()
    
    asteroids = asteroids.filter(a => a.x + a.rad > 0)
}

let deathButtons = [
    { text: "try AGAIN !!",
    onClick: () => {
        console.log("MENU CLICKED")
    }, 
    x:0, y:0, w:0, h:0 },

    { text: "back 2 menu",    onClick: () => console.log("MENU CLICKED"),    x:0, y:0, w:0, h:0 }
]
function deathScreen() {
    const scale = canvas.height / 1440

    pencil.fillStyle = '#141414ff'
    pencil.strokeStyle = '#585858ff'
    pencil.lineWidth = 7 * scale
    pencil.globalAlpha = 0.6

    const boxW = canvas.width * 0.25
    const boxH = canvas.height * 0.5
    const boxX = canvas.width * 0.5 - boxW * 0.5
    const boxY = canvas.height * 0.5 - boxH * 0.5

    pencil.fillRect(boxX, boxY, boxW, boxH)
    pencil.strokeRect(boxX, boxY, boxW, boxH)
    pencil.globalAlpha = 1

    pencil.font = `${64 * scale}px serif`
    pencil.fillStyle = '#ffffffd5'

    const title = "you died... 💔"
    const titleWidth = pencil.measureText(title).width
    pencil.fillText(title, canvas.width * 0.5 - titleWidth * 0.5, boxY + 150 * scale)

    const btnWidthPadding = 50 * scale
    const btnHeight = 68 * scale
    const spacing = 70 * scale

    pencil.font = `${48 * scale}px serif`

    let startY = boxY + 275 * scale

    deathButtons.forEach((btn, i) => {
        const textWidth = pencil.measureText(btn.text).width
        const bw = textWidth + btnWidthPadding

        const bx = canvas.width * 0.5 - bw * 0.5
        const by = startY + i * (btnHeight + spacing)

        btn.x = bx
        btn.y = by
        btn.w = bw
        btn.h = btnHeight

        pencil.fillStyle = "#262626cc"
        pencil.fillRect(bx, by, bw, btnHeight)

        pencil.strokeStyle = "#585858"
        pencil.lineWidth = 4 * scale
        pencil.strokeRect(bx, by, bw, btnHeight)

        pencil.fillStyle = "#ffffffdd"
        pencil.fillText(btn.text, bx + (bw - textWidth) / 2, by + 48 * scale)
    })
}



// for score thing idk: 60 * 5/3

setInterval(() => {
    if (dead == false) {
        baserate += 0.005
        sizerate += 7
        speedrate += .75
        
        if (baserate >= 0.09)  baserate = 0.09
        if (sizerate >= 200) sizerate = 200
        if (speedrate >= 12) speedrate = 12

        console.warn('rate increase! spawnrate:', baserate, ', sizerate:', sizerate, 'speedrate:', speedrate)
    }
}, 15000);

// dont even ask me how this works. chatgpt does tickspeed logic when i dont have the time to
const FIXED_STEP = 1000 / 60
let accumulator = 0
let last = performance.now()

function loop(now) {

    requestAnimationFrame(loop)

    let delta = now - last
    last = now

    if (delta > 100) delta = 100

    accumulator += delta

    while (accumulator >= FIXED_STEP) {
        update()
        accumulator -= FIXED_STEP
    }
}
requestAnimationFrame(loop)



canvas.addEventListener("click", (e) => {
    if (!dead) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (let btn of deathButtons) {
        if (
            mx >= btn.x &&
            mx <= btn.x + btn.w &&
            my >= btn.y &&
            my <= btn.y + btn.h
        ) {
            btn.onClick();
        }
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
canvas.width = window.innerWidth
canvas.height = window.innerHeight