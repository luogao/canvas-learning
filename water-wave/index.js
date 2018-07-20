import './index.css'

import { createCanvas } from '../utils'

const W = 500
const H = 500

const draw = function () {
  const canvas = createCanvas(W, H)
  const ctx = canvas.getContext('2d')
}



window.onload = function () {
  draw()
}