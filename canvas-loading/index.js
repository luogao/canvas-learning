import "./index.css";
import CircleLine from "./circleLine";

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

const c1 = new CircleLine({
  canvas: circleLoadingCanvas,
  ctx: circleLoadingContext,
  center,
  radius: loading.size,
  width: loadingTrack.width,
  color: loadingTrack.color,
  startAngle: -Math.PI / 2,
  clockwise: true,
  howLong: {
    total: 100,
    length: 100
  }
});

const c2 = new CircleLine({
  canvas: circleLoadingCanvas,
  ctx: circleLoadingContext,
  center,
  radius: loading.size,
  width: loadingBar.width,
  color: loadingBar.color,
  startAngle: -Math.PI / 2,
  clockwise: true,
  howLong: {
    total: 100,
    length: 10
  },
  animation: {
    duration: 1000,
    end() {
      console.log("animation finished!");
    }
  }
});

c1.render();
c2.render();

// drawLoadingBar(1);
