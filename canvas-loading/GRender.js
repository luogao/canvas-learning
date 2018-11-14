import CircleLine from "./circleLine";

const getCircleData = options => {
  const interval = 1000 / 60;
  const _data = options.data;
  const rad = (Math.PI * 2) / _data.howLong.total;
  const duration = 2000;
  return {
    name: options.name,
    data: {
      center: _data.center,
      radius: _data.radius,
      lineWidth: _data.lineWidth,
      color: _data.color,
      startAngle: _data.startAngle,
      endAngle: _data.startAngle + rad * _data.howLong.length,
      clockwise: true,
      updateSpeed: _data.howLong.length / (duration / interval)
    }
  };
}
class GRender {
  constructor({ canvas, ctx, children }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.children = children || [];
    this.childrenInstance = [];
    this.datas = {};
    this._initData();
  }

  _initData() {
    this.children.forEach(child => {
      this.datas[child.name] = this._processData(child);
    });
    this._initChildren();
    console.log('this.children', this.children)
    console.log('this.datas', this.datas)
  }

  _processData(options) {
    switch (options.type) {
      case "circle":
        return getCircleData(options)
    }
  }

  _handleChildInstantiation(options) {
    switch (options.type) {
      case "circle":
        return new CircleLine({
          canvas: this.canvas,
          ctx: this.ctx,
          name: options.name,
          animation: options.animation
        });
    }
  }

  _initChildren() {
    this.childrenInstance = this.children.map(child => {
      return this._handleChildInstantiation(child);
    });
  }

  _update() {
    this.clear();
    this.render();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.ctx.fillStyle = 'rgba(0,0,0,0.3)'
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    this.render();
  }

  _addChild(child) {
    this.children.push(child);
    this.datas[child.name] = this._processData(child)
    this.childrenInstance.push(this._handleChildInstantiation(child))
  }

  _updateChild(newData) {
    const targetIndex = this.children.findIndex(
      child => child.name === newData.name
    );
    const _target = this.children[targetIndex];
    // update this.children
    _target.data = { ..._target.data, ...newData.data };
    // update this.datas
    this.datas[newData.name].data = { ...this.datas[newData.name].data, ...this._processData(_target).data };
  }

  setOption(newOptions) {
    if (this.datas[newOptions.name]) {
      this._updateChild(newOptions);
    } else {
      this._addChild(newOptions);
    }
    this._update();
  }

  render() {
    this._renderChildren();
    // this.animation();
  }

  animation() {
    this.childrenInstance.forEach(child => {
      console.log(child.data.updateSpeed);
    });
  }

  _renderChildren() {
    this.childrenInstance.forEach(child => {
      child.render({ ...this.datas[child.name].data });
    });
  }
}

export default GRender;
