import './index.css'

import { createCanvas } from '../utils'

const W = 500
const H = 500
const speed = .1
const canvas = createCanvas(W, H)
const ctx = canvas.getContext('2d')
const colors = ['#DBB77A', '#BF8F3B']

let offsetX = 0
let isCircle = false

ctx.lineWidth = 1

// y=Asin(ωx+φ)+k

// A 振幅

// (ωx+φ) 相位，反映变量y所处的状态

// φ 初相，x=0时的相位；反映在坐标系上则为图像的左右移动

// k 偏距，反映在坐标系上则为图像的上移或下移

// ω 角速度， 控制正弦周期(单位弧度内震动的次数)
const drawSin = function (ctx, offsetX) {
  const startX = 0
  const waveH = 8
  const interval = .1
  const initOffsetY = .2 * H
  const points = []
  ctx.beginPath()
  for (let x = startX; x < startX + W; x += 20 / W) {
    const y = waveH * Math.sin(interval * x + offsetX) + initOffsetY
    points.push([x, y])
    ctx.lineTo(x, y)
  }
  ctx.lineTo(W, H)
  ctx.lineTo(startX, H)
  ctx.lineTo(points[0][0], points[0][1])
  ctx.fillStyle = getChartColor(ctx)
  ctx.fill()
}

const getChartColor = function (ctx) {
  const radius = W / 2;
  const grd = ctx.createLinearGradient(radius, radius, radius, H);
  grd.addColorStop(0, colors[0]);
  grd.addColorStop(1, colors[1]);
  return grd;
}

const drawCircle = function () {
  const r = W / 2
  const rc = r - 6
  ctx.lineWidth = 5
  ctx.strokeStyle = '#fff'
  ctx.beginPath()
  ctx.arc(r, r, rc, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.clip()
  isCircle = true
}

const draw = function () {
  ctx.clearRect(0, 0, W, H)
  offsetX += speed
  if (!isCircle) {
    drawCircle()
  }
  drawSin(ctx, offsetX)
  requestAnimationFrame(draw)
}

window.onload = function () {
  requestAnimationFrame(draw)
}