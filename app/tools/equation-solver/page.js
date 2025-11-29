'use client'
import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { solveEquation } from '@/lib/mathUtils'

export default function EquationSolver() {
  const [equation, setEquation] = useState('2*x + 5 = 13')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const solve = () => {
    setError('')
    try {
      // Parse equation (simple implementation)
      const parts = equation.split('=')
      if (parts.length !== 2) {
        setError('Equation must have format: expression = value')
        return
      }

      // Try to solve for x
      const leftSide = parts[0].trim()
      const rightSide = parseFloat(parts[1].trim())

      // Simple linear equation solver
      // For more complex equations, integrate with a proper CAS library
      const xMatch = leftSide.match(/([+-]?\d*\.?\d*)\*?x/)
      const constMatch = leftSide.match(/[+-]\s*\d+(?!.*x)/)

      if (xMatch) {
        const coefficient = xMatch[1] === '' || xMatch[1] === '+' ? 1 : 
                           xMatch[1] === '-' ? -1 : parseFloat(xMatch[1])
        const constant = constMatch ? parseFloat(constMatch[0]) : 0

        const x = (rightSide - constant) / coefficient

        setResult({
          solution: x,
          steps: [
            `Original: ${equation}`,
            `Isolate x: ${coefficient}x = ${rightSide - constant}`,
            `Divide: x = ${rightSide - constant} / ${coefficient}`,
            `Solution: x = ${x}`
          ]
        })
      } else {
        setError('Could not identify variable x in equation')
      }
    } catch (err) {
      setError('Error solving equation')
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8">Equation Solver</h1>
        
        <Card className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Enter Equation</h3>
          <p className="text-dark/70 mb-4">Format: expression = value (e.g., 2*x + 5 = 13)</p>
          
          <Input
            label="Equation"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="e.g., 2*x + 5 = 13"
          />
          
          <Button onClick={solve}>
            Solve Equation
          </Button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
        </Card>

        {result && (
          <Card>
            <h3 className="text-xl font-semibold mb-4">Solution</h3>
            
            <div className="p-6 bg-blue-50 rounded-lg mb-4">
              <div className="text-center">
                <span className="text-lg font-semibold">x = </span>
                <span className="text-3xl font-bold text-primary">
                  {result.solution.toFixed(4)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold mb-2">Steps:</h4>
              {result.steps.map((step, index) => (
                <div key={index} className="p-3 bg-gray rounded font-mono text-sm">
                  {index + 1}. {step}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
