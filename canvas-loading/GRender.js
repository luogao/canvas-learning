import CircleLine from "./circleLine";

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
  }

  _processData(options) {
    switch (options.type) {
      case "circle":
        const _data = options.data;
        const rad = (Math.PI * 2) / _data.howLong.total;
        return {
          name: options.name,
          data: {
            center: _data.center,
            radius: _data.radius,
            lineWidth: _data.lineWidth,
            color: _data.color,
            startAngle: _data.startAngle,
            endAngle: _data.startAngle + rad * _data.howLong.length,
            clockwise: true
          }
        };
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

  addChild(child) {
    this.children.push(child);
    this._initData();
  }

  updateChild(newData) {
    const targetIndex = this.children.findIndex(
      child => child.name === newData.name
    );
    const _target = this.children[targetIndex]
    const updateData = {
      ..._target.data,
      ...newData.data
    }
    this.children[targetIndex].data = updateData
    this._initData();
  }

  setOption(newOptions) {
    if (this.datas[newOptions.name]) {
      this.updateChild(newOptions);
    } else {
      this.addChild(newOptions);
    }
    this._update();

    // const _data = this.datas[newOptions.name];
    // const changeData = newOptions.data;
    // const newData = { ..._data, ...changeData };
    // this.datas[newOptions.name] = newData;
    // this.draw();
  }

  render() {
    this._renderChildren();
  }

  _renderChildren() {
    this.childrenInstance.forEach(child => {
      child.render({ ...this.datas[child.name].data });
    });
  }
}

export default GRender;
