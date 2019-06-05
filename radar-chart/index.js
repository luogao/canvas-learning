import './index.css'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const canvas = document.getElementById('canvas')
const bgCanvas = document.createElement('canvas')
const offCanvas = document.createElement('canvas')

const ctx = canvas.getContext('2d')
const bgCtx = bgCanvas.getContext('2d')
const offCtx = offCanvas.getContext('2d')

canvas.width = offCanvas.width = bgCanvas.width = WIDTH
canvas.height = offCanvas.height = bgCanvas.height = HEIGHT

// 雷达图数据
const mData = [
  { titleList: ['爱心传递至', '3个城市'], score: 3, fullScore: 5 },
  { titleList: ['帮助了8人'], score: 5, fullScore: 10 },
  { titleList: [`收到5感谢`], score: 5, fullScore: 10 },
  { titleList: ['获得', '15人点赞'], score: 15, fullScore: 15 },
  { titleList: [`可赠送10件闲置`], score: 10, fullScore: 20 }
]

// 多边形的边数
const mCount = mData.length
// 最外层多边形边长
const prismW = WIDTH * 0.2
// 最外层多边形外接圆半径
const mRadius = prismW / 2 / Math.cos((108 / 2 / 180) * Math.PI)
// 多边形的内角角度
const mAngle = (Math.PI * 2) / mCount
// 需要多少个多边形线框
const polygonCount = 5
const sAngle = (90 / mCount / 180) * Math.PI
// 需要旋转多少度，才能将多边形旋转到底边平行于 X轴，奇多边形才需要，偶多边形不需要旋转
// 主要是为了方便计算坐标
const rotateAngle = mCount % 2 === 0 ? 0 : sAngle * (mCount % 4 === 3 ? -1 : 1)

ctx.strokeStyle = `#${(~~(Math.random() * (1 << 24))).toString(16)}`
ctx.fillStyle = `#fff`
ctx.translate(WIDTH / 2, HEIGHT / 2)
ctx.fillRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT)

bgCtx.strokeStyle = `#${(~~(Math.random() * (1 << 24))).toString(16)}`
bgCtx.fillStyle = `#fff`
bgCtx.translate(WIDTH / 2, HEIGHT / 2)
bgCtx.fillRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT)

offCtx.translate(WIDTH / 2, HEIGHT / 2)
bgCtx.rotate(-rotateAngle)
offCtx.rotate(-rotateAngle)

const polygonPoints = []
const radarVertex = []

drawPolygon()
drawVertexTxt()
drawRadar()
function drawPolygon() {
  // #region 绘制多边形
  const r = mRadius / polygonCount
  let currentRadius = 0
  for (let i = 0; i < polygonCount; i++) {
    bgCtx.beginPath()
    currentRadius = r * (i + 1)
    for (let j = 0; j < mCount; j++) {
      const x = currentRadius * Math.cos(mAngle * j)
      const y = currentRadius * Math.sin(mAngle * j)
      // 记录最外层多边形各个顶点的坐标
      if (i === polygonCount - 1) {
        polygonPoints.push([x, y])
      }
      j === 0 ? bgCtx.moveTo(x, y) : bgCtx.lineTo(x, y)
    }
    bgCtx.closePath()
    bgCtx.stroke()
  }
  // #endregion

  // #region 绘制多边形对角连线
  for (let i = 0; i < polygonPoints.length; i++) {
    bgCtx.moveTo(0, 0)
    bgCtx.lineTo(polygonPoints[i][0], polygonPoints[i][1])
  }
  bgCtx.stroke()
  // #endregion
}

function drawDiagonal() {
  bgCtx.save()
  for (let i = 0; i < polygonPoints.length; i++) {
    bgCtx.moveTo(0, 0)
    bgCtx.lineTo(polygonPoints[i][0], polygonPoints[i][1])
  }
  bgCtx.stroke()
  bgCtx.restore()
}

function drawVertexTxt() {
  bgCtx.font = 'normal normal lighter 16px Arial'
  bgCtx.fillStyle = '#333'
  // 奇数多边形，距离设备顶边最近的点（即最高点的那一点），需要专门设置一下 textAlign
  const topPointIndex = mCount - Math.round(mCount / 4)
  for (let i = 0; i < polygonPoints.length; i++) {
    bgCtx.save()
    bgCtx.translate(polygonPoints[i][0], polygonPoints[i][1])
    bgCtx.rotate(rotateAngle)
    let indentX = 0
    let indentY = 0
    if (i === topPointIndex) {
      // 最高点
      bgCtx.textAlign = 'center'
      indentY = -8
    } else {
      if (polygonPoints[i][0] > 0 && polygonPoints[i][1] >= 0) {
        bgCtx.textAlign = 'start'
        indentX = 10
      } else if (polygonPoints[i][0] < 0) {
        bgCtx.textAlign = 'end'
        indentX = -10
      }
    }
    // 如果是正四边形，则需要单独处理最低点
    if (mCount === 4 && i === 1) {
      bgCtx.textAlign = 'center'
      indentY = 10
    }
    // 开始绘制文案
    mData[i].titleList.forEach((item, index) => {
      bgCtx.fillText(item, indentX, indentY + index * 20)
    })
    bgCtx.restore()
  }
}

