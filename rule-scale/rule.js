class Rule {
  constructor(options) {
    this.x = options.x || 0
    this.y = options.y || 0
    this.vx = 0
    this.ax = 0
    this.color = options.color || '#fff'
    this.scaleX = options.scaleX || 1
    this.scaleY = options.scaleY || 1
    this.markShort = -options.markShort || -5
    this.markLong = -options.markLong || -10
    this.textHeight = -options.textHeight || -5
    this.min = options.min || 1
    this.max = options.max || 10000
    this.width = options.width || 1000
    this.step = options.step || 1000
    this.seg = Math.floor(this.max / this.step)
    this.pxStep = Math.floor(this.width / this.seg)
    this.miniPxStep = this.pxStep / 10
    this.currentValue = options.currentValue || options.min

    this.lineBottom = Object.assign(
      {},
      {
        mx: null,
        my: null,
        lx: null,
        ly: null,
        color: '#fff'
      },
      options.lineBottom || {}
    )

    this.lineRed = Object.assign(
      {},
      {
        mx: 0,
        my: 0,
        lx: 0,
        ly: 5,
        color: 'red',
        isDrawRedLine: true
      },
      options.lineRed || {}
    )

    this.currentValueStyle = Object.assign(
      {},
      {
        x: 0,
        y: 0,
        fontSize: 20,
        color: '#fff',
        isDrawCurrentValue: true
      },
      options.currentValueStyle
    )
    this.ratioScale = Math.floor(this.max / this.width)
  }

  draw(ctx) {
    let n = 0
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.lineWidth = 1
    ctx.scale(this.scaleX, this.scaleY)
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.color
    ctx.textAlign = 'center'
    ctx.beginPath()

    for (let i = 0; i <= this.width; i += this.miniPxStep) {
      ctx.moveTo(i, 0)
      if (n % 10 === 0) {
        ctx.lineTo(i, this.markLong)
        if (i === 0) {
          ctx.fillText(1, i, this.markLong + this.textHeight)
        } else {
          ctx.fillText((n / 10) * this.step, i, this.markLong + this.textHeight)
        }
      } else {
        ctx.lineTo(i, this.markShort)
      }
      n++
    }
    ctx.closePath()
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.strokeStyle = this.lineBottom.color
    ctx.scale(this.scaleX, this.scaleY)
    ctx.beginPath()
    ctx.moveTo(this.lineBottom.mx, this.lineBottom.my)
    ctx.lineTo(this.lineBottom.lx, this.lineBottom.ly)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()

    if (this.lineRed.isDrawRedLine) {
      ctx.save()
      ctx.strokeStyle = this.lineRed.color
      ctx.lineWidth = 1
      ctx.scale(this.scaleX, this.scaleY)
      ctx.beginPath()
      ctx.moveTo(this.lineRed.mx, this.lineRed.my)
      ctx.lineTo(this.lineRed.lx, this.lineRed.ly)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    }

    if (this.currentValueStyle.isDrawCurrentValue) {
      ctx.save()
      ctx.fillStyle = this.currentValueStyle.color
      ctx.scale(this.scaleX, this.scaleY)
      ctx.textAlign = 'center'
      ctx.font = `${this.currentValueStyle.fontSize}px SimSun, Songti SC bold`
      ctx.fillText(
        this.currentValue,
        this.currentValueStyle.x,
        this.currentValueStyle.y
      )
      ctx.restore()
    }
  }
}

export default Rule
