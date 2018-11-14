import "./index.css";
import GRender from "./GRender";
import { randomItem } from "../utils";
const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722"
];

const circleLoadingCanvas = document.getElementById("circle-loading");
const circleLoadingContext = circleLoadingCanvas.getContext("2d");
const actionAddBtn = document.getElementById("action-add-btn");
const actionUpdateBtn = document.getElementById("action-update-btn");

const W = (circleLoadingCanvas.width = window.innerWidth / 2);
const H = (circleLoadingCanvas.height = window.innerHeight / 2);

const center = { x: W / 2, y: H / 2 };

const loading = {
  size: 50,
  backgroundColor: "#fff"
};

const loadingBar = {
  width: 10,
  color: "#FFC107"
};

const loadingTrack = {
  width: 10,
  color: "#ccc"
};

const render = new GRender({
  canvas: circleLoadingCanvas,
  ctx: circleLoadingContext,
  children: [
    {
      name: "loading-track",
      type: "circle",
      animation: false,
      data: {
        radius: loading.size,
        center,
        lineWidth: loadingTrack.width,
        color: loadingTrack.color,
        startAngle: -Math.PI / 2,
        howLong: {
          total: 100,
          length: 100
        }
      }
    },
    {
      name: "loading-bar",
      type: "circle",
      animation: {
        duration: 1000,
        end() {
          console.log("animation finished!");
        }
      },
      data: {
        radius: loading.size,
        center,
        lineWidth: loadingBar.width,
        color: loadingBar.color,
        startAngle: -Math.PI / 2,
        howLong: {
          total: 1000,
          length: 900
        }
      }
    },
    {
      name: "test-loading-bar",
      type: "circle",
      animation: {
        duration: 2000,
        end() {
          console.log("test-loading-bar animation finished!");
        }
      },
      data: {
        radius: 90,
        center: {
          x: 200,
          y: 100
        },
        lineWidth: 2,
        color: "red",
        startAngle: -Math.PI / 2,
        howLong: {
          total: 1000,
          length: 900
        }
      }
    }
  ]
});

let count = 1;

actionAddBtn.addEventListener(
  "click",
  function() {
    count++;
    render.setOption({
      name: "loading-bar-" + count,
      type: "circle",
      data: {
        radius: 10 + count * 3,
        center: center,
        lineWidth: 1,
        color: randomItem(colors),
        startAngle: -Math.PI / 2,
        howLong: {
          total: 100,
          length: count
        }
      }
    });
  },
  false
);

actionUpdateBtn.addEventListener(
  "click",
  function() {
    render.setOption({
      name: "test-loading-bar",
      data: {
        radius: 100,
        center: center,
        lineWidth: 10,
        color: randomItem(colors),
        startAngle: -Math.PI / 2,
        howLong: {
          total: 100,
          length: 50
        }
      }
    });
  },
  false
);

let loadingSpeed = 10;
let start = 0;

const loadingFn = () => {
  if (start < 1000) {
    render.setOption({
      name: "loading-bar",
      data: {
        howLong: {
          total: 1000,
          length: start
        }
      }
    });
    start += loadingSpeed;
  } else {
    start = 0;
  }
  requestAnimationFrame(loadingFn);
};

window.onload = function() {
  render.draw();
  loadingFn();
};
