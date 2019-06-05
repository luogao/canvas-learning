import './index.css'
import { createCanvas } from '../utils'

const modeSelector = document.getElementById('mode')
modeSelector.addEventListener(
  'change',
  function() {
    const val = this.value
    if (val === '1') {
      requestAnimationFrame(draw)
    } else {
      requestAnimationFrame(draw2)
    }
  },
  false
)

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

const audioSourceByUser = (audioCtx, analyser) => {
  if (navigator.getUserMedia) {
    console.log('getUserMedia supported.')
    navigator.getUserMedia(
      // constraints - only audio needed for this app
      {
        audio: true
      },
      // Success callback
      function(stream) {
        const source = audioCtx.createMediaStreamSource(stream)
        source.connect(analyser)
        // analyser.connect(audioCtx.destination);
        if (modeSelector.value === '1') {
          requestAnimationFrame(draw)
        } else {
          requestAnimationFrame(draw2)
        }
      },
      // Error callback
      function(err) {
        console.log('The following gUM error occured: ' + err)
      }
    )
  } else {
    console.log('getUserMedia not supported on your browser!')
  }
}

const W = 500
const H = 500

const canvas = createCanvas(W, H)
const ctx = canvas.getContext('2d')
const myAudio = document.querySelector('audio')

// 获取web audio 上下文对象
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
// 获取声音源
const source = audioCtx.createMediaElementSource(myAudio)
// 获取分析对象
const analyser = audioCtx.createAnalyser()
// 设置
analyser.fftSize = 1024
const bufferLength = analyser.fftSize

const dataArray = new Uint8Array(bufferLength)

// 连接解析器
source.connect(analyser)
// // 输出音频
source.connect(audioCtx.destination)

const draw = () => {
  // 获取当前声音的波形；将当前波形，或者时域数据拷贝进 Uint8Array数组（无符号字节数组）
  analyser.getByteTimeDomainData(dataArray)
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'rgb(200,200,200)'
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = 'rgb(0,0,0)'
  ctx.beginPath()
  const sliceWidth = (W * 1.0) / bufferLength
  let x = 0
  for (let i = 0; i < bufferLength; i++) {
    let v = dataArray[i] / 128.0
    let y = (v * H) / 2
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
    x += sliceWidth
  }
  ctx.lineTo(W, H / 2)
  ctx.stroke()
  requestAnimationFrame(draw)
}

const draw2 = () => {
  // 获取当前频域数据；将当前频域数据拷贝进Uint8Array数组（无符号字节数组）
  analyser.getByteTimeDomainData(dataArray)
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'rgb(0,0,0)'
  ctx.fillRect(0, 0, W, H)

  const barWidth = (W / bufferLength) * 2.5
  let barHeight
  let x = 0

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] 
    ctx.fillStyle = `rgb(${barHeight + 100},${(dataArray[i] * Math.random()) * 10},${(dataArray[i] * Math.random()) * 10})`
    ctx.fillRect(x, H - barHeight, barWidth, barHeight)
    x += barWidth + 1
  }

  requestAnimationFrame(draw2)
}

window.onload = function() {
  audioSourceByUser(audioCtx, analyser)
}
