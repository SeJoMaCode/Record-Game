let c;
let ctx;

window.onload = init;

function init(){
    c = document.querySelector('canvas')
    ctx = c.getContext('2d')
    resize()

    rx = random(0, c.width-40)
    rw = random(40, 75)
    h = getHighScore()

    window.requestAnimationFrame(gameLoop)
}

function gameLoop(timeStamp){
    window.onresize = resize()

    draw()

    window.requestAnimationFrame(gameLoop)
}

function resize(){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

function getHighScore(){
    let cookie = document.cookie
    for(let i = 0; i < cookie.length; i++){
        if(cookie[i] === 'h' && cookie[i+1] === '='){
            let v = ''
            for(let j = i+2; j<cookie.length; j++){
                v+=cookie[j]
            }
            return v
        }
    }
    return 0
}

let x = 0
let d = 1
let s = 5
let b = 0
let rx
let rw
let h
let m = 0

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('click', flip => {
    d*=-1
    if(x >= rx && x <= rx+rw){
        b++
        m=0
        if(s < 20){
            s+=1
        }
        rx = random(0, c.width-40)
        rw = random(40, 75)
        if(b > h){
            h=b
        }
        document.cookie = `h=${h}`
    } else {
        m++
        if(m > 5){
            rx = random(0, c.width-40)
            rw = random(40, 75)
            b=0
            m=0
            s=5
        }
    }

})


function draw(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, c.width, c.height)

    ctx.fillStyle = 'red'
    ctx.fillRect(rx, 0, rw, c.height)

    if(x > c.width){
        d*=-1
        x = c.width
    } else if( x < 0){
        d*=-1
        x = 0
    }
    ctx.fillStyle = 'green'
    ctx.fillRect(x, 0, 5, c.height)
    ctx.font = 'bold 20px Verdana'
    ctx.fillText(`CURRENT SCORE: ${b}`, 20, 50)
    ctx.fillText(`HIGHSCORE: ${h}`, 20, 80)
    ctx.fillText(`MISSES: ${m}`, 20, 110)
    ctx.fillText(`SPEED: ${s}`, 20, 140)
    x+=s*d
}