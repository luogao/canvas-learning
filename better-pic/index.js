import './index.css'
import analyze from 'rgbaster'

const container = document.getElementById('container')
const bg = document.querySelector('.bg')
container.addEventListener('click', function(e) {
  const target = e.target
  if (target.nodeName === 'SPAN') {
    bg.style.backgroundColor = target.dataset.color
  }
})

const run = () => {
  const src = document.querySelector('img').src

  analyze(src, { scale: 0.6 }).then(res => {
    const colors = res.slice(0, 20)
    console.log(colors)
    colors.forEach(item => {
      const node = document.createElement('span')
      node.setAttribute('data-color', item.color)
      node.style.cssText = `width: 50px;height:50px;background-color: ${item.color}`
      container.appendChild(node)
    })
  })
}
run()
