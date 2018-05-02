export const createCanvas = (width = 300, height = 300, id) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  id && (canvas.id = id)
  document.body.appendChild(canvas)
  return canvas
}

export const hex2rgba = (color, alpha) => {
  let sColor = color.toLowerCase();
  //十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return `rgba( ${sColorChange.join(",")},${alpha} )`
  }
  return sColor;
}