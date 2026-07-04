import AppKit
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let canvasW = 1200
let canvasH = 900
let outPath = "content_works/ipa_sg/video/assets_common/draft/scene-entrance.png"

var seed: UInt64 = 0x5C3E_2026_0704
func rand01() -> CGFloat {
    seed = seed &* 6364136223846793005 &+ 1442695040888963407
    return CGFloat((seed >> 32) & 0xFFFF) / 65535.0
}

func jitter(_ amount: CGFloat) -> CGFloat {
    (rand01() - 0.5) * amount * 2.0
}

func color(_ r: CGFloat, _ g: CGFloat, _ b: CGFloat, _ a: CGFloat = 1.0) -> CGColor {
    CGColor(srgbRed: r / 255.0, green: g / 255.0, blue: b / 255.0, alpha: a)
}

func polygonPath(_ points: [CGPoint], close: Bool = true) -> CGMutablePath {
    let path = CGMutablePath()
    guard let first = points.first else { return path }
    path.move(to: first)
    for p in points.dropFirst() {
        path.addLine(to: p)
    }
    if close {
        path.closeSubpath()
    }
    return path
}

func roundedPath(_ rect: CGRect, radius: CGFloat) -> CGPath {
    CGPath(roundedRect: rect, cornerWidth: radius, cornerHeight: radius, transform: nil)
}

func wobbledPolyline(_ points: [CGPoint], close: Bool) -> CGMutablePath {
    let path = CGMutablePath()
    guard points.count > 1 else { return path }
    let allPoints = close ? points + [points[0]] : points
    path.move(to: allPoints[0])
    for index in 0..<(allPoints.count - 1) {
        let a = allPoints[index]
        let b = allPoints[index + 1]
        let dx = b.x - a.x
        let dy = b.y - a.y
        let len = max(1.0, hypot(dx, dy))
        let nx = -dy / len
        let ny = dx / len
        let steps = max(3, Int(len / 34.0))
        for step in 1...steps {
            let t = CGFloat(step) / CGFloat(steps)
            let amp: CGFloat = (step == steps) ? 0.0 : 1.8
            let p = CGPoint(
                x: a.x + dx * t + nx * jitter(amp),
                y: a.y + dy * t + ny * jitter(amp)
            )
            path.addLine(to: p)
        }
    }
    if close {
        path.closeSubpath()
    }
    return path
}

func ellipsePath(cx: CGFloat, cy: CGFloat, rx: CGFloat, ry: CGFloat, wobble: CGFloat = 1.0) -> CGMutablePath {
    let path = CGMutablePath()
    let count = 80
    for i in 0...count {
        let t = CGFloat(i) / CGFloat(count) * CGFloat.pi * 2.0
        let wr = 1.0 + jitter(0.009 * wobble)
        let p = CGPoint(x: cx + cos(t) * rx * wr, y: cy + sin(t) * ry * wr)
        if i == 0 {
            path.move(to: p)
        } else {
            path.addLine(to: p)
        }
    }
    path.closeSubpath()
    return path
}

