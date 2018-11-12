import { hex2rgba, randomItem } from "../utils";
import { dotColors } from "./constants";

const _range = 11;
const SPRING = 0.01;
const FRICTION = 0.9;

class Dot {
  constructor({ x, y, canvas, size }) {
    this.time = 0.6;
    this.rangeX = _range + x;
    this.rangeY = _range + y;
    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
    this.oldSize = size;
    this.vx = 0;
    this.vy = 0;
    this.bgColor = hex2rgba(randomItem(dotColors), Math.random());
    this.size = size || Math.ceil(Math.random() * 3 + 1);
    this.canvas = canvas;
    this.ctx = {};
  }

  render(ctx) {
    const { x, y, bgColor, size, canvas } = this;
    ctx.save();
    this.ctx = ctx;
    this.ctx.beginPath();
    this.ctx.fillStyle = bgColor;
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  changePotison(nextX, nextY) {
    this.nextX = nextX;
    this.nextY = nextY;
  }

  hide() {
    this.bgColor = "rgba(0,0,0,0)";
    this.size = 0;
    this.x = this.x0;
    this.y = this.y0;
    this.isHidden = true;
  }

  show() {
    this.bgColor = hex2rgba(randomItem(dotColors), Math.random());
    this.size = this.oldSize;
    this.isHidden = false;
  }

  move() {
    if (
      typeof this.nextX !== "undefined" &&
      typeof this.nextY !== "undefined"
    ) {
      this.vx += (this.nextX - this.x) * SPRING;
      this.vy += (this.nextY - this.y) * SPRING;
      this.vx *= FRICTION;
      this.vy *= FRICTION;

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  update() {
    const { ctx, x0, y0, size } = this;
    // this.x = this.x + this.vx * this.time;
    // this.y = this.y + this.vy * this.time;
    // this.vx =
    //   ((_range - size) * 2 - Math.floor(Math.random() * (_range - size))) / 10;
    // this.vy =
    //   ((_range - size) * 2 - Math.floor(Math.random() * (_range - size))) / 10;
    // this.vx = this.x - x0 < _range ? this.vx : -this.vx;
    // this.vy = this.y - y0 < _range ? this.vy : -this.vy;
    this.size = this.oldSize * Math.random();
    this.move();
    this.render(ctx);
  }
}

export default Dot;
