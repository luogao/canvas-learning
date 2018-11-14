class CircleLine {
  constructor({ canvas, ctx, name, animation }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.name = name;
    this.data = {};
    this.animation = animation;
  }

  render(options) {
    this.data = { ...options };
    this._draw(options);
  }

  _draw(options) {
    drawCircleLine({
      ctx: this.ctx,
      center: options.center,
      radius: options.radius,
      color: options.color,
      width: options.lineWidth,
      startAngle: options.startAngle,
      endAngle: options.endAngle,
      clockwise: !options.clockwise
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

export default CircleLine;