let colorSpace = CGColorSpaceCreateDeviceRGB()
guard let ctx = CGContext(
    data: nil,
    width: canvasW,
    height: canvasH,
    bitsPerComponent: 8,
    bytesPerRow: 0,
    space: colorSpace,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else {
    fatalError("Could not create bitmap context")
}

ctx.setAllowsAntialiasing(true)
ctx.setShouldAntialias(true)
ctx.setFillColor(color(255, 255, 255))
ctx.fill(CGRect(x: 0, y: 0, width: canvasW, height: canvasH))

ctx.translateBy(x: 0, y: CGFloat(canvasH))
ctx.scaleBy(x: 1, y: -1)
ctx.translateBy(x: 80, y: 0)
ctx.translateBy(x: 560, y: 440)
ctx.scaleBy(x: 1.18, y: 1.18)
ctx.translateBy(x: -560, y: -440)

func pencilFill(_ path: CGPath, base: CGColor, texture: CGColor, spacing: CGFloat = 8.0) {
    ctx.saveGState()
    ctx.addPath(path)
    ctx.setFillColor(base)
    ctx.fillPath()
    ctx.restoreGState()

    ctx.saveGState()
    ctx.addPath(path)
    ctx.clip()
    ctx.setLineCap(.round)
    ctx.setLineWidth(2.0)
    ctx.setStrokeColor(texture)
    var x: CGFloat = -760
    while x < CGFloat(canvasW) + 760 {
        let offset = jitter(2.2)
        ctx.move(to: CGPoint(x: x + offset, y: CGFloat(canvasH) + 90))
        ctx.addLine(to: CGPoint(x: x + 760 + offset, y: -90))
        ctx.strokePath()
        x += spacing + jitter(0.9)
    }
    ctx.restoreGState()
}

func stroke(_ path: CGPath, width: CGFloat = 5.6) {
    ctx.saveGState()
    ctx.addPath(path)
    ctx.setLineCap(.round)
    ctx.setLineJoin(.round)
    ctx.setLineWidth(width)
    ctx.setStrokeColor(color(20, 22, 24))
    ctx.strokePath()
    ctx.restoreGState()
}

func fillAndStrokePolygon(_ points: [CGPoint], base: CGColor, texture: CGColor, lineWidth: CGFloat = 5.6) {
    pencilFill(polygonPath(points), base: base, texture: texture)
    stroke(wobbledPolyline(points, close: true), width: lineWidth)
}

func fillAndStrokeRounded(_ rect: CGRect, radius: CGFloat, base: CGColor, texture: CGColor, lineWidth: CGFloat = 5.6) {
    let path = roundedPath(rect, radius: radius)
    pencilFill(path, base: base, texture: texture)
    stroke(path, width: lineWidth)
}

func fillAndStrokeEllipse(cx: CGFloat, cy: CGFloat, rx: CGFloat, ry: CGFloat, base: CGColor, texture: CGColor, lineWidth: CGFloat = 5.2) {
    pencilFill(ellipsePath(cx: cx, cy: cy, rx: rx, ry: ry, wobble: 0.0), base: base, texture: texture, spacing: 7.0)
    stroke(ellipsePath(cx: cx, cy: cy, rx: rx, ry: ry, wobble: 1.0), width: lineWidth)
}

let black = color(20, 22, 24)
let grayBase = color(218, 224, 226)
let grayTexture = color(159, 168, 174, 0.18)
let grayLight = color(235, 240, 241)
let grayLightTexture = color(174, 184, 190, 0.14)
let graySide = color(199, 208, 212)
let graySideTexture = color(143, 154, 161, 0.16)
let blueBase = color(150, 213, 244)
let blueTexture = color(86, 163, 215, 0.18)
let blueGlass = color(183, 228, 248)
let blueGlassTexture = color(91, 172, 214, 0.16)
let greenBase = color(160, 224, 174)
let greenTexture = color(84, 172, 105, 0.18)
let yellowBase = color(248, 215, 86)
let yellowTexture = color(201, 156, 34, 0.18)

// A single soft floor patch anchors the entrance equipment without becoming a separate background scene.
let floorPatch = ellipsePath(cx: 620, cy: 703, rx: 420, ry: 48, wobble: 0.0)
ctx.saveGState()
ctx.addPath(floorPatch)
ctx.setFillColor(color(230, 235, 237, 0.45))
ctx.fillPath()
ctx.restoreGState()

// Flapper gate behind the reception counter.
let gateLeftTop = [
    CGPoint(x: 603, y: 260), CGPoint(x: 675, y: 244),
    CGPoint(x: 709, y: 276), CGPoint(x: 638, y: 294)
]
let gateLeftFront = [
    CGPoint(x: 638, y: 294), CGPoint(x: 709, y: 276),
    CGPoint(x: 707, y: 610), CGPoint(x: 638, y: 637)
]
let gateLeftSide = [
    CGPoint(x: 603, y: 260), CGPoint(x: 638, y: 294),
    CGPoint(x: 638, y: 637), CGPoint(x: 603, y: 593)
]

let gateRightTop = [
    CGPoint(x: 807, y: 251), CGPoint(x: 880, y: 267),
    CGPoint(x: 849, y: 300), CGPoint(x: 779, y: 282)
]
let gateRightFront = [
    CGPoint(x: 779, y: 282), CGPoint(x: 849, y: 300),
    CGPoint(x: 847, y: 636), CGPoint(x: 779, y: 611)
]
let gateRightSide = [
    CGPoint(x: 849, y: 300), CGPoint(x: 880, y: 267),
    CGPoint(x: 880, y: 591), CGPoint(x: 847, y: 636)
]

fillAndStrokePolygon(gateLeftSide, base: graySide, texture: graySideTexture)
fillAndStrokePolygon(gateLeftTop, base: grayLight, texture: grayLightTexture)
fillAndStrokePolygon(gateLeftFront, base: grayBase, texture: grayTexture)

fillAndStrokePolygon(gateRightSide, base: graySide, texture: graySideTexture)
fillAndStrokePolygon(gateRightTop, base: grayLight, texture: grayLightTexture)
fillAndStrokePolygon(gateRightFront, base: grayBase, texture: grayTexture)

let flapLeft = [
    CGPoint(x: 681, y: 364), CGPoint(x: 736, y: 382),
    CGPoint(x: 737, y: 532), CGPoint(x: 682, y: 506)
]
let flapRight = [
    CGPoint(x: 805, y: 372), CGPoint(x: 752, y: 386),
    CGPoint(x: 752, y: 532), CGPoint(x: 806, y: 510)
]
fillAndStrokePolygon(flapLeft, base: blueGlass, texture: blueGlassTexture, lineWidth: 4.6)
fillAndStrokePolygon(flapRight, base: blueGlass, texture: blueGlassTexture, lineWidth: 4.6)

fillAndStrokeRounded(CGRect(x: 623, y: 322, width: 44, height: 36), radius: 12, base: greenBase, texture: greenTexture, lineWidth: 4.0)
fillAndStrokeRounded(CGRect(x: 804, y: 324, width: 44, height: 36), radius: 12, base: greenBase, texture: greenTexture, lineWidth: 4.0)

// Reception counter in the foreground.
let counterTop = [
    CGPoint(x: 166, y: 438), CGPoint(x: 524, y: 404),
    CGPoint(x: 615, y: 462), CGPoint(x: 249, y: 504)
]
let counterFront = [
    CGPoint(x: 249, y: 504), CGPoint(x: 615, y: 462),
    CGPoint(x: 613, y: 684), CGPoint(x: 249, y: 714)
]
let counterSide = [
    CGPoint(x: 166, y: 438), CGPoint(x: 249, y: 504),
    CGPoint(x: 249, y: 714), CGPoint(x: 168, y: 646)
]

fillAndStrokePolygon(counterSide, base: graySide, texture: graySideTexture)
fillAndStrokePolygon(counterTop, base: grayLight, texture: grayLightTexture)
fillAndStrokePolygon(counterFront, base: grayBase, texture: grayTexture)

let insetPanel = [
    CGPoint(x: 308, y: 542), CGPoint(x: 551, y: 517),
    CGPoint(x: 551, y: 641), CGPoint(x: 308, y: 665)
]
fillAndStrokePolygon(insetPanel, base: color(238, 244, 245), texture: color(163, 174, 181, 0.10), lineWidth: 4.3)

// A small reception bell and a card stand are enough to identify the counter without text.
fillAndStrokeEllipse(cx: 411, cy: 408, rx: 48, ry: 18, base: yellowBase, texture: yellowTexture, lineWidth: 4.6)
let bellDome = ellipsePath(cx: 411, cy: 382, rx: 42, ry: 34, wobble: 0.0)
ctx.saveGState()
ctx.addPath(bellDome)
ctx.clip(to: CGRect(x: 360, y: 348, width: 105, height: 64))
ctx.restoreGState()
let bellDomePoints = [
    CGPoint(x: 369, y: 407), CGPoint(x: 382, y: 365),
    CGPoint(x: 411, y: 349), CGPoint(x: 440, y: 365),
    CGPoint(x: 453, y: 407)
]
fillAndStrokePolygon(bellDomePoints, base: yellowBase, texture: yellowTexture, lineWidth: 4.6)
fillAndStrokeEllipse(cx: 411, cy: 347, rx: 9, ry: 8, base: yellowBase, texture: yellowTexture, lineWidth: 3.5)

let cardStand = [
    CGPoint(x: 230, y: 403), CGPoint(x: 316, y: 395),
    CGPoint(x: 330, y: 438), CGPoint(x: 245, y: 448)
]
fillAndStrokePolygon(cardStand, base: blueBase, texture: blueTexture, lineWidth: 4.4)

// Simple trim lines on the equipment keep the drawing readable as connected parts.
ctx.saveGState()
ctx.setLineCap(.round)
ctx.setLineJoin(.round)
ctx.setLineWidth(4.2)
ctx.setStrokeColor(black)
ctx.addPath(wobbledPolyline([CGPoint(x: 327, y: 586), CGPoint(x: 535, y: 565)], close: false))
ctx.strokePath()
ctx.addPath(wobbledPolyline([CGPoint(x: 327, y: 622), CGPoint(x: 535, y: 601)], close: false))
ctx.strokePath()
ctx.addPath(wobbledPolyline([CGPoint(x: 638, y: 441), CGPoint(x: 707, y: 422)], close: false))
ctx.strokePath()
ctx.addPath(wobbledPolyline([CGPoint(x: 779, y: 421), CGPoint(x: 847, y: 442)], close: false))
ctx.strokePath()
ctx.restoreGState()

guard let image = ctx.makeImage() else {
    fatalError("Could not make image")
}

let url = URL(fileURLWithPath: outPath)
guard let dest = CGImageDestinationCreateWithURL(url as CFURL, UTType.png.identifier as CFString, 1, nil) else {
    fatalError("Could not create destination")
}
CGImageDestinationAddImage(dest, image, nil)
if !CGImageDestinationFinalize(dest) {
    fatalError("Could not write PNG")
}
