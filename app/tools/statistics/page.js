'use client'
import { useState } from 'react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { calculateStats } from '@/lib/mathUtils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function StatisticsCalculator() {
  const [dataInput, setDataInput] = useState('1, 2, 3, 4, 5, 6, 7, 8, 9, 10')
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    try {
      const data = dataInput
        .split(',')
        .map(x => parseFloat(x.trim()))
        .filter(x => !isNaN(x))

      if (data.length === 0) {
        setError('Please enter valid numbers')
        return
      }

      const results = calculateStats(data)
      setStats({ ...results, data })
    } catch (err) {
      setError('Error calculating statistics')
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-6xl">
        <h1 className="text-4xl font-display font-bold mb-8">Statistics Calculator</h1>
        
        <Card className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Enter Data</h3>
          <p className="text-dark/70 mb-4">Enter numbers separated by commas</p>
          
          <textarea
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono"
            placeholder="1, 2, 3, 4, 5..."
          />
          
          <Button onClick={calculate} className="mt-4">
            Calculate Statistics
          </Button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
        </Card>

        {stats && (
          <>
            <Card className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Descriptive Statistics</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Mean', value: stats.mean },
                  { label: 'Median', value: stats.median },
                  { label: 'Mode', value: stats.mode ? stats.mode.join(', ') : 'No mode' },
                  { label: 'Std Dev', value: stats.std },
                  { label: 'Variance', value: stats.variance },
                  { label: 'Min', value: stats.min },
                  { label: 'Max', value: stats.max },
                  { label: 'Q1', value: stats.q1 },
                  { label: 'Q3', value: stats.q3 },
                  { label: 'IQR', value: stats.iqr },
                  { label: 'Count', value: stats.count },
                  { label: 'Range', value: stats.max - stats.min }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray rounded-lg">
                    <div className="text-sm text-dark/60 mb-1">{item.label}</div>
                    <div className="text-xl font-mono font-semibold text-primary">
                      {typeof item.value === 'number' ? item.value.toFixed(4) : item.value}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold mb-4">Data Visualization</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.data.map((value, index) => ({ index: index + 1, value }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" label= value: 'Data Point', position: 'insideBottom', offset: -5  />
                  <YAxis label= value: 'Value', angle: -90, position: 'insideLeft'  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0066FF" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
