import { hex2rgba } from "../utils";

class Dot {
  constructor(x, y, vx, vy, canvas) {
    this.time = 1;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.bgColor = "pink";
    this.lineColor = "#70DBEF";
    this.size = Math.ceil(Math.random() * 3 + 1);
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

  update() {
    const { ctx, canvas, size } = this;
    const { width, height } = canvas;
    this.x = this.x + this.vx * this.time;
    this.y = this.y + this.vy * this.time;
    this.vx =
      this.x + size / 2 < width && this.x + size / 2 > 0 ? this.vx : -this.vx;
    this.vy =
      this.y + size / 2 < height && this.y + size / 2 > 0 ? this.vy : -this.vy;
    this.render(ctx);
  }

  drawLine(dot) {
    const { ctx, x, y, lineColor } = this;
    const { x: x1, y: y1 } = dot;
    const dx = x - x1;
    const dy = y - y1;
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance < 150) {
      const alpha = ((100 - distance) / 100) * 1;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = hex2rgba(lineColor, alpha);
      ctx.strokeWidth = 0.5;
      ctx.moveTo(x + 0.5, y + 0.5);
      ctx.lineTo(x1 + 0.5, y1 + 0.5);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
  }
}

export default Dot;
