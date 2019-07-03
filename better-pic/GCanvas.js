const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 150
export default class GCanvas {
  constructor(canvas) {
    this.canvas = null
    this.ctx = null
    this.width = DEFAULT_WIDTH
    this.height = DEFAULT_HEIGHT
    this.initCanvas(canvas)
  }

  initCanvas(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  setWidth(width) {
    this.canvas.width = this.width = width
  }

  setHeight(height) {
    this.canvas.height = this.height = height
  }
}
