import "./index.css";
import Dot from "./dot";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const W = (canvas.width = window.innerWidth);
const H = (canvas.height = window.innerHeight);
const dots = [];
const number = 10;
const text = "测试";
const lineHeight = 7;
const gridY = 10;
const gridX = 10;
const startPosition = 100;

function getDotPosition(text) {
  const width = W;
  const height = H;
  const offscreenCanvas = document.createElement("canvas");
  const offscreenCanvasCtx = offscreenCanvas.getContext("2d");
  const points = [];
  offscreenCanvas.setAttribute("width", width);
  offscreenCanvas.setAttribute("height", height);
  offscreenCanvasCtx.fillStyle = "#000";
  offscreenCanvasCtx.font = "bold 10px Arial";
  const measure = offscreenCanvasCtx.measureText(text);
  const size = 0.8;
  const fSize = Math.min(
    (height * size * 10) / lineHeight,
    (width * size * 10) / measure.width
  );
  offscreenCanvasCtx.font = `bold ${fSize}px Arial`;
  const measureResize = offscreenCanvasCtx.measureText(text);
  let left = (width - measureResize.width) / 2;
  const bottom = (height + (fSize / 10) * lineHeight) / 2;
  offscreenCanvasCtx.fillText(text, left, bottom);
  const data = offscreenCanvasCtx.getImageData(0, 0, width, height);
  const buffer32 = new Uint32Array(data.data.buffer);

  for (var j = 0; j < H; j += gridY) {
    for (var i = 0; i < W; i += gridX) {
      if (buffer32[j * W + i]) {
        points.push({ x: i, y: j });
      }
    }
  }
  return points;
}

function init(points) {
  const len = points.length;
  if (dots.length) {
    dots.length = 0;
  }
  for (let i = 0; i < len; i++) {
    const dot = new Dot({
      x: (startPosition - (Math.random() * startPosition) / 2 + W) / 2,
      y: (startPosition - (Math.random() * startPosition) / 2 + H) / 2,
      canvas,
      size: Math.floor(Math.random() * 10)
    });
    dots.push(dot);
    dot.render(context);
  }
}

function step(nextPoints) {
  dots.forEach((dot, i) => {
    dot.changePotison(nextPoints[i].x, nextPoints[i].y);
  });
}

function draw() {
  init(points1);
  setTimeout(() => {
    step(points1);
  }, 1000);
  setTimeout(() => {
    init(points2);
    step(points2);
  }, 5000);
  setTimeout(() => {
    init(points3);
    step(points3);
  }, 7000);
}

function update(dot) {
  dot.update();
}

function animate() {
  context.fillStyle = "rgba(255, 255, 255,0.3)";
  context.fillRect(0, 0, W, H);
  dots.forEach(update);
  requestAnimationFrame(animate);
}
const points1 = getDotPosition("老婆");
const points2 = getDotPosition("下午好");
const points3 = getDotPosition("工作辛苦啦");

draw();
animate();
