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

export default function PolynomialVisualizer() {
  const [coefficients, setCoefficients] = useState([1, 0, -4, 0]) // x^3 - 4x
  const [degree, setDegree] = useState(3)
  const [plotData, setPlotData] = useState(null)

  const updateDegree = (newDegree) => {
    setDegree(newDegree)
    setCoefficients(new Array(newDegree + 1).fill(0))
    setPlotData(null)
  }

  const updateCoefficient = (index, value) => {
    const newCoeffs = [...coefficients]
    newCoeffs[index] = parseFloat(value) || 0
    setCoefficients(newCoeffs)
  }

  const visualize = () => {
    const xValues = []
    const yValues = []
    
    for (let x = -10; x <= 10; x += 0.1) {
      xValues.push(x)
      let y = 0
      for (let i = 0; i < coefficients.length; i++) {
        y += coefficients[i] * Math.pow(x, degree - i)
      }
      yValues.push(y)
    }

    setPlotData([{
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines',
      line: { color: '#0066FF', width: 3 }
    }])
  }

  const getPolynomialString = () => {
    return coefficients
      .map((coef, i) => {
        const power = degree - i
        if (coef === 0) return ''
        const sign = coef > 0 && i > 0 ? '+' : ''
        const coefStr = Math.abs(coef) === 1 && power > 0 ? '' : Math.abs(coef)
        const xStr = power === 0 ? '' : power === 1 ? 'x' : `x^${power}`
        return `${sign}${coef < 0 ? '-' : ''}${coefStr}${xStr}`
      })
      .filter(Boolean)
      .join(' ')
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-6xl">
        <h1 className="text-4xl font-display font-bold mb-8">Polynomial Visualizer</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <h3 className="text-xl font-semibold mb-4">Polynomial Degree</h3>
              <select
                value={degree}
                onChange={(e) => updateDegree(parseInt(e.target.value))}
                className="input mb-4"
              >
                {[2, 3, 4, 5].map(d => (
                  <option key={d} value={d}>Degree {d}</option>
                ))}
              </select>

              <h3 className="text-xl font-semibold mb-4">Coefficients</h3>
              <div className="space-y-3">
                {coefficients.map((coef, index) => {
                  const power = degree - index
                  return (
                    <Input
                      key={index}
                      label={`x^${power} coefficient`}
                      type="number"
                      value={coef}
                      onChange={(e) => updateCoefficient(index, e.target.value)}
                      step="any"
                    />
                  )
                })}
              </div>

              <Button onClick={visualize} className="w-full mt-4">
                Visualize
              </Button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Equation:</h4>
                <p className="font-mono text-sm">
                  f(x) = {getPolynomialString() || '0'}
                </p>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <h3 className="text-xl font-semibold mb-4">Graph</h3>
              {plotData ? (
                <Plot
                  data={plotData}
                  layout={{
                    autosize: true,
                    title: `f(x) = ${getPolynomialString()}`,
                    xaxis: { title: 'x', zeroline: true },
                    yaxis: { title: 'f(x)', zeroline: true },
                    paper_bgcolor: '#ffffff',
                    plot_bgcolor: '#f9fafb'
                  }}
                  style= width: '100%', height: '500px' 
                  config= responsive: true 
                />
              ) : (
                <div className="h-96 flex items-center justify-center bg-gray rounded-lg">
                  <p className="text-dark/50">Set coefficients and click "Visualize"</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
