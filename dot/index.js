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
  const num = 5
  const dots = []

  for (let i = 0; i < num; i++) {
    let x = Math.ceil(Math.random() * canvas.width)
    let y = Math.ceil(Math.random() * canvas.height)
    let vx = Math.ceil(Math.random() * 2)
    let vy = Math.ceil(Math.random() * 2)
    let d = new Dot(x, y, vx, vy, canvas)
    d.render()
    dots.push(d)
  }

  requestAnimFrame(anim)
  function anim() {
    for (var i = 0; i < dots.length; i++) {
      (i => {
        dots[i].update()
      })(i)
    }
    requestAnimFrame(anim)
  }
}
