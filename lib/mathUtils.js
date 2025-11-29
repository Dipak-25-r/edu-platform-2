import * as math from 'mathjs'

// Solve linear and polynomial equations
export function solveEquation(equation) {
  try {
    const result = math.evaluate(equation)
    return { success: true, result }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Quadratic formula solver
export function solveQuadratic(a, b, c) {
  const discriminant = b * b - 4 * a * c
  
  if (discriminant < 0) {
    return {
      hasRealRoots: false,
      roots: [
        { real: -b / (2 * a), imaginary: Math.sqrt(-discriminant) / (2 * a) },
        { real: -b / (2 * a), imaginary: -Math.sqrt(-discriminant) / (2 * a) }
      ],
      discriminant
    }
  }
  
  const root1 = (-b + Math.sqrt(discriminant)) / (2 * a)
  const root2 = (-b - Math.sqrt(discriminant)) / (2 * a)
  
  return {
    hasRealRoots: true,
    roots: [root1, root2],
    discriminant,
    vertex: { x: -b / (2 * a), y: -discriminant / (4 * a) }
  }
}

// Matrix operations
export function matrixAdd(matrix1, matrix2) {
  return math.add(math.matrix(matrix1), math.matrix(matrix2)).toArray()
}

export function matrixMultiply(matrix1, matrix2) {
  return math.multiply(math.matrix(matrix1), math.matrix(matrix2)).toArray()
}

export function matrixDeterminant(matrix) {
  return math.det(math.matrix(matrix))
}

export function matrixInverse(matrix) {
  return math.inv(math.matrix(matrix)).toArray()
}

// Trigonometry calculations
export function calculateTrig(angle, unit = 'degrees', func = 'sin') {
  const angleInRad = unit === 'degrees' ? (angle * Math.PI) / 180 : angle
  
  const functions = {
    sin: Math.sin(angleInRad),
    cos: Math.cos(angleInRad),
    tan: Math.tan(angleInRad),
    csc: 1 / Math.sin(angleInRad),
    sec: 1 / Math.cos(angleInRad),
    cot: 1 / Math.tan(angleInRad)
  }
  
  return functions[func]
}

// Statistics calculations
export function calculateStats(data) {
  const sorted = [...data].sort((a, b) => a - b)
  const n = data.length
  
  const mean = math.mean(data)
  const median = math.median(data)
  const std = math.std(data)
  const variance = math.variance(data)
  
  const q1 = math.quantileSeq(sorted, 0.25)
  const q3 = math.quantileSeq(sorted, 0.75)
  
  return {
    mean,
    median,
    mode: calculateMode(data),
    std,
    variance,
    min: Math.min(...data),
    max: Math.max(...data),
    q1,
    q3,
    iqr: q3 - q1,
    count: n
  }
}

function calculateMode(data) {
  const frequency = {}
  let maxFreq = 0
  let modes = []
  
  data.forEach(val => {
    frequency[val] = (frequency[val] || 0) + 1
    if (frequency[val] > maxFreq) {
      maxFreq = frequency[val]
      modes = [val]
    } else if (frequency[val] === maxFreq && !modes.includes(val)) {
      modes.push(val)
    }
  })
  
  return modes.length === data.length ? null : modes
}

// Geometry calculations
export const geometryCalculators = {
  circle: {
    area: (radius) => Math.PI * radius * radius,
    circumference: (radius) => 2 * Math.PI * radius,
    diameter: (radius) => 2 * radius
  },
  rectangle: {
    area: (length, width) => length * width,
    perimeter: (length, width) => 2 * (length + width),
    diagonal: (length, width) => Math.sqrt(length * length + width * width)
  },
  triangle: {
    area: (base, height) => 0.5 * base * height,
    perimeter: (a, b, c) => a + b + c,
    areaHeron: (a, b, c) => {
      const s = (a + b + c) / 2
      return Math.sqrt(s * (s - a) * (s - b) * (s - c))
    }
  },
  sphere: {
    volume: (radius) => (4/3) * Math.PI * Math.pow(radius, 3),
    surfaceArea: (radius) => 4 * Math.PI * radius * radius
  },
  cylinder: {
    volume: (radius, height) => Math.PI * radius * radius * height,
    surfaceArea: (radius, height) => 2 * Math.PI * radius * (radius + height)
  },
  cone: {
    volume: (radius, height) => (1/3) * Math.PI * radius * radius * height,
    surfaceArea: (radius, height) => {
      const slant = Math.sqrt(radius * radius + height * height)
      return Math.PI * radius * (radius + slant)
    }
  },
  cube: {
    volume: (side) => side * side * side,
    surfaceArea: (side) => 6 * side * side
  }
}

// Calculus - numerical derivative
export function numericalDerivative(func, x, h = 0.0001) {
  try {
    const f = math.compile(func)
    const fx1 = f.evaluate({ x: x + h })
    const fx2 = f.evaluate({ x: x - h })
    return (fx1 - fx2) / (2 * h)
  } catch (error) {
    throw new Error('Invalid function')
  }
}

// Calculus - numerical integration (Simpson's rule)
export function numericalIntegral(func, a, b, n = 1000) {
  try {
    const f = math.compile(func)
    const h = (b - a) / n
    let sum = f.evaluate({ x: a }) + f.evaluate({ x: b })
    
    for (let i = 1; i < n; i++) {
      const x = a + i * h
      const multiplier = i % 2 === 0 ? 2 : 4
      sum += multiplier * f.evaluate({ x })
    }
    
    return (h / 3) * sum
  } catch (error) {
    throw new Error('Invalid function')
  }
}
