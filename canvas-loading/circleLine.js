const NONESHADOW = {
  x: 0,
  y: 0,
  blur: 0,
  color: "rgba(0, 0, 0,0)"
};
class CircleLine {
  constructor({ canvas, ctx, name, animation, index }) {
    canvas = canvas;
    this.ctx = ctx;
    this.name = name;
    this.data = {};
    this.animation = animation;
  }

  render(options) {
    this.data = { ...options };
    this._draw(options);
  }

  getData() {
    console.log(this);
    return this.data;
  }

  _draw(options) {
    drawCircleLine({
      ctx: this.ctx,
      center: options.center,
      radius: options.radius,
      color: options.color,
      width: options.lineWidth,
      startAngle: options.startAngle,
      endAngle: options.currentAngle || options.endAngle,
      clockwise: !options.clockwise,
      shadow: options.shadow
    });
  }

  inPath(x, y) {
    const { ctx } = this;
    const { center, radius, startAngle, endAngle, lineWidth } = this.data;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    ctx.stroke();
    const ret = ctx.isPointInStroke(x, y);
    return ret;
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
  clockwise = false,
  shadow
}) => {
  ctx.save();
  ctx.shadowColor = shadow.color;
  ctx.shadowBlur = shadow.blur;
  ctx.shadowOffsetY = shadow.y;
  ctx.shadowOffsetX = shadow.x;
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.arc(center.x, center.y, radius, startAngle, endAngle, clockwise);
  ctx.stroke();
  ctx.restore();
};

export default CircleLine;
