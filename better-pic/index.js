import './index.css'
import analyze from 'rgbaster'

const SLICE_LENGTH = -1

const canvasForShow = document.getElementById('forshow')
const ctx = canvasForShow.getContext('2d')

const canvasBg = document.getElementById('bg')
const ctxBg = canvasBg.getContext('2d')

const canvasShadow = document.getElementById('shadow')
const ctxShadow = canvasShadow.getContext('2d')
const uploader = document.getElementById('uploader')
const downloader = document.getElementById('downloader')
const container = document.getElementById('color-container')

const outputCanvas = document.createElement('canvas')
const outputCtx = outputCanvas.getContext('2d')

uploader.addEventListener('change', handleUploaderChange)
downloader.addEventListener('click', handleDownload)

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

function initCanvas({ width, height }) {
  canvasForShow.width = width
  canvasForShow.height = height

  canvasBg.width = width * 1.3
  canvasBg.height = height * 1.3

  outputCanvas.width = width * 1.3
  outputCanvas.height = height * 1.3

  canvasShadow.width = width * 1.3
  canvasShadow.height = height * 1.3
}

function drawShadow(color) {
  ctxShadow.clearRect(0, 0, canvasShadow.width, canvasShadow.height)
  ctxShadow.shadowColor = 'rgba(0,0,0,0.6)'
  ctxShadow.shadowBlur = 100
  ctxShadow.shadowOffsetX = 100
  ctxShadow.shadowOffsetY = 100
  ctxShadow.fillStyle = color
  ctxShadow.fillRect(
    (canvasShadow.width - canvasForShow.width) / 2,
    (canvasShadow.height - canvasForShow.height) / 2,
    canvasForShow.width,
    canvasForShow.height
  )
}

function handleUploaderChange() {
  container.innerHTML = 'Loading Color Data ...'
  const fileReader = new FileReader()
  fileReader.readAsDataURL(this.files[0])
  fileReader.onload = function(e) {
    const img = new Image()
    img.src = e.target.result
    img.onload = function(e) {
      const { width, height } = e.target
      initCanvas({ width, height })
      ctx.drawImage(img, 0, 0, width, height)
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

        drawBg(colors[Math.floor(Math.random() * SLICE_LENGTH)].color)
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
  ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height)
  ctxBg.fillStyle = color
  ctxBg.fillRect(0, 0, canvasBg.width, canvasBg.height)
  drawShadow(color)
}

function drawOutputCanvas() {
  outputCtx.clearRect(0, 0, outputCanvas.width, outputCanvas.height)
  outputCtx.drawImage(canvasBg, 0, 0, outputCanvas.width, outputCanvas.height)
  outputCtx.drawImage(canvasShadow, 0, 0, outputCanvas.width, outputCanvas.height)
  outputCtx.drawImage(
    canvasForShow,
    (outputCanvas.width - canvasForShow.width) / 2,
    (outputCanvas.height - canvasForShow.height) / 2,
    canvasForShow.width,
    canvasForShow.height
  )
}
