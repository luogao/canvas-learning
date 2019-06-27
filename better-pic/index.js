import './index.css'
import analyze from 'rgbaster'

const SLICE_LENGTH = -1
let scale = 0.9
let canvasWidth = 0
let canvasHeight = 0

let imgPositionTop = 0
let imgPositionLeft = 0

let imgToDraw = null

const canvasForShow = document.getElementById('forshow')
const ctx = canvasForShow.getContext('2d')

const canvasBg = document.getElementById('bg')
const ctxBg = canvasBg.getContext('2d')

const canvasShadow = document.getElementById('shadow')
const ctxShadow = canvasShadow.getContext('2d')

const uploader = document.getElementById('uploader')
const downloader = document.getElementById('downloader')
const scaleControl = document.getElementById('img-scale')
const container = document.getElementById('color-container')

const outputCanvas = document.createElement('canvas')
const outputCtx = outputCanvas.getContext('2d')

uploader.addEventListener('change', handleUploaderChange)
downloader.addEventListener('click', handleDownload)
scaleControl.addEventListener('change', handleScaleChange)

function handleScaleChange(e) {
  scale = Number(e.target.value)
  drawImg(imgToDraw)
}
function handleDownload() {
  drawOutputCanvas()
  downloadFile(generate(), getImgSrc(outputCanvas))
}

function base64Img2Blob(code) {
  var parts = code.split(';base64,')
  var contentType = parts[0].split(':')[1]
  var raw = window.atob(parts[1])
  var rawLength = raw.length

  var uInt8Array = new Uint8Array(rawLength)

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}

function getImgSrc(canvas) {
  const dataUrl = canvas.toDataURL('image/png')
  return dataUrl
}

function generate() {
  const logoMarker = 'BP'
  const date = new Date().toLocaleDateString()
  return `${logoMarker}-${date}`
}

function downloadFile(fileName, content) {
  var aLink = document.createElement('a')
  var blob = base64Img2Blob(content) //new Blob([content]);
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

function initCanvas() {
  canvasForShow.width = canvasBg.width = canvasShadow.width = outputCanvas.width = canvasWidth
  canvasForShow.height = canvasBg.height = canvasShadow.height = outputCanvas.height = canvasHeight
}

function drawShadow() {
  ctxShadow.clearRect(0, 0, canvasWidth, canvasHeight)
  ctxShadow.shadowColor = 'rgba(0,0,0,0.6)'
  ctxShadow.shadowBlur = 100
  ctxShadow.shadowOffsetX = 100
  ctxShadow.shadowOffsetY = 100
  ctxShadow.fillRect(imgPositionLeft, imgPositionTop, canvasWidth * scale, canvasHeight * scale)
}

function drawImg(img) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  imgPositionLeft = (canvasWidth - canvasWidth * scale) / 2
  imgPositionTop = (canvasHeight - canvasHeight * scale) / 2
  ctx.drawImage(img, imgPositionLeft, imgPositionTop, canvasWidth * scale, canvasHeight * scale)
  drawShadow()
}

function handleUploaderChange() {
  container.innerHTML = 'Loading Color Data ...'
  const fileReader = new FileReader()
  fileReader.readAsDataURL(this.files[0])
  fileReader.onload = function(e) {
    const img = new Image()
    img.src = e.target.result
    imgToDraw = img
    img.onload = function(e) {
      const { width, height } = e.target
      canvasWidth = width
      canvasHeight = height

      initCanvas()
      drawImg(imgToDraw)

      analyze(img.src, { scale: 0.1 }).then(res => {
        const fullColors = res
        const colors = fullColors.slice(0, SLICE_LENGTH)
        container.innerHTML = ''
        colors.forEach(item => {
          const node = document.createElement('span')
          node.setAttribute('data-color', item.color)
          node.style.cssText = `width: 50px;height:50px;background-color: ${item.color}`
          container.appendChild(node)
        })

        drawBg(colors[Math.floor(Math.random() * colors.length)].color)
      })
    }
  }
}

container.addEventListener('click', function(e) {
  const target = e.target
  if (target.nodeName === 'SPAN') {
    drawBg(target.dataset.color)
  }
})

function drawBg(color) {
  ctxBg.clearRect(0, 0, canvasWidth, canvasHeight)
  ctxBg.fillStyle = color
  ctxBg.fillRect(0, 0, canvasWidth, canvasHeight)
}

function drawOutputCanvas() {
  outputCtx.clearRect(0, 0, canvasWidth, canvasHeight)
  outputCtx.drawImage(canvasBg, 0, 0, canvasWidth, canvasHeight)
  outputCtx.drawImage(canvasShadow, 0, 0, canvasWidth, canvasHeight)
  outputCtx.drawImage(canvasForShow, 0, 0, canvasWidth, canvasHeight)
}
