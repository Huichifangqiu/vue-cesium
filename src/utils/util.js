// import specialProps from '../utils/specialProps'

const toString = Object.prototype.toString

export const checkType = (val) => Object.prototype.toString.call(val).slice(8, -1)

export const toKebabCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^-/, '')

export const clone = (object, deep) => {
  if (object === null || typeof object !== 'object') {
    return object
  }

  deep = deep || false

  var result = new object.constructor()
  for (var propertyName in object) {
    if (object.hasOwnProperty(propertyName)) {
      var value = object[propertyName]
      if (deep) {
        value = clone(value, deep)
      }
      result[propertyName] = value
    }
  }

  return result
}

export function getString (arrayBuffer, encoding) {
  if (!(arrayBuffer instanceof Uint8Array) && !(arrayBuffer instanceof ArrayBuffer) && arrayBuffer.buffer) {
    arrayBuffer = arrayBuffer.buffer
  }
  var decoder = new TextDecoder(encoding)
  var decodedText = decoder.decode(arrayBuffer, { stream: true })
  return decodedText
}

export function isEmptyObj (o) {
  for (var attr in o) return !1
  return !0
}
/**
 * 通过 class 名获取 Dom 元素。
 * @param {Array<Element>} htmlCollection Dom元素集合。
 * @param {String} className class 名称。
 */
