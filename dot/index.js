import { createCanvas } from '../utils'
import Dot from './dot'

window.onload = function () {

  const canvas = createCanvas(500, 500, 'myCanvas')
  const ctx = canvas.getContext('2d')
  const num = 2
  let dots = []


  for (let i = 0; i < num; i++) {
    let x = Math.ceil(Math.random() * canvas.width)
    let y = Math.ceil(Math.random() * canvas.height)
    let vx = Math.ceil(Math.random() * 2)
    let vy = Math.ceil(Math.random() * 2)
    const d = new Dot(x, y, vx, vy, canvas)
    d.render(ctx)
    dots.push(d)
  }

  const anim = () => {
    for (let i = 0; i < dots.length; i++) {
      dots[i].update()
    }
    window.requestAnimationFrame(anim)
  }
  window.requestAnimationFrame(anim)
}
