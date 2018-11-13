class CircleLine {
  constructor({
    canvas,
    ctx,
    center,
    radius,
    width,
    color,
    startAngle,
    clockwise = true,
    animation,
    howLong
  }) {
    if (howLong.total < howLong.length) {
      console.warn("length should less than total");
      return;
    }
    this.rad = (Math.PI * 2) / howLong.total;
    const endAngle = startAngle + this.rad * howLong.length;
    this.canvas = canvas;
    this.ctx = ctx;
    this.center = center;
    this.radius = radius;
    this.width = width;
    this.color = color;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.clockwise = clockwise;
    this.animation = animation;
    this.howLong = howLong;
    this.timer = null;
    this.step = 0;
    this.speed = 0;
    this._endAngle = startAngle;
    this.isAnimating = false;
  }

  render() {
    if (this.animation && this.animation.duration) {
      const interval = 1000 / 60;
      this.speed = this.howLong.length / (this.animation.duration / interval);
      console.time("animation time");
      this._animate();
    } else {
      this._draw();
      this.isAnimating = false;
    }
  }

  _animate() {
    this.isAnimating = true;
    this._endAngle = this.startAngle + this.rad * this.step;
    this.step += this.speed;
    clearCanvas(this.canvas, this.ctx);
    typeof this.animation.before === "function" && this.animation.before();
    this._draw(this._endAngle);
    if (this.step <= this.howLong.length) {
      this.timer = requestAnimationFrame(this._animate.bind(this));
    } else {
      console.timeEnd("animation time");
      cancelAnimationFrame(this.timer);
      this._draw();
      this.isAnimating = false;
      typeof this.animation.end === "function" && this.animation.end();
    }
  }

  _draw(endAngle) {
    drawCircleLine({
      ctx: this.ctx,
      center: this.center,
      radius: this.radius,
      color: this.color,
      width: this.width,
      startAngle: this.startAngle,
      endAngle: endAngle || this.endAngle,
      clockwise: !this.clockwise
    });
  }
}

const drawCircleLine = ({
  ctx,
  center = { x: 0, y: 0 },
  radius,
  color,
  width,
  startAngle = 0,
  endAngle = Math.PI * 2,
  clockwise = false
}) => {
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.arc(center.x, center.y, radius, startAngle, endAngle, clockwise);
  ctx.stroke();
  ctx.restore();
};

const clearCanvas = (canvas, ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};


export default CircleLine;

