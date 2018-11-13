class GRender {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.children = [];
  }

  add(element) {
    this.children.push(element);
  }

  render() {
    this.children.forEach(child => {
      child.render();
    });
  }
}
