export const createCanvas = (width = 300, height = 300, id) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    id && (canvas.id = id)
    document.body.appendChild(canvas)
    return canvas
}