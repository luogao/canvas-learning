class PieItem {
  constructor(options) {
    for (let key in options) {
      this[key] = options[key]
    }
  }

  draw(ctx) {
    const [x, y] = this.center
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.arc(x, y, this.radius, Math.PI * this.start, Math.PI * this.end)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  inPath(ctx, x, y) {
    ctx.beginPath()
    ctx.moveTo(this.center[0], this.center[1])
    ctx.arc(this.center[0], this.center[1], this.radius, Math.PI * this.start, Math.PI * this.end)
    const ret = ctx.isPointInPath(x, y)
    ctx.closePath()
    return ret
  }
}

export default PieItem