export const getDocumentByClassName = (htmlCollection, className) => {
  let temp
  const BreakException = {}
  try {
    Array.prototype.slice.call(htmlCollection).forEach((element) => {
      if (element.className === className) {
        temp = element
        throw BreakException
      }
    })
  } catch (e) {
    if (e !== BreakException) throw e
  }
  return temp
}
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray (val) {
  return toString.call(val) === '[object Array]'
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject (val) {
  return val !== null && typeof val === 'object'
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
export function isString (val) {
  return typeof val === 'string'
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
export function isNumber (val) {
  return typeof val === 'number'
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
export function isUndefined (val) {
  return typeof val === 'undefined'
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
export function isFunction (val) {
  return toString.call(val) === '[object Function]'
}
/**
 * 验证是否是经纬度。
 * @param {Number} longitude
 * @param {Number} latitude
 * @returns {Boolean}
 */
export function lnglatValidator (longitude, latitude) {
  // 经度，整数部分为0-180小数部分为0到6位
  const longreg = /^(-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,15})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,15}|180)$/
  if (!longreg.test(longitude)) {
    return false
  } // 纬度,整数部分为0-90小数部分为0到6位
  const latreg = /^(-|\+)?([0-8]?\d{1}\.\d{0,15}|90\.0{0,15}|[0-8]?\d{1}|90)$/
  if (!latreg.test(latitude)) {
    return false
  }
  return true
}
// /**
//  * 普通对象 {x: number, y: number } 转换为 Cesium.Cartesian2 对象
//  * @param {Object} val
//  * @returns {Object}
//  */
// export function makeCartesian2 (val) {
//   return val && new Cesium.Cartesian2(val.x, val.y)
// }

// /**
//  * 普通对象 {x: number, y: number, z: number } 转换为 Cesium.Cartesian3 对象
//  * @param {Object} val
//  * @returns {Object}
//  */
// export function makeCartesian3 (val) {
//   if (typeof val === 'function') {
//     return new Cesium.CallbackProperty(val, false)
//   } else if (val && Object.prototype.hasOwnProperty.call(val, 'x')) {
//     return new Cesium.Cartesian3(val.x, val.y, val.z)
//   } else if (val && Object.prototype.hasOwnProperty.call(val, 'lng')) {
//     return Cesium.Cartesian3.fromDegrees(val.lng, val.lat, val.height)
//   }
//   return val
// }

// /**
//  * 普通数组 [lng, lat, height, ……，lng, lat, height] 转换为 Cesium.Cartesian3 数组
//  * @param {Array} val
//  * @returns {Array<Cartesian3>}
//  */
// export function makeCartesian3Array (vals) {
//   if ((vals && vals instanceof Array && vals[0] instanceof Cesium.Cartesian3) || vals._callback) {
//     return vals
//   }

//   const coordinates = []
//   vals.forEach((item) => {
//     coordinates.push(item.lng)
//     coordinates.push(item.lat)
//     coordinates.push(item.height)
//   })

//   return coordinates.length >= 3 ? Cesium.Cartesian3.fromDegreesArrayHeights(coordinates) : vals
// }
// /**
//  * 普通数组 [lng, lat, ……，lng, lat] 转换为 Cesium.Cartesian2 数组
//  * @param {Array} vals
//  * @returns {Array<Cartesian2>}
//  */
// export function makeCartesian2Array (vals) {
//   const cartesian2Array = []
//   vals.forEach((item) => {
//     cartesian2Array.push(new Cesium.Cartesian2(item.x, item.y))
//   })
//   return cartesian2Array
// }

// /**
//  *
//  * @param {Object} val
//  */
// export function makeQuaternion (val) {
//   return val.x ? new Cesium.Quaternion(val.x, val.y, val.z, val.w) : val
// }

// /**
//  * 解析 HierarchyJson
//  * @param {Object} val
//  */
// function parsePolygonHierarchyJson (val) {
//   val.forEach((element) => {
//     element.positions = makeCartesian3Array(element.positions)
//     if (element.holes) {
//       parsePolygonHierarchyJson(element.holes)
//     }
//   })
// }

// /**
//  * 普通数组或对象转 Cesium.PolygonHierarchy 对象。
//  * @param {Object|Array} val
//  */
// export function makePolygonHierarchy (val) {
//   if (val instanceof Array && val.length >= 3) {
//     return new Cesium.PolygonHierarchy(makeCartesian3Array(val))
//   }
//   if (Cesium.defined(val.positions)) {
//     val.positions = makeCartesian3Array(val.positions)
//     parsePolygonHierarchyJson(val.holes)
//   }

//   return val
// }
// /**
//  * 普通对象 {near: number, nearValue: number, far: number, farValue: number} 转 Cesium.NearFarScalar 对象。
//  * @param {Object} val
//  * @returns {NearFarScalar}
//  */
// export function makeNearFarScalar (val) {
//   return val && new Cesium.NearFarScalar(val.near, val.nearValue, val.far, val.farValue)
// }
// /**
//  * 普通对象 {near: number, far: number} 转 Cesium.DistanceDisplayCondition 对象。
//  * @param {Object} val
//  * @returns {DistanceDisplayCondition}
//  */
// export function makeDistanceDisplayCondition (val) {
//   return val && new Cesium.DistanceDisplayCondition(val.near, val.far)
// }
// /**
//  * 普通对象或数组 [r, g, b, a] 或字符串转 Cesium.Color 对象。
//  * @param {String|Array|Object} val
//  * @returns {Color}
//  */
// export function makeColor (val) {
//   if (val instanceof Cesium.Color) {
//     return val
//   } else if (val instanceof Array) {
//     return new Cesium.Color(val[0], val[1], val[2], val[3])
//   } else if (typeof val === 'string') {
//     return Cesium.Color.fromCssColorString(val)
//   }
//   return val
// }
// /**
//  * 普通对象或数组 [r, g, b, a] 或字符串转 Material
//  * @param {String|Array|Object} val
//  */
// export function makeMaterial (val) {
//   if (val instanceof Array || (typeof val === 'string' && !/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(val))) {
//     return makeColor(val)
//   } else if (val && val.hasOwnProperty('fabric')) {
//     const f = (obj) => {
//       for (var i in obj) {
//         if (!isArray(obj[i]) && typeof obj[i] === 'object') {
//           f(obj[i])
//         } else {
//           const specialPropsKeys = Object.keys(specialProps)
//           if (specialPropsKeys.indexOf(i) !== -1 && specialProps[i].handler && !isEmptyObj(obj[i])) {
//             const result = specialProps[i].handler.call(this, obj[i])
//             // Cesium 通过对象属性个数判断具体材质类型的，通过 Cesium.combine 移除 vue 传的一些属性
//             obj[i] = Cesium.combine(result, result, true)
//           }
//         }
//       }
//     }
//     f(val)
//     return new Cesium.Material(val)
//   }
//   return val
// }
// /**
//  * 普通对象 {west: number, south: number, east: number, north: number} 转 Cesium.Rectangle 对象。
//  * @param {Object} val
//  * @returns {Rectangle}
//  */
// export function makeRectangle (val) {
//   // Entiy 的 rectangle 属性不能调用这个方法
//   if (val instanceof Cesium.RectangleGraphics) {
//     return val
//   } else if (val instanceof Array && val.length === 4) {
//     return Cesium.Rectangle.fromDegrees(val[0], val[1], val[2], val[3])
//   }
//   return val && Cesium.Rectangle.fromDegrees(val.west, val.south, val.east, val.north)
// }
// /**
//  * 普通对象 {x: number, y: number, width: number, height: number} 转 Cesium.BoundingRectangle 对象。
//  * @param {Object} val
//  * @returns {BoundingRectangle}
//  */
// export function makeBoundingRectangle (val) {
//   return val && new Cesium.BoundingRectangle(val.x, val.y, val.width, val.height)
// }
// /**
//  * 普通对象 {normal: number, distance: number} 转 Cesium.Plane 对象。
//  * @param {Object} val
//  * @returns {Plane}
//  */
// export function makePlane (val) {
//   // Entiy 和 PlaneGraphics 都有个 plane 属性 要区别一下
//   if (val instanceof Cesium.PlaneGraphics) {
//     return val
//   }
//   if (val) {
//     Cesium.Cartesian3.normalize(makeCartesian3(val.normal), val.normal)
//     return new Cesium.Plane(val.normal, val.distance)
//   }
//   return val
// }

// /**
//  * 普通对象转平移、旋转、缩放变换对象。
//  * @param {*} val
//  */
// export function makeTranslationRotationScale (val) {
//   return (
//     val &&
//     new Cesium.TranslationRotationScale(makeCartesian3(val.translation), makeQuaternion(val.rotation), makeCartesian3(val.scale))
//   )
// }

export function dirname (path) {
  if (typeof path !== 'string') path = path + ''
  if (path.length === 0) return '.'
  var code = path.charCodeAt(0)
  var hasRoot = code === 47 /* / */
  var end = -1
  var matchedSlash = true
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i)
    if (code === 47 /* / */) {
      if (!matchedSlash) {
        end = i
        break
      }
    } else {
      // We saw the first non-path separator
      matchedSlash = false
    }
  }

  if (end === -1) return hasRoot ? '/' : '.'
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/'
  }
  return path.slice(0, end)
}

