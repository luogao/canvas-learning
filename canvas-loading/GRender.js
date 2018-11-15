import CircleLine from "./circleLine";

const getCircleData = (options, index) => {
  const _data = options.data;
  const rad = (Math.PI * 2) / _data.howLong.total;
  return {
    name: options.name,
    index: index,
    data: {
      center: _data.center,
      radius: _data.radius,
      lineWidth: _data.lineWidth,
      color: _data.color,
      startAngle: _data.startAngle,
      endAngle: _data.startAngle + rad * _data.howLong.length,
      clockwise: true,
      shadow: _data.shadow || DEFAULTSHADOW
    }
  };
};

const DEFAULTSHADOW = {
  x: 0,
  y: 0,
  blur: 0,
  color: "rgba(0, 0, 0, 0)"
};

const HOVERSHADOW = {
  x: 2,
  y: 2,
  blur: 10,
  color: "rgba(0, 0, 0,.3)"
};

class GRender {
  constructor({ canvas, ctx, children }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.children = children || [];
    this.childrenInstance = [];
    this.datas = {};
    this.childrenInitData = {};
    this._initData();
  }

  _getNewData(child, index) {
    this.datas[child.name] = this._processData(child, index);
    this.childrenInitData[child.name] = this._processData(child, index);
  }

  _initData() {
    this.children.forEach(this._getNewData.bind(this));
    this._initChildren();
    console.log("this.children", this.children);
    console.log("this.childrenInitData", this.childrenInitData);
    console.log("this.datas", this.datas);
  }

  _processData(options, index) {
    switch (options.type) {
      case "circle":
        return getCircleData(options, index);
    }
  }

  _handleChildInstantiation(options, index) {
    switch (options.type) {
      case "circle":
        return new CircleLine({
          canvas: this.canvas,
          ctx: this.ctx,
          name: options.name,
          index: index,
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

  _changeOrder(name, order) {
    this.datas[name].index = order;
  }

  _addChild(child) {
    this.children.push(child);
    this._getNewData(child, this.children.length - 1);
    this.childrenInstance.push(this._handleChildInstantiation(child));
  }

  _updateChild(newData) {
    const targetIndex = this.children.findIndex(
      child => child.name === newData.name
    );
    const _target = this.children[targetIndex];
    // update this.children
    _target.data = { ..._target.data, ...newData.data };
    // update this.datas
    this.datas[newData.name].data = {
      ...this.datas[newData.name].data,
      ...this._processData(_target).data
    };
  }

  handleHover(x, y) {
    this.childrenInstance.forEach(child => {
      if (child.inPath(x, y)) {
        this.setOption({
          name: child.name,
          data: {
            shadow: HOVERSHADOW
          }
        });
        this._changeOrder(child.name, this.childrenInstance.length);
      } else {
        this.setOption({
          name: child.name,
          data: {
            shadow: DEFAULTSHADOW
          }
        });
        this._changeOrder(child.name, this.childrenInitData[child.name].index);
      }
    });
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
  }

  _renderChildren() {
    this.childrenInstance
      .sort((before, after) => {
        return this.datas[before.name].index - this.datas[after.name].index;
      })
      .forEach(child => {
        child.render({ ...this.datas[child.name].data });
      });
  }
}

export default GRender;
