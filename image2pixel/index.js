window.onload = () => {
  draw()
}

let scale = 0.15

const draw = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.src = drawTempCanvas()
  img.onload = () => {
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, img.width / scale, img.height / scale)
  }
}

const drawTempCanvas = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = document.getElementById('img')
  const W = canvas.width = img.width
  const H = canvas.height = img.height
  ctx.drawImage(img, 0, 0, W * scale, H * scale)
  getImageData(canvas, ctx)
  return canvas.toDataURL()
}

const getImageData = (canvas, ctx) => {
  const { width, height } = canvas
  const imageData = ctx.getImageData(0, 0, width, height)
  const { data } = imageData
  grayscale(data)
  ctx.putImageData(imageData, 0, 0)
}

const grayscale = data => {
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]
    data[i] = data[i + 1] = data[i + 2] = (r + g + b) / 5
  }
}