export function Platform () {
  var ua = navigator.userAgent
  var isWindowsPhone = /(?:Windows Phone)/.test(ua)
  var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  var isAndroid = /(?:Android)/.test(ua)
  var isFireFox = /(?:Firefox)/.test(ua)
  var isChrome = /(?:Chrome|CriOS)/.test(ua)
  var isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  var isPhone = /(?:iPhone)/.test(ua) && !isTablet
  var isPc = !isPhone && !isAndroid && !isSymbian
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc,
    isChrome: isChrome
  }
}

export function captureScreenshot (viewer, showSplitter = false) {
  const { when } = Cesium
  const deferred = when.defer()
  const scene = viewer.scene
  var removeCallback = scene.postRender.addEventListener(function () {
    removeCallback()
    try {
      const cesiumCanvas = viewer.scene.canvas

      // If we're using the splitter, draw the split position as a vertical white line.
      let canvas = cesiumCanvas
      // if (showSplitter) {
      //   canvas = document.createElement('canvas')
      //   canvas.width = cesiumCanvas.width
      //   canvas.height = cesiumCanvas.height

      //   const context = canvas.getContext('2d')
      //   context.drawImage(cesiumCanvas, 0, 0)

      //   const x = viewer.splitPosition * cesiumCanvas.width
      //   context.strokeStyle = this.terria.baseMapContrastColor
      //   context.beginPath()
      //   context.moveTo(x, 0)
      //   context.lineTo(x, cesiumCanvas.height)
      //   context.stroke()
      // }

      deferred.resolve(canvas.toDataURL('image/png'))
    } catch (e) {
      deferred.reject(e)
    }
  }, this)

  scene.render(viewer.clock.currentTime)

  return deferred.promise
}

export function getAllAttribution (viewer) {
  const credits = viewer.scene.frameState.creditDisplay._currentFrameCredits.screenCredits.values.concat(
    viewer.scene.frameState.creditDisplay._currentFrameCredits.lightboxCredits.values
  )
  return credits.map((credit) => credit.html)
}

export function drawTriangle (options) {
  if (!options) {
    throw new Error('options is required')
  }
  if (!options.width) {
    throw new Error('options.width is required')
  }
  if (!options.height) {
    throw new Error('options.height is required')
  }
  options.backgroundColor = options.backgroundColor || 'black'
  options.borderColor = options.borderColor || 'orange'
  options.borderWidth = options.borderWidth || 1

  var cv = document.createElement('canvas')
  cv.width = options.width
  cv.height = options.height
  var ctx = cv.getContext('2d')
  ctx.beginPath()
  if (options.direction === 1) { // left
    ctx.moveTo(cv.width, 0)
    ctx.lineTo(0, cv.height / 2)
    ctx.lineTo(cv.width, cv.height)
  } else if (options.direction === 2) { // top
    ctx.moveTo(0, cv.height)
    ctx.lineTo(cv.width / 2, 0)
    ctx.lineTo(cv.width, cv.height)
  } else if (options.direction === 3) { // right
    ctx.moveTo(0, cv.height)
    ctx.lineTo(cv.width, cv.height / 2)
    ctx.lineTo(0, 0)
  } else { // bottom
    ctx.moveTo(0, 0)
    ctx.lineTo(cv.width / 2, cv.height)
    ctx.lineTo(cv.width, 0)
  }
  ctx.lineJoin = 'round' // 两条线交汇时的边角类型（miter 尖角默认  bevel斜角 round 圆角 ）

  if (options.backgroundColor) {
    ctx.fillStyle = options.backgroundColor.toCssColorString()
    ctx.fill()
  }
  if (options.border) {
    ctx.lineWidth = options.borderWidth
    ctx.strokeStyle = options.borderColor.toCssColorString()
    ctx.stroke()
  }
  return cv
}

