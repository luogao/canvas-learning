import "./index.css";
import Dot from "./dot";
import { shuffle } from "../utils";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const W = (canvas.width = window.innerWidth / 2);
const H = (canvas.height = window.innerHeight / 2);
const dots = [];
const lineHeight = 7;
const gridY = 2;
const gridX = 2;
const raduis = 5;

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

function init(maxLength) {
  for (let i = 0; i < maxLength; i++) {
    const dot = new Dot({
      x: Math.ceil(Math.random() * canvas.width),
      y: Math.ceil(Math.random() * canvas.height),
      canvas,
      size: Math.floor(Math.random() * raduis),
      color: "#000"
    });
    dots.push(dot);
    dot.render(context);
  }
}

function step(nextPoints) {
  const _dot = dots.slice(0, nextPoints.length);
  const _restDot = dots.slice(nextPoints.length);
  // const _dot = dots.slice(0, 10);
  // const _restDot = dots.slice(10);
  _restDot.forEach(dot => {
    dot.hide();
  });
  shuffle(_dot).forEach((dot, i) => {
    if (dot.isHidden) {
      dot.show();
    }
    dot.changePotison(nextPoints[i].x, nextPoints[i].y);
  });
}

function draw() {
  setTimeout(() => {
    console.log(1);
    step(points1);
  }, 0);
  setTimeout(() => {
    console.log(2);
    step(points2);
  }, 3000);
  setTimeout(() => {
    console.log(3);
    step(points3);
  }, 6000);
  setTimeout(() => {
    console.log(4);
    step(points4);
  }, 9000);
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
const points1 = getDotPosition("That's All");
const points2 = getDotPosition("Good Bye");
const points3 = getDotPosition("I Love You");
const points4 = getDotPosition("Thanks");
const maxLength = Math.max(points1.length, points2.length, points3.length);
init(maxLength);
setTimeout(draw, 1000);
animate();
