import './index.css'


const canvas = document.getElementById('wall-paper')
const imgToShow = document.getElementById('img-to-show')
const ctx = canvas.getContext('2d')
const text = '坐直'
const letterSpacing = 80
const fontSize = 150

canvas.style.letterSpacing = `${letterSpacing}px`
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const W = canvas.width
const H = canvas.height

ctx.beginPath()

ctx.rect(0, 0, W, H)

ctx.fillStyle = '#feda46'

ctx.fill()

ctx.save()
ctx.fillStyle = "black"
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.font = `${fontSize}px system-ui`
ctx.fillText(text, (W + letterSpacing) / 2, H / 2)

ctx.restore()

// const imgSrc = canvas.toDataURL('image/png')
// imgToShow.src = imgSrc