import { createCanvas } from '../utils'
import Dot from './dot'

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

window.onload = function () {
  const canvas = createCanvas(window.innerWidth, window.innerHeight)
  const ctx = canvas.getContext('2d')
  const num = 20
  const dots = []

  for (let i = 0; i < num; i++) {
    let x = Math.ceil(Math.random() * canvas.width)
    let y = Math.ceil(Math.random() * canvas.height)
    let vx = Math.ceil(Math.random() * 2)
    let vy = Math.ceil(Math.random() * 2)
    let d = new Dot(x, y, vx, vy, canvas)
    d.render(ctx)
    dots.push(d)
  }

  requestAnimFrame(anim)
  function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
      dots[i].update()
    }
    requestAnimFrame(anim)
  }
}
