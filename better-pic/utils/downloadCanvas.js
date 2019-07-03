/**
 *
 * @param {String} fileName Named the pic you'd like
 * @param {HTMLElement} canvas the canvas object you want to donwload from
 */

export default function downloadFile(fileName, canvas) {
  const content = getImgSrc(canvas)
  const aLink = document.createElement('a')
  const blob = base64Img2Blob(content) //new Blob([content]);
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

function getImgSrc(canvas) {
  const dataUrl = canvas.toDataURL('image/png')
  return dataUrl
}

function base64Img2Blob(code) {
  const parts = code.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}
