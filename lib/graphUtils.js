// Utility functions for graph generation

export function generateFunctionData(func, xMin, xMax, points = 200) {
  const xValues = []
  const yValues = []
  const step = (xMax - xMin) / points

  for (let x = xMin; x <= xMax; x += step) {
    xValues.push(x)
    try {
      const y = func(x)
      yValues.push(y)
    } catch {
      yValues.push(null)
    }
  }

  return { x: xValues, y: yValues }
}

export function generate3DData(func, xRange, yRange, resolution = 50) {
  const [xMin, xMax] = xRange
  const [yMin, yMax] = yRange
  const xStep = (xMax - xMin) / resolution
  const yStep = (yMax - yMin) / resolution

  const xValues = []
  const yValues = []
  const zValues = []

  for (let i = 0; i <= resolution; i++) {
    const xRow = []
    const yRow = []
    const zRow = []

    for (let j = 0; j <= resolution; j++) {
      const x = xMin + i * xStep
      const y = yMin + j * yStep

      xRow.push(x)
      yRow.push(y)

      try {
        const z = func(x, y)
        zRow.push(z)
      } catch {
        zRow.push(null)
      }
    }

    xValues.push(xRow)
    yValues.push(yRow)
    zValues.push(zRow)
  }

  return { x: xValues, y: yValues, z: zValues }
}

export function findRoots(func, xMin, xMax, tolerance = 0.001) {
  const roots = []
  const step = (xMax - xMin) / 1000

  let prevY = func(xMin)
  for (let x = xMin + step; x <= xMax; x += step) {
    const y = func(x)
    if (prevY * y < 0) {
      // Sign change detected, refine root
      let a = x - step
      let b = x
      while (b - a > tolerance) {
        const mid = (a + b) / 2
        const midY = func(mid)
        if (func(a) * midY < 0) {
          b = mid
        } else {
          a = mid
        }
      }
      roots.push((a + b) / 2)
    }
    prevY = y
  }

  return roots
}
