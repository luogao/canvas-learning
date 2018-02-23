function Shape(x, y, txt) {
    this.x = x
    this.y = y
    this.size = 150
    this.txt = txt
    this.placement = []
}

Shape.prototype.getValue = function(ctx, width, height, gridY, gridX) {
    ctx.textAlign = "center"
    ctx.font = this.size + 'px arial'
    ctx.fillText(this.txt, this.x, this.y)

    let _data = ctx.getImageData(0, 0, width, height)
    let buffer32 = new Uint32Array(_data.data.buffer)

    for (let j = 0; j < height; j += gridY) {
        for (let i = 0; i < width; i += gridX) {
            if (buffer32[j * width + i]) {
                let particle = new Particle(i, j, type)
                this.placement.push(particle)
            }
        }
    }
    ctx.clearRect(0, 0, width, height)
}