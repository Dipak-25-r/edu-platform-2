'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Card from '@/components/Card'
import LoadingSpinner from '@/components/LoadingSpinner'

const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => <LoadingSpinner />
})

export default function GraphPlotter() {
  const [equation, setEquation] = useState('x^2')
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [plotData, setPlotData] = useState(null)
  const [error, setError] = useState('')

  const plotGraph = () => {
    setError('')
    try {
      const xValues = []
      const yValues = []
      const step = (xMax - xMin) / 200

      for (let x = xMin; x <= xMax; x += step) {
        xValues.push(x)
        try {
          // Replace ^ with ** for JavaScript evaluation
          const expr = equation.replace(/\^/g, '**')
          const y = eval(expr.replace(/x/g, `(${x})`))
          yValues.push(y)
        } catch {
          yValues.push(null)
        }
      }

      setPlotData([{
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        line: { color: '#0066FF', width: 3 }
      }])
    } catch (err) {
      setError('Invalid equation format')
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-6xl">
        <h1 className="text-4xl font-display font-bold mb-8">Graph Plotter</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="md:col-span-1">
            <Card>
              <h3 className="text-xl font-semibold mb-4">Input</h3>
              
              <Input
                label="Equation (use x as variable)"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="e.g., x^2, sin(x), 2*x+3"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="X Min"
                  type="number"
                  value={xMin}
                  onChange={(e) => setXMin(parseFloat(e.target.value))}
                />
                <Input
                  label="X Max"
                  type="number"
                  value={xMax}
                  onChange={(e) => setXMax(parseFloat(e.target.value))}
                />
              </div>
              
              <Button onClick={plotGraph} className="w-full">
                Plot Graph
              </Button>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                <ul className="text-sm space-y-1 text-dark/70">
                  <li>• Linear: 2*x + 3</li>
                  <li>• Quadratic: x^2 - 4*x + 3</li>
                  <li>• Cubic: x^3 - 2*x</li>
                  <li>• Trig: Math.sin(x)</li>
                  <li>• Exponential: Math.exp(x)</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Graph Panel */}
          <div className="md:col-span-2">
            <Card>
              <h3 className="text-xl font-semibold mb-4">Graph</h3>
              {plotData ? (
                <Plot
                  data={plotData}
                  layout={{
                    autosize: true,
                    title: `f(x) = ${equation}`,
                    xaxis: { title: 'x' },
                    yaxis: { title: 'f(x)' },
                    paper_bgcolor: '#ffffff',
                    plot_bgcolor: '#f9fafb',
                    font: { family: 'Inter, sans-serif' }
                  }}
                  style= width: '100%', height: '500px' 
                  config= responsive: true 
                />
              ) : (
                <div className="h-96 flex items-center justify-center bg-gray rounded-lg">
                  <p className="text-dark/50">Enter an equation and click "Plot Graph"</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
