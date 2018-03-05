const windowToCanvas = (canvas, x, y) => {
    //获取canvas元素距离窗口的一些属性，MDN上有解释
    //Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置
    //
    let rect = canvas.getBoundingClientRect()

    //x和y参数分别传入的是鼠标距离窗口的坐标，然后减去canvas距离窗口左边和顶部的距离。
    return {
        x: x - rect.left * (canvas.width / rect.width),
        y: y - rect.top * (canvas.height / rect.height)
    }
}
window.onload = function() {
    draw()
}

function draw() {
    let img = document.getElementById('img');
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0,0,0,.5)'
    ctx.drawImage(img, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    img.style.display = 'none';
    canvas.addEventListener('mousemove', function(e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'rgba(0,0,0,.5)'
        ctx.drawImage(img, 0, 0)
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.save();
        let position = windowToCanvas(canvas, e.clientX, e.clientY)
        let { x, y } = position
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2, false)
        ctx.clip();
        ctx.drawImage(img, 0, 0)
        ctx.restore();

    }, false)
}