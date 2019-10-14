import './index.css'

const CANVAS_SIZE = 600
const step = 1

const colorArr = ['#003f5c', '#58508d', '#bc5090', '#ff6361']
const randomColor = `#${(~~(Math.random() * (1 << 24))).toString(16)}`
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

// for (let x = 0; x < CANVAS_SIZE; x += 5) {
//   for (let y = 0; y < CANVAS_SIZE; y += 5) {
//     ctx.fillStyle = `#${(~~(Math.random() * (1 << 24))).toString(16)}`
//     ctx.fillRect(x, y, 5, 5)
//   }
// }

let x = 0
let y = 0

const draw = () => {
  ctx.fillStyle = colorArr[Math.floor(Math.random() * colorArr.length)]
  ctx.fillRect(x, y, step, step)
  x += step

  if (x === CANVAS_SIZE) {
    y += step
    x = 0
  }
  if (x < CANVAS_SIZE && y < CANVAS_SIZE) {
    requestAnimationFrame(draw)
  }
}

draw()
