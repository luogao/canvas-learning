import PieItem from './pieItem'


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

    const processData = this.data.map((item, index) => {
      const start = index > 0 ? this.children[index - 1].end : 0
      const end = start + 2 * (item.value / totalValue)

      const tempItem = {
        ...item,
        totalValue: totalValue,
        percent: item.value / totalValue,
        start,
        end,
        center: this.center,
        radius: this.radius,
      }

      const pitItem = new PieItem(tempItem)
      pitItem.draw(this.context)
      this.children.push(pitItem)
      return tempItem
    })

    options.tooltip && this.showTips(options.tooltip)

  }

  showTips(options) {
    const tipEl = document.createElement('div')
    tipEl.style.background = 'rgba(0,0,0,7)'
    tipEl.style.color = '#fff'
    tipEl.style.borderRadius = '5px'
    tipEl.style.padding = '2px 5px'
    tipEl.style.position = 'absolute'
    tipEl.style.zIndex = '999'
    tipEl.style.display = 'none'

    document.body.appendChild(tipEl)

    this.canvas.addEventListener('mousemove', (e) => {
      let count = 0
      this.children.forEach((item) => {
        if (item.inPath(this.context, e.offsetX, e.offsetY)) {
          tipEl.innerHTML = options.format({
            value: item.value,
            name: item.name,
            percent: item.percent
          })

          tipEl.style.display = 'block'
          tipEl.style.top = e.pageY + options.offset[0] + 'px'
          tipEl.style.left = e.pageX + options.offset[1] + 'px'
        } else {
          count++
        }
      })
      count === this.children.length && (tipEl.style.display = 'none')
    }, false)

    this.canvas.addEventListener("mouseleave", () => {
      tipEl.style.display = 'none'
    }, false)
  }
}

export default Pie