// 绘制雷达区域
function drawRadar() {
  let score = null
  let xList = []
  let yList = []
  // 计算并存储雷达区域顶点坐标
  for (let i = 0; i < mCount; i++) {
    // score不能超过 fullScore
    score = Math.min(mData[i].score, mData[i].fullScore)
    xList.push((Math.cos(mAngle * i) * score) / mData[i].fullScore)
    yList.push((Math.sin(mAngle * i) * score) / mData[i].fullScore)
    radarVertex.push([mRadius * xList[i], mRadius * yList[i]])
  }
  // 裁剪选区，比真实的雷达区域大一圈(indentV)，这是为了保证完全遮罩
  const indentV = 40
  offCtx.beginPath()
  for (let i = 0; i < mCount; i++) {
    score = Math.min(mData[i].score, mData[i].fullScore)
    const x = (mRadius + indentV) * xList[i]
    const y = (mRadius + indentV) * yList[i]
    i === 0 ? offCtx.moveTo(x, y) : offCtx.lineTo(x, y)
  }
  offCtx.closePath()
  offCtx.clip()
  const toAngle = 2 * Math.PI
  const canvasMaxSize = Math.max(WIDTH, HEIGHT)
  // 将离屏 canvas上的 雷达图区域画到主 canvas上，用圆来填充，产生视觉上的雷达图逐渐填充的效果
  const ltX = -WIDTH / 2
  const ltY = -HEIGHT / 2
  const rqDraw = currentAngle => {
    ctx.clearRect(ltX, ltY, WIDTH, HEIGHT)
    offCtx.clearRect(ltX, ltY, WIDTH, HEIGHT)
    // #region 绘制雷达区域
    offCtx.beginPath()
    for (let i = 0; i < mCount; i++) {
      i === 0 ? offCtx.moveTo(radarVertex[i][0], radarVertex[i][1]) : offCtx.lineTo(radarVertex[i][0], radarVertex[i][1])
    }
    offCtx.fillStyle = 'rgba(204,0,0,0.3)'
    offCtx.strokeStyle = 'red'
    offCtx.closePath()
    offCtx.stroke()
    offCtx.fill()
    // #endregion

    // #region 绘制覆盖雷达区域的遮罩
    offCtx.save()
    offCtx.beginPath()
    offCtx.globalCompositeOperation = 'destination-in'
    offCtx.moveTo(0, 0)
    offCtx.arc(0, 0, canvasMaxSize, 0, currentAngle)
    offCtx.closePath()
    offCtx.fillStyle = 'blue'
    offCtx.fill()
    offCtx.restore()
    // #endregion
    ctx.drawImage(bgCanvas, ltX, ltY)
    ctx.drawImage(offCanvas, ltX, ltY)
    // 动态雷达图绘制完毕的标识
    if (currentAngle === toAngle) {
      return drawVertexDot()
    }
    let newAngle = currentAngle + 0.25
    if (newAngle > toAngle) newAngle = toAngle
    // requestAnimationFrame(() => {
    //   rqDraw(newAngle)
    // })
    setTimeout(() => {
      rqDraw(newAngle)
    }, 16)
  }
  rqDraw(0)
}

// 雷达图绘制结束后，在雷达区域的顶点处绘制小圆点
function drawVertexDot() {
  ctx.rotate(-rotateAngle)
  ctx.fillStyle = '#fe5c5b'
  const dotRadius = 4
  const len = radarVertex.length
  // 画点
  const rqDrawDox = currentDotRadius => {
    for (let i = 0; i < len; i++) {
      ctx.beginPath()
      ctx.arc(radarVertex[i][0], radarVertex[i][1], currentDotRadius, 0, 2 * Math.PI)
      ctx.fill()
    }
    if (currentDotRadius < dotRadius) {
      requestAnimationFrame(() => {
        rqDrawDox(currentDotRadius + 0.5)
      })
    }
  }
  rqDrawDox(1)
}

const animation = () => {
  // requestAnimationFrame(animation)
  bgCtx.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT)
  bgCtx.fillRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT)
  bgCtx.strokeStyle = `#${(~~(Math.random() * (1 << 24))).toString(16)}`
  mRadius += 10
  polygonCount += 1
  mCount += 1
  mAngle += 0.01
  drawPolygon()
}
