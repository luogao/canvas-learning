import './index.css'
import downloadFile from './lib/downloadCanvas'

const CANVAS_SIZE = 600
const step = 20

const colorArr = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffd369', '#e26241', '#940a37', '#5b0909', '#00818a', '#ec9b3b']
const randomColor = `#${(~~(Math.random() * (1 << 24))).toString(16)}`
const canvas = document.getElementById('canvas')
const saveBtn = document.getElementById('save-btn')

const ctx = canvas.getContext('2d')
canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

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
  } else {
    saveBtn.style.display = 'initial'
  }
}

const drawImmediately = (step) => {
  for (let x = 0; x < CANVAS_SIZE; x += step) {
    for (let y = 0; y < CANVAS_SIZE; y += step) {
      ctx.fillStyle = colorArr[Math.floor(Math.random() * colorArr.length)]
      ctx.fillRect(x, y, step, step)
    }
  }
  saveBtn.style.display = 'initial'
}

const handleDownload = () => {
  console.log('??')
  downloadFile('good-lucky', canvas)
}


window.onload = function() {
  saveBtn.style.display = 'none'
  saveBtn.addEventListener('click', handleDownload)
  // draw()
  drawImmediately(step)
}
