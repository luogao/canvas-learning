var canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
gridY = 7;
gridX = 7;

type = "ball";
colors = [
    'rgba(255,255,255,0.3)'
];

var message = document.getElementById('message'),
    gravity = document.getElementById('gra'),
    duration = document.getElementById('dur'),
    speed = document.getElementById('speed'),
    radius = document.getElementById('rad'),
    resolution = document.getElementById('res');

//全局
graVal = parseFloat(gravity.value);
durVal = parseFloat(duration.value);
spdVal = parseFloat(speed.value);
radVal = parseFloat(radius.value);
resVal = parseFloat(resolution.value);

var word = new Shape(W / 2, H / 2, message.value);
word.getValue(context, W, H, gridY, gridX);

function change() {
    context.clearRect(0, 0, W, H)
    gridX = parseFloat(resolution.value);
    gridY = parseFloat(resolution.value);
    word.placement = [];
    word.txt = message.value;
    word.getValue(context, W, H, gridY, gridX);
}

function changeV() {
    graVal = parseFloat(gravity.value);
    durVal = parseFloat(duration.value);
    spdVal = parseFloat(speed.value);
    radVal = parseFloat(radius.value);
}

(function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, W, H);

    for (var i = 0; i < word.placement.length; i++) {
        word.placement[i].update();
    }
}())

//resize
function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize, false);