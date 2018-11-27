import './index.css'
import Rule from './rule'
import { captureMouse } from '../utils'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const W = canvas.width
const H = canvas.height
const centerX = W / 2
const centerY = H / 2
const ruleX = centerX
const ruleY = 100

let isMouseDown = false
let oldX = 0
let mouse = captureMouse(canvas)
let offsetX = 0
let speed = 0,
  fl = 0.95

const rule = new Rule({
  x: ruleX,
  y: ruleY,
  min: 500,
  max: 100000,
  width: 5000,
  color: '#fff',
  step: 1000,
  markShort: 5,
  markLong: 12,
  textHeight: 5,
  lineBottom: {
    mx: 0,
    my: ruleY,
    lx: W,
    ly: ruleY,
    color: '#fff'
  },
  lineRed: {
    mx: centerX,
    my: 40,
    lx: centerX,
    ly: ruleY + 6,
    color: 'red'
  },
  currentValueStyle: {
    x: centerX,
    y: 20
  }
})

rule.x = centerX - rule.min / rule.ratioScale
const input = document.getElementById('record')

let money = (rule.currentValue = input.value = rule.min)
let start = rule.x
let end = rule.width

rule.draw(ctx)

input.onblur = function(e) {
  money = +this.value
  if (rule.min <= money && money <= rule.max) {
    input.value = money
    rule.currentValue = money
    rule.x = centerX - money / rule.ratioScale
  } else {
    checkBountry()
    input.value = money
    rule.currentValue = money
  }
}

canvas.addEventListener(
  'mousedown',
  function() {
    canvas.style.cursor = 'grabbing'
    isMouseDown = true
    offsetX = mouse.x - rule.x
    oldX = rule.x
    canvas.addEventListener('mouseup', onMouseUp, false)
    canvas.addEventListener('mousemove', onMouseMove, false)
  },
  false
)

function onMouseUp() {
  isMouseDown = false
  canvas.style.cursor = 'default'
  canvas.removeEventListener('mouseup', onMouseUp, false)
  canvas.removeEventListener('mousemove', onMouseMove, false)
}

function onMouseMove() {
  rule.x = mouse.x - offsetX
  money = Math.floor((centerX - rule.x) * rule.ratioScale)

  speed = rule.x - oldX
  oldX = rule.x

  checkBountry()
  input.value = money

  rule.currentValue = money
}

function checkBountry() {
  if (money <= rule.min) {
    rule.x = start
    money = rule.min
  }

  if (money >= rule.max) {
    rule.x = centerX - end
    money = rule.max
  }
}

function move() {
  if (!isMouseDown && speed !== 0) {
    if (speed >= 1 || speed <= -1) {
      rule.x += speed
      speed *= fl
      money = Math.floor((centerX - rule.x) * rule.ratioScale)
      checkBountry()
      input.value = money
      rule.currentValue = money
    }
  }
}

;(function drawFrame() {
  requestAnimationFrame(drawFrame, canvas)
  ctx.clearRect(0, 0, W, H)
  move()
  rule.draw(ctx)
})()
