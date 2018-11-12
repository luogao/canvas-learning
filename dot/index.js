import { createCanvas } from '../utils'
import Dots from './dots'


window.onload = function () {
  const canvas = createCanvas(window.innerWidth, window.innerHeight)
  const num = 100
  const dots = new Dots(num, canvas)
}
