window.onload = function () {
  draw()
}
function draw() {
  let img = document.getElementById('img');
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  img.style.display = 'none';
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let data = imageData.data

  const invert = function () {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 225 - data[i]; // red
      data[i + 1] = 225 - data[i + 1]; // green
      data[i + 2] = 225 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  }

  const grayscale = function () {
    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  }
  const reset = function () {
    ctx.drawImage(img, 0, 0)
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    data = imageData.data
  }
  var invertbtn = document.getElementById('invertbtn');
  invertbtn.addEventListener('click', invert);
  var grayscalebtn = document.getElementById('grayscalebtn');
  grayscalebtn.addEventListener('click', grayscale);
  var resetbtn = document.getElementById('resetbtn');
  resetbtn.addEventListener('click', reset);
}