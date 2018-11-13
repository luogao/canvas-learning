import "./index.css";

const circleLoadingCanvas = document.getElementById("circle-loading");
const circleLoadingContext = circleLoadingCanvas.getContext("2d");

const W = (circleLoadingCanvas.width = window.innerWidth / 2);
const H = (circleLoadingCanvas.height = window.innerHeight / 2);

const loadingSpeed = 0.1;
const center = { x: W / 2, y: H / 2 };

const loading = {
  size: 50,
  backgroundColor: "#fff"
};

const loadingBar = {
  width: 10,
  color: "#000"
};

const loadingTrack = {
  width: 10,
  color: "#ccc"
};

const drawCircleLine = ({
  ctx,
  center = { x: 0, y: 0 },
  radius,
  color,
  width,
  startAngle = 0,
  endAngle = Math.PI * 2,
  clockwise = false
}) => {
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.arc(center.x, center.y, radius, startAngle, endAngle, clockwise);
  ctx.stroke();
  ctx.restore();
};

const drawLoadingTrack = ({
  canvas,
  ctx,
  center = { x: 0, y: 0 },
  radius,
  color,
  width,
  startAngle = 0,
  howLong = {
    total: 100,
    length: 0
  },
  clockwise = false,
  animation = null
}) => {
  if (howLong.total < howLong.length) {
    console.warn("length should less than total");
    return;
  }
  let rad = (Math.PI * 2) / howLong.total;
  let endAngle = startAngle + rad * howLong.length;
  if (animation && animation.duration) {
    const interval = 1000 / 60;
    let timer;
    let step = 0;
    let speed = howLong.length / (animation.duration / interval);
    let _endAngle = startAngle;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 计算角度
      _endAngle = startAngle + rad * step;
      step += speed;
      // 绘制圆圈
      drawCircleLine({
        ctx,
        center,
        radius,
        width,
        color: "#000",
        startAngle,
        endAngle: _endAngle,
        clockwise
      });

      if (step <= howLong.length) {
        timer = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(timer);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCircleLine({
          ctx,
          center,
          radius,
          width,
          color: "#000",
          startAngle,
          endAngle,
          clockwise
        });
      }
    };

    animate();
  } else {
    drawCircleLine({
      ctx,
      center,
      radius,
      width,
      color,
      startAngle,
      endAngle,
      clockwise
    });
  }
};

const drawLoadingBar = progress => {
  circleLoadingContext.save();
  circleLoadingContext.beginPath();
  circleLoadingContext.lineWidth = loadingBar.width;
  circleLoadingContext.strokeStyle = loadingBar.color;
  circleLoadingContext.arc(
    center.x,
    center.y,
    loading.size,
    -Math.PI / 2,
    Math.PI * progress,
    false
  );
  circleLoadingContext.stroke();
  circleLoadingContext.restore();
};

setTimeout(() => {
  drawLoadingTrack({
    canvas: circleLoadingCanvas,
    ctx: circleLoadingContext,
    center,
    radius: loading.size,
    width: loadingTrack.width,
    color: loadingTrack.color,
    startAngle: -Math.PI / 2,
    howLong: {
      total: 100,
      length: 99
    },
    animation: {
      duration: 3000
    }
  });
}, 500);

// drawLoadingBar(1);
