'use client'
import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { geometryCalculators } from '@/lib/mathUtils'

export default function GeometryCalculator() {
  const [shape, setShape] = useState('circle')
  const [inputs, setInputs] = useState({ radius: 5 })
  const [result, setResult] = useState(null)

  const shapes = {
    circle: {
      name: 'Circle',
      inputs: [{ name: 'radius', label: 'Radius', type: 'number' }],
      calculations: ['area', 'circumference', 'diameter']
    },
    rectangle: {
      name: 'Rectangle',
      inputs: [
        { name: 'length', label: 'Length', type: 'number' },
        { name: 'width', label: 'Width', type: 'number' }
      ],
      calculations: ['area', 'perimeter', 'diagonal']
    },
    triangle: {
      name: 'Triangle',
      inputs: [
        { name: 'base', label: 'Base', type: 'number' },
        { name: 'height', label: 'Height', type: 'number' }
      ],
      calculations: ['area']
    },
    sphere: {
      name: 'Sphere',
      inputs: [{ name: 'radius', label: 'Radius', type: 'number' }],
      calculations: ['volume', 'surfaceArea']
    },
    cylinder: {
      name: 'Cylinder',
      inputs: [
        { name: 'radius', label: 'Radius', type: 'number' },
        { name: 'height', label: 'Height', type: 'number' }
      ],
      calculations: ['volume', 'surfaceArea']
    },
    cube: {
      name: 'Cube',
      inputs: [{ name: 'side', label: 'Side Length', type: 'number' }],
      calculations: ['volume', 'surfaceArea']
    }
  }

  const calculate = () => {
    const currentShape = shapes[shape]
    const calc = geometryCalculators[shape]
    const results = {}

    currentShape.calculations.forEach(calculation => {
      const args = currentShape.inputs.map(input => parseFloat(inputs[input.name]) || 0)
      results[calculation] = calc[calculation](...args)
    })

    setResult(results)
  }

  const updateInput = (name, value) => {
    setInputs({ ...inputs, [name]: value })
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8">Geometry Calculator</h1>
        
        <Card className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Select Shape</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {Object.keys(shapes).map(s => (
              <Button
                key={s}
                variant={shape === s ? 'primary' : 'secondary'}
                onClick={() => {
                  setShape(s)
                  setInputs({})
                  setResult(null)
                }}
              >
                {shapes[s].name}
              </Button>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4">Enter Dimensions</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {shapes[shape].inputs.map(input => (
              <Input
                key={input.name}
                label={input.label}
                type={input.type}
                value={inputs[input.name] || ''}
                onChange={(e) => updateInput(input.name, e.target.value)}
                step="any"
              />
            ))}
          </div>

          <Button onClick={calculate}>
            Calculate
          </Button>
        </Card>

        {result && (
          <Card>
            <h3 className="text-xl font-semibold mb-4">Results</h3>
            <div className="space-y-3">
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-gray rounded-lg">
                  <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="font-mono text-lg text-primary">
                    {value.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
