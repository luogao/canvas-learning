class Dot {
  constructor(x, y, vx, vy, canvas) {
    this.time = 1
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.bgColor = () => `#${(~~(Math.random() * (1 << 24))).toString(16)}`
    this.size = Math.ceil(Math.random() * 3 + 5)
    this.canvas = canvas
    this.ctx = {}
  }

  render(ctx) {
    const { x, y, bgColor, size, canvas } = this
    ctx.save()
    this.ctx = ctx
    this.ctx.beginPath()
    this.ctx.fillStyle = bgColor()
    this.ctx.arc(x - size / 2, y - size / 2, size, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.restore()
  }

  update() {
    const { ctx, canvas, size } = this
    const { width, height } = canvas
    this.x = this.x + this.vx * this.time
    this.y = this.y + this.vy * this.time
    this.vx = (this.x < width && this.x > 0) ? this.vx : (-this.vx)
    this.vy = (this.y < height && this.y > 0) ? this.vy : (-this.vy)
    this.render(ctx)
  }

}

export default Dot
