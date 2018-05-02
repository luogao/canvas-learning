import Dot from './dot'

class Dots {
  constructor(num, canvas) {
    this.num = num
    this.dots = []
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.init()
    this.anim(this)
  }

  init() {
    const { num, canvas, dots, ctx } = this
    for (let i = 0; i < this.num; i++) {
      let x = Math.ceil(Math.random() * canvas.width)
      let y = Math.ceil(Math.random() * canvas.height)
      let vx = Math.random() * 2 - 1
      let vy = Math.random() * 2 - 1
      let d = new Dot(x, y, vx, vy, canvas)
      d.render(ctx)
      dots.push(d)
    }
  }

  anim(context) {
    const self = context
    self.anim = function () {
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
      for (let i = 0; i < self.dots.length; i++) {
        self.dots[i].update()
        for (let j = i + 1; j < self.dots.length; j++) {
          self.dots[i].drawLine(self.dots[j])
        }
      }
      requestAnimationFrame(self.anim)
    }
    return self.anim()
  }

}

export default Dots
