'use client'
import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { solveQuadratic } from '@/lib/mathUtils'

export default function QuadraticSolver() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(-5)
  const [c, setC] = useState(6)
  const [result, setResult] = useState(null)

  const solve = () => {
    const solution = solveQuadratic(parseFloat(a), parseFloat(b), parseFloat(c))
    setResult(solution)
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8">Quadratic Equation Solver</h1>
        
        <Card className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Enter Coefficients</h3>
          <p className="text-dark/70 mb-6">For equation: ax² + bx + c = 0</p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Input
              label="a (coefficient of x²)"
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              step="any"
            />
            <Input
              label="b (coefficient of x)"
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              step="any"
            />
            <Input
              label="c (constant term)"
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              step="any"
            />
          </div>
          
          <Button onClick={solve} className="w-full md:w-auto">
            Solve Equation
          </Button>
        </Card>

        {result && (
          <Card>
            <h3 className="text-xl font-semibold mb-4">Solution</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-mono text-lg mb-2">
                  {a}x² {b >= 0 ? '+' : ''} {b}x {c >= 0 ? '+' : ''} {c} = 0
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Discriminant:</h4>
                <p className="font-mono">
                  Δ = b² - 4ac = {result.discriminant.toFixed(4)}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Roots:</h4>
                {result.hasRealRoots ? (
                  <div className="space-y-2">
                    <p className="font-mono">x₁ = {result.roots[0].toFixed(4)}</p>
                    <p className="font-mono">x₂ = {result.roots[1].toFixed(4)}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="font-mono">
                      x₁ = {result.roots[0].real.toFixed(4)} + {result.roots[0].imaginary.toFixed(4)}i
                    </p>
                    <p className="font-mono">
                      x₂ = {result.roots[1].real.toFixed(4)} + {result.roots[1].imaginary.toFixed(4)}i
                    </p>
                    <p className="text-orange-600 mt-2">Complex roots (no real solutions)</p>
                  </div>
                )}
              </div>

              {result.hasRealRoots && result.vertex && (
                <div>
                  <h4 className="font-semibold mb-2">Vertex:</h4>
                  <p className="font-mono">
                    ({result.vertex.x.toFixed(4)}, {result.vertex.y.toFixed(4)})
                  </p>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Formula Used:</h4>
                <p className="font-mono text-sm">
                  x = (-b ± √(b² - 4ac)) / 2a
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
