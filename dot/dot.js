class Dot {
  constructor(x, y, vx, vy, canvas, bgColor = '#990033') {
    this.time = 1
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.bgColor = bgColor
    this.size = Math.ceil(Math.random() * 3 + 5)
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  render() {
    const { x, y, ctx, bgColor, size, canvas } = this
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = bgColor
    ctx.arc(x - size / 2, y - size / 2, size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  update() {
    const { ctx, canvas, size } = this
    const { width, height } = canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.x = this.x + this.vx * this.time
    this.y = this.y + this.vy * this.time
    this.vx = (this.x < width && this.x > 0) ? this.vx : (-this.vx)
    this.vy = (this.y < height && this.y > 0) ? this.vy : (-this.vy)
    this.render(ctx)
  }

}

export default Dot
