const jsfeat = require('./lib/jsfeat-min')
import { createCanvas } from '../utils'
const targetImg = document.getElementById('img')
const canvas = createCanvas()

const image2line = (img, options) => {
  const maxWidth = 300
  const maxHeight = 300
  options = options || {};
  // 可选参数
  const blur_radius = options.blur_radius || 2
  const low_threshold = options.low_threshold || 20
  const high_threshold = options.high_threshold || 50
  const originWidth = img.naturalWidth || img.width
  const originHeight = img.naturalHeight || img.height
  let width = originWidth
  let height = originHeight

  if (originWidth > maxWidth || originHeight > maxHeight) {
    if (originWidth / originHeight > maxWidth / maxHeight) {
      width = maxWidth
      height = Math.round(maxWidth * (originHeight / originWidth))
    } else {
      height = maxHeight
      width = Math.round(maxHeight * (originWidth / originHeight))
    }
  }
  canvas.width = img.width = width
  canvas.height = img.height = height
  
  const context = canvas.getContext('2d')

  context.clearRect(0, 0, width, height)
  context.drawImage(img, 0, 0, width, height)
  const imageData = context.getImageData(0, 0, width, height)
  const img_u8 = new jsfeat.matrix_t(width, height, jsfeat.U8C1_t)
  jsfeat.imgproc.grayscale(imageData.data, width, height, img_u8)
  const kernelSize = (blur_radius + 1) * 2
  jsfeat.imgproc.gaussian_blur(img_u8, img_u8, kernelSize, 0)
  jsfeat.imgproc.canny(img_u8, img_u8, low_threshold, high_threshold)
  const data_u32 = new Uint32Array(imageData.data.buffer)
  const alpha = (0xff << 24)
  let i = img_u8.cols * img_u8.rows, pix = 0

  while (--i >= 0) {
    pix = 255 - img_u8.data[i]
    data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix
  }
  context.putImageData(imageData, 0, 0)
}

targetImg.addEventListener('load', function () {
  image2line(targetImg)
})

window.onload = function (e) {
  image2line(targetImg)
}

// 选择本地图片的处理
const reader = new FileReader();
// 文件base64化，以便获知图片原始尺寸
reader.onload = function (event) {
  targetImg.src = event.target.result;
};
// 选择的文件对象
let file = null;
document.getElementById('input').addEventListener('change', function (event) {
  file = event.target.files[0];
  // 选择的文件是图片
  if (file.type.indexOf("image") == 0) {
    reader.readAsDataURL(file);
  }
});