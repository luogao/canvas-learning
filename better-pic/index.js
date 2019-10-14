import './index.css'
import analyze from 'rgbaster'
import downloadFile from './utils/downloadCanvas'

const SLICE_LENGTH = -1
let scale = 0.9
let canvasWidth = 0
let canvasHeight = 0
let showVisible = false

let imgPositionTop = 0
let imgPositionLeft = 0
let shadowColor = 'rgba(0,0,0,0.6)'
let shadowBlur = 100
let shadowOffsetX = 100
let shadowOffsetY = 100

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
const shadowVisibleControl = document.getElementById('shadow-visible')
const shadowColorControl = document.getElementById('shadow-color')
const shadowBlurControl = document.getElementById('shadow-blur')
const shadowOffsetXControl = document.getElementById('shadow-offset-x')
const shadowOffsetYControl = document.getElementById('shadow-offset-y')
const container = document.getElementById('color-container')
const shadowControl = document.getElementById('shadow-control')

const outputCanvas = document.createElement('canvas')
const outputCtx = outputCanvas.getContext('2d')

uploader.addEventListener('change', handleUploaderChange)
downloader.addEventListener('click', handleDownload)
scaleControl.addEventListener('change', handleScaleChange)
shadowVisibleControl.addEventListener('change', hanldeShadowVisibleChange)
shadowColorControl.addEventListener('change', handleShadowColorChange)
shadowBlurControl.addEventListener('change', handleShadowBlurChange)
shadowOffsetXControl.addEventListener('input', handleShadowOffsetXChange)
shadowOffsetYControl.addEventListener('input', handleShadowOffsetYChange)

function hanldeShadowVisibleChange(e) {
  showVisible = e.target.checked
  if (showVisible) {
    showShadowSetting()
  } else {
    hideShadowSetting()
  }
  drawShadow()
}

function showShadowSetting() {
  shadowControl.style.display = 'flex'
}
function hideShadowSetting() {
  shadowControl.style.display = 'none'
}

function handleShadowOffsetXChange(e) {
  shadowOffsetX = Number(e.target.value)
  drawShadow()
}

function handleShadowOffsetYChange(e) {
  shadowOffsetY = Number(e.target.value)
  drawShadow()
}

function handleShadowBlurChange(e) {
  const blur = Number(e.target.value)
  shadowBlur = blur
  drawShadow()
}

function handleScaleChange(e) {
  scale = Number(e.target.value)
  drawImg(imgToDraw)
}

function handleShadowColorChange(e) {
  shadowColor = e.target.value
  drawShadow()
}

function handleDownload() {
  drawOutputCanvas()
  downloadFile(generate(), outputCanvas)
}

function generate() {
  const logoMarker = 'BP'
  const date = new Date().toLocaleDateString()
  return `${logoMarker}-${date}`
}

function initCanvas() {
  canvasForShow.width = canvasBg.width = canvasShadow.width = outputCanvas.width = canvasWidth
  canvasForShow.height = canvasBg.height = canvasShadow.height = outputCanvas.height = canvasHeight
}

function drawShadow() {
  ctxShadow.clearRect(0, 0, canvasWidth, canvasHeight)
  if (showVisible) {
    ctxShadow.shadowColor = shadowColor
    ctxShadow.shadowBlur = shadowBlur
    ctxShadow.shadowOffsetX = shadowOffsetX
    ctxShadow.shadowOffsetY = shadowOffsetY
    ctxShadow.fillRect(imgPositionLeft, imgPositionTop, canvasWidth * scale, canvasHeight * scale)
  }
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

        const node = document.createElement('span')
        node.setAttribute('data-color', '#fff')
        node.style.cssText = `width: 50px;height:50px;background-color: #fff`
        container.prepend(node)

        // drawBg(colors[Math.floor(Math.random() * colors.length)].color)
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
  showVisible && outputCtx.drawImage(canvasShadow, 0, 0, canvasWidth, canvasHeight)
  outputCtx.drawImage(canvasForShow, 0, 0, canvasWidth, canvasHeight)
}