export function drawText (text, options) {
  options = options || {
    font: '20px sans-serif'
  }
  var backcolor = options.backgroundColor
  var padding = options.padding
  delete options.backgroundColor
  delete options.padding

  var lines = text.split(/[\r]?\n+/)
  var lineImgs = []
  var w = 0; var h = 0
  for (var i = 0; i < lines.length; i++) {
    var tempCv = Cesium.writeTextToCanvas(lines[i], options)
    if (tempCv) {
      lineImgs.push(tempCv)
      h += tempCv.height
      w = Math.max(w, tempCv.width)
    }
  }
  options.backgroundColor = backcolor
  options.padding = padding

  var cv = options.canvas
  if (!cv) {
    w += padding * 2
    h += padding * 2.25
    cv = document.createElement('canvas')
    cv.width = w
    cv.height = h
  }

  var ctx = cv.getContext('2d')
  if (backcolor) {
    ctx.fillStyle = backcolor.toCssColorString()
  } else {
    ctx.fillStyle = undefined
  }

  if (options.border) {
    ctx.lineWidth = options.borderWidth
    ctx.strokeStyle = options.borderColor.toCssColorString()
  }

  if (!options.borderRadius) {
    if (backcolor) {
      ctx.fillRect(0, 0, cv.width, cv.height)
    }

    if (options.border) {
      ctx.strokeRect(0, 0, cv.width, cv.height)
    }
  } else {
    drawRoundedRect({
      x: 0, y: 0, width: cv.width, height: cv.height
    }, options.borderRadius, ctx)
  }

  delete ctx.strokeStyle
  delete ctx.fillStyle
  var y = 0
  for (let i = 0; i < lineImgs.length; i++) {
    ctx.drawImage(lineImgs[i], 0 + padding, y + padding)
    y += lineImgs[i].height
  }
  return cv
}

function drawRoundedRect (rect, r, ctx) {
  ctx.beginPath()

  ctx.moveTo(rect.x + r, rect.y)
  ctx.arcTo(rect.x + rect.width, rect.y, rect.x + rect.width, rect.y + rect.height, r)
  ctx.arcTo(rect.x + rect.width, rect.y + rect.height, rect.x, rect.y + rect.height, r)
  ctx.arcTo(rect.x, rect.y + rect.height, rect.x, rect.y, r)
  ctx.arcTo(rect.x, rect.y, rect.x + r, rect.y, r)

  ctx.fill()
  ctx.stroke()
}

export function getExtension (fileName) {
  var start = fileName.lastIndexOf('.')
  if (start >= 0) {
    return fileName.substring(start, fileName.length)
  }
  return ''
}

export function changeExtension (fname, newExt) {
  return fname.replace(getExtension(fname), newExt)
}

export function readAsArrayBuffer (file) {
  var promise = Cesium.when.defer()
  var fr = new FileReader()
  fr.onload = function (e) {
    promise.resolve(e.target.result)
  }
  fr.onprogress = function (e) {
    promise.progress(e.target.result)
  }
  fr.onerror = function (e) {
    promise.reject(e.error)
  }
  fr.readAsArrayBuffer(file)
  return promise
}

export function readAsText (file) {
  var promise = Cesium.when.defer()
  var fr = new FileReader()
  fr.onload = function (e) {
    promise.resolve(e.target.result)
  }
  fr.onprogress = function (e) {
    promise.progress(e.target.result)
  }
  fr.onerror = function (e) {
    promise.reject(e.error)
  }
  fr.readAsText(file)
  return promise
}

export function readAllBytes (file) {
  var promise = Cesium.when.defer()
  var fr = new FileReader()
  fr.onload = function (e) {
    promise.resolve(new Uint8Array(e.target.result))
  }
  fr.onprogress = function (e) {
    promise.progress(e.target.result)
  }
  fr.onerror = function (e) {
    promise.reject(e.error)
  }
  fr.readAsArrayBuffer(file)
  return promise
}
