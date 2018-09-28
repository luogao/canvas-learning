class Pie {
  constructor(id) {
    const canvas = document.getElementById(id)
    const W = canvas.width
    const H = canvas.height
    canvas.style.width = W + 'px'
    canvas.style.height = H + 'px'

    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.children = []
  }

  init(options = {}) {
    const { center = [this.canvas.width / 2, this.canvas.height / 2], radius = Math.min(this.canvas.width, this.canvas.height) / 2, data } = options
    this.center = center
    this.radius = radius
    this.data = data
    const totalValue = this.data.map(item => item.value).reduce((pre, cur) => pre + cur)
    console.log(totalValue)
  }
}

export default Pie