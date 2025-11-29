'use client'
import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { calculateTrig } from '@/lib/mathUtils'

export default function TrigonometryCalculator() {
  const [angle, setAngle] = useState(30)
  const [unit, setUnit] = useState('degrees')
  const [results, setResults] = useState(null)

  const calculate = () => {
    const funcs = ['sin', 'cos', 'tan', 'csc', 'sec', 'cot']
    const calculatedResults = {}
    
    funcs.forEach(func => {
      calculatedResults[func] = calculateTrig(parseFloat(angle), unit, func)
    })
    
    setResults(calculatedResults)
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8">Trigonometry Calculator</h1>
        
        <Card className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Input</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Angle"
              type="number"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              step="any"
            />
            
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="input"
              >
                <option value="degrees">Degrees</option>
                <option value="radians">Radians</option>
              </select>
            </div>
          </div>
          
          <Button onClick={calculate}>
            Calculate All Functions
          </Button>
        </Card>

        {results && (
          <Card>
            <h3 className="text-xl font-semibold mb-4">Results</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results).map(([func, value]) => (
                <div key={func} className="p-4 bg-gray rounded-lg">
                  <div className="text-sm text-dark/60 uppercase mb-1">{func}</div>
                  <div className="text-2xl font-mono font-semibold text-primary">
                    {value.toFixed(6)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
