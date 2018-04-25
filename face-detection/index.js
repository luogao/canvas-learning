window.onload = function () {
  const video = document.getElementById('video')
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const image = new Image()
  let scale = 1
  canvas.width = video.width
  canvas.height = video.height

  navigator.mediaDevices.getUserMedia({
    video: true,
  }).then(mediaStream => {
    video.srcObject = mediaStream
  })

  const detect = () => {
    if (window.FaceDetector == undefined) {
      console.error('Face Detection not supported')
      return
    }
    const faceDetector = new FaceDetector()
    console.time('detect')
    return faceDetector.detect(image)
      .then(faces => {
        console.log(faces)      // Draw the faces on the <canvas>.
        ctx.lineWidth = 2
        ctx.strokeStyle = "red"
        if (faces.length > 0) {
          ctx.beginPath()
          ctx.moveTo(0, 0)
          for (let i = 0; i < faces.length; i++) {
            let item = faces[i].boundingBox
            ctx.rect(Math.floor(item.x * scale), Math.floor(item.y * scale), Math.floor(item.width * scale), Math.floor(item.height * scale))
            ctx.stroke()
          }
        }
        console.timeEnd('detect')
      })
      .catch((e) => console.error("Boo, Face Detection failed: " + e))
  }

  const draw = () => {
    ctx.drawImage(video, 0, 0, video.width, video.height)
    image.src = canvas.toDataURL('image/png')
    image.onload = function () {
      scale = canvas.width / image.width
      detect()
    }
  }

  setInterval(draw, 100)
}
