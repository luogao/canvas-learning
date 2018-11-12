import Dot from './dot'

class Dots {
  constructor(num, canvas) {
    this.num = num
    this.dots = []
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.init()
    this.anim = this.anim.bind(this)
    this.anim()
  }

  init() {
    const { num, canvas, dots, ctx } = this
    for (let i = 0; i < num; i++) {
      let x = Math.ceil(Math.random() * canvas.width)
      let y = Math.ceil(Math.random() * canvas.height)
      let vx = Math.random() * 2 - 1
      let vy = Math.random() * 2 - 1
      let d = new Dot(x, y, vx, vy, canvas)
      d.render(ctx)
      dots.push(d)
    }
  }

  anim() {
    const {ctx, canvas, dots} = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < dots.length; i++) {
      dots[i].update()
      for (let j = i + 1; j < dots.length; j++) {
        dots[i].drawLine(dots[j])
      }
    }
    requestAnimationFrame(this.anim)
  }

}

export default Dots
