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

export default function Graph3D() {
  const [equation, setEquation] = useState('x^2 + y^2')
  const [range, setRange] = useState(5)
  const [plotData, setPlotData] = useState(null)
  const [error, setError] = useState('')

  const plot3D = () => {
    setError('')
    try {
      const size = 50
      const step = (2 * range) / size
      const xValues = []
      const yValues = []
      const zValues = []

      for (let i = 0; i <= size; i++) {
        const xRow = []
        const yRow = []
        const zRow = []
        
        for (let j = 0; j <= size; j++) {
          const x = -range + i * step
          const y = -range + j * step
          
          xRow.push(x)
          yRow.push(y)
          
          try {
            const expr = equation
              .replace(/\^/g, '**')
              .replace(/x/g, `(${x})`)
              .replace(/y/g, `(${y})`)
            const z = eval(expr)
            zRow.push(z)
          } catch {
            zRow.push(null)
          }
        }
        
        xValues.push(xRow)
        yValues.push(yRow)
        zValues.push(zRow)
      }

      setPlotData([{
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'surface',
        colorscale: 'Viridis'
      }])
    } catch (err) {
      setError('Invalid equation format')
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-6xl">
        <h1 className="text-4xl font-display font-bold mb-8">3D Graph Plotter</h1>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <h3 className="text-xl font-semibold mb-4">Input</h3>
              
              <Input
                label="Function z = f(x,y)"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="e.g., x^2 + y^2"
              />
              
              <Input
                label="Range (-n to +n)"
                type="number"
                value={range}
                onChange={(e) => setRange(parseFloat(e.target.value))}
              />
              
              <Button onClick={plot3D} className="w-full">
                Plot 3D Graph
              </Button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                <ul className="text-sm space-y-1 text-dark/70">
                  <li>• x^2 + y^2 (paraboloid)</li>
                  <li>• Math.sin(x) * Math.cos(y)</li>
                  <li>• x*y (saddle)</li>
                  <li>• Math.sqrt(x^2 + y^2)</li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card>
              <h3 className="text-xl font-semibold mb-4">3D Visualization</h3>
              {plotData ? (
                <Plot
                  data={plotData}
                  layout={{
                    autosize: true,
                    scene: {
                      xaxis: { title: 'X' },
                      yaxis: { title: 'Y' },
                      zaxis: { title: 'Z' }
                    },
                    title: `z = ${equation}`
                  }}
                  style= width: '100%', height: '600px' 
                  config= responsive: true 
                />
              ) : (
                <div className="h-96 flex items-center justify-center bg-gray rounded-lg">
                  <p className="text-dark/50">Enter equation and click "Plot 3D Graph"</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
