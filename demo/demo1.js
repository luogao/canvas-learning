const windowToCanvas = (canvas, x, y) => {
    //获取canvas元素距离窗口的一些属性，MDN上有解释
    let rect = canvas.getBoundingClientRect()
        //x和y参数分别传入的是鼠标距离窗口的坐标，然后减去canvas距离窗口左边和顶部的距离。
    return {
        x: x - rect.left * (canvas.width / rect.width),
        y: y - rect.top * (canvas.height / rect.height)
    }
}

function draw(canvas) {
    let drawing = false
    let ctx = canvas.getContext('2d')
    canvas.onmousedown = function(e) {
        drawing = true
        let position = windowToCanvas(canvas, e.clientX, e.clientY)
        let { x, y } = position
        ctx.strokeStyle = "red"
        ctx.lineWidth = 1
        ctx.moveTo(x, y)
    }
    canvas.onmouseup = function() {
        drawing = false
    }
    document.body.onmousemove = function(e) {
        if (e.target.id === 'canvas') {
            if(drawing){
                let position = windowToCanvas(canvas, e.clientX, e.clientY)
                let { x, y } = position
                ctx.lineTo(x,y)
                ctx.stroke()
            }
        } else {
            drawing = false
        }
    }
}
window.onload = function() {
    let canvas = document.querySelector('#canvas')
    if (!canvas || !canvas.getContext) {
        //不兼容canvas
        return false
    } else {
        draw(canvas)
    }
}