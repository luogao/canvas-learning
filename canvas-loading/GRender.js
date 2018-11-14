import CircleLine from "./circleLine";


// const c2 = new CircleLine({
//   canvas: circleLoadingCanvas,
//   ctx: circleLoadingContext,
//   center,
//   radius: loading.size,
//   width: loadingBar.width,
//   color: loadingBar.color,
//   startAngle: -Math.PI / 2,
//   clockwise: true,
//   howLong: {
//     total: 100,
//     length: 90
//   },
//   animation: {
//     duration: 1000,
//     end() {
//       console.log("animation finished!");
//     }
//   }
// });

class GRender {
  constructor({ canvas, ctx, children }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.children = children || [];
    this.childrenInstance = [];
    this.timer = null;
    this._initChildren();
  }

  _processData(options) {
    switch (options.type) {
      case "circle":
        const _data = options.data;
        return {
          canvas: this.canvas,
          ctx: this.ctx,
          center: _data.center,
          radius: _data.radius,
          width: _data.lineWidth,
          color: _data.color,
          startAngle: _data.startAngle,
          howLong: _data.howLong,
          animation: options.animation
        };
    }
  }

  _handleChildInstantiation(options) {
    switch (options.type) {
      case "circle":
        return new CircleLine(this._processData(options));
    }
  }

  _initChildren() {
    this.childrenInstance = this.children.map(child => {
      return this._handleChildInstantiation(child);
    });
    console.log(this.childrenInstance);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _update() {
    this.clearCanvas();
    this.render();
  }

  _isFinishedAnimation(instance) {
    return !instance.isAnimating;
  }

  _animate() {
    if (this.childrenInstance.every(this._isFinishedAnimation)) {
      cancelAnimationFrame(this.timer);
    } else {
      this._update()
      this.timer = requestAnimationFrame(this._animate.bind(this));
    }
  }

  draw() {
    this._animate()
  }

  render() {
    this.childrenInstance.forEach(child => {
      child.render();
    });
  }
}

export default GRender;
