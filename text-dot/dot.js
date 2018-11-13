import { hex2rgba, randomItem, randomNum } from "../utils";
import { dotColors } from "./constants";

const _range = 11;
const SPRING = 2;
const FRICTION = 0.1;

class Dot {
  constructor({ x, y, canvas, size, color }) {
    this.isHidden = false;
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
    this.vs = 0;
    this.bgColor =
      hex2rgba(color, Math.random()) ||
      hex2rgba(randomItem(dotColors), Math.random());
    this.size = size || Math.ceil(Math.random() * 3 + 1);
    this.canvas = canvas;
    this.ctx = {};
    this.animateStoped = true;
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
    this.animateStoped = false;
  }

  hide() {
    this.isHidden = true;
  }

  show() {
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
      if (Math.ceil(this.x) === this.nextX) {
        this.animateStoped = true;
      }
    }
  }

  handleHidden() {
    this.vs += SPRING;
    this.vs *= FRICTION;
    this.size -= this.vs;
    if (this.size < 0) {
      this.size = 0;
    }
    this.changePotison(
      Math.ceil(Math.random() * canvas.width),
      Math.ceil(Math.random() * canvas.height)
    );
  }

  update() {
    const { ctx } = this;
    if (this.isHidden) {
      this.handleHidden();
    } else {
      this.vs += SPRING;
      this.vs *= FRICTION;
      this.size += this.vs;
      if (this.size >= this.oldSize) {
        this.size = this.oldSize;
      }
    }
    if (!this.animateStoped) {
      this.move();
    }
    this.render(ctx);
  }
}

export default Dot;
