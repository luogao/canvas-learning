import "./index.css";
import GRender from "./GRender";

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
        radius: 150,
        center :{
          x: 200,
          y: 100
        },
        lineWidth: 2,
        color: 'red',
        startAngle: -Math.PI / 2,
        howLong: {
          total: 1000,
          length: 900
        }
      }
    }
  ]
});

window.onload = function() {
  render.draw();
};
