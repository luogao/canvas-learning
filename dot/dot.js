class dot {
  constructor(x, y, vx, vy, canvas, bgColor = 'lightgray') {
    this.time = 2
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.bgColor = bgColor
    this.size = Math.ceil(Math.random() * 3 + 2)
    this.canvas = canvas
    this.ctx = null
  }
  render(ctx) {
    const { x, y, size, bgColor } = this
    ctx.save()
    this.ctx = ctx
    this.ctx.beginPath()
    this.ctx.fillStyle = bgColor
    this.ctx.arc(x - size / 2, y - size / 2, size, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.restore()
  }
  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.x = this.x + this.vx * this.time;
    this.y = this.y + this.vy * this.time;
    this.vx = (this.x < this.canvas.width && this.x > 0) ? this.vx : (-this.vx);
    this.vy = (this.y < this.canvas.height && this.y > 0) ? this.vy : (-this.vy);
    this.render(this.ctx);
  }
}

export default dot
