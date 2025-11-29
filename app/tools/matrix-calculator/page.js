'use client'
import { useState } from 'react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { matrixAdd, matrixMultiply, matrixDeterminant, matrixInverse } from '@/lib/mathUtils'

export default function MatrixCalculator() {
  const [size, setSize] = useState(2)
  const [matrix, setMatrix] = useState([[1, 2], [3, 4]])
  const [result, setResult] = useState(null)
  const [operation, setOperation] = useState('')
  const [error, setError] = useState('')

  const updateSize = (newSize) => {
    setSize(newSize)
    const newMatrix = Array(newSize).fill(0).map(() => Array(newSize).fill(0))
    setMatrix(newMatrix)
    setResult(null)
  }

  const updateCell = (i, j, value) => {
    const newMatrix = [...matrix]
    newMatrix[i][j] = parseFloat(value) || 0
    setMatrix(newMatrix)
  }

  const calculateDeterminant = () => {
    try {
      const det = matrixDeterminant(matrix)
      setResult(det)
      setOperation('Determinant')
      setError('')
    } catch (err) {
      setError('Error calculating determinant')
    }
  }

  const calculateInverse = () => {
    try {
      const inv = matrixInverse(matrix)
      setResult(inv)
      setOperation('Inverse')
      setError('')
    } catch (err) {
      setError('Matrix is singular (no inverse exists)')
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8">Matrix Calculator</h1>
        
        <Card className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Matrix Size</h3>
          <div className="flex gap-2 mb-6">
            {[2, 3, 4].map(s => (
              <Button
                key={s}
                variant={size === s ? 'primary' : 'secondary'}
                onClick={() => updateSize(s)}
              >
                {s}×{s}
              </Button>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4">Enter Matrix Values</h3>
          <div className="overflow-x-auto">
            <table className="mx-auto">
              <tbody>
                {matrix.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-1">
                        <input
                          type="number"
                          value={cell}
                          onChange={(e) => updateCell(i, j, e.target.value)}
                          className="w-20 px-3 py-2 border border-gray-medium rounded text-center"
                          step="any"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <Button onClick={calculateDeterminant}>
              Calculate Determinant
            </Button>
            <Button onClick={calculateInverse} variant="secondary">
              Calculate Inverse
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
        </Card>

        {result !== null && (
          <Card>
            <h3 className="text-xl font-semibold mb-4">{operation} Result</h3>
            
            {typeof result === 'number' ? (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-mono font-bold text-primary">
                  {result.toFixed(6)}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="mx-auto">
                  <tbody>
                    {result.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="p-2 text-center font-mono">
                            {cell.toFixed(4)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
