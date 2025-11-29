'use client'
import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { numericalDerivative, numericalIntegral } from '@/lib/mathUtils'

export default function CalculusCalculator() {
  const [func, setFunc] = useState('x^2')
  const [operation, setOperation] = useState('derivative')
  const [point, setPoint] = useState(2)
  const [lowerBound, setLowerBound] = useState(0)
  const [upperBound, setUpperBound] = useState(2)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    try {
      if (operation === 'derivative') {
        const derivative = numericalDerivative(func, parseFloat(point))
        setResult({
          type: 'Derivative',
          value: derivative,
          description: `f'(${point}) = ${derivative.toFixed(6)}`
        })
      } else {
        const integral = numericalIntegral(
          func,
          parseFloat(lowerBound),
          parseFloat(upperBound)
        )
        setResult({
          type: 'Definite Integral',
          value: integral,
          description: `∫[${lowerBound}, ${upperBound}] f(x)dx = ${integral.toFixed(6)}`
        })
      }
    } catch (err) {
      setError(err.message || 'Invalid function')
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8">Calculus Calculator</h1>
        
        <Card className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Settings</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-dark mb-2">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="input"
            >
              <option value="derivative">Derivative</option>
              <option value="integral">Definite Integral</option>
            </select>
          </div>

          <Input
            label="Function f(x)"
            value={func}
            onChange={(e) => setFunc(e.target.value)}
            placeholder="e.g., x^2, sin(x), x^3 - 2*x"
          />

          {operation === 'derivative' ? (
            <Input
              label="Point (x value)"
              type="number"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              step="any"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Lower Bound (a)"
                type="number"
                value={lowerBound}
                onChange={(e) => setLowerBound(e.target.value)}
                step="any"
              />
              <Input
                label="Upper Bound (b)"
                type="number"
                value={upperBound}
                onChange={(e) => setUpperBound(e.target.value)}
                step="any"
              />
            </div>
          )}

          <Button onClick={calculate} className="w-full md:w-auto">
            Calculate
          </Button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
        </Card>

        {result && (
          <Card>
            <h3 className="text-xl font-semibold mb-4">{result.type}</h3>
            <div className="p-6 bg-blue-50 rounded-lg text-center">
              <p className="text-3xl font-mono font-bold text-primary mb-2">
                {result.value.toFixed(6)}
              </p>
              <p className="text-dark/70">{result.description}</p>
            </div>
            <p className="text-sm text-dark/60 mt-4">
              Note: Results are computed using numerical methods (finite differences for derivatives, Simpson's rule for integrals)
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
