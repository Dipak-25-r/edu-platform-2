'use client'
import { useState } from 'react'
import Card from '@/components/Card'
import Button from '@/components/Button'
import LoadingSpinner from '@/components/LoadingSpinner'
import { SparklesIcon, BeakerIcon, DocumentTextIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline'

export default function AIToolsPage() {
  const [selectedTool, setSelectedTool] = useState('solver')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const tools = [
    { id: 'solver', name: 'Equation Solver', icon: <SparklesIcon className="w-6 h-6" />, endpoint: '/api/ai/solve' },
    { id: 'explain', name: 'Concept Explainer', icon: <LightBulbIcon className="w-6 h-6" />, endpoint: '/api/ai/explain' },
    { id: 'summarize', name: 'Summary Generator', icon: <DocumentTextIcon className="w-6 h-6" />, endpoint: '/api/ai/summarize' },
    { id: 'diagram', name: 'Diagram Generator', icon: <ChartBarIcon className="w-6 h-6" />, endpoint: '/api/ai/diagram' },
    { id: 'study', name: 'Study Helper', icon: <BeakerIcon className="w-6 h-6" />, endpoint: '/api/ai/study' }
  ]

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError('Please enter some input')
      return
    }

    setLoading(true)
    setError('')
    setOutput('')

    try {
      const tool = tools.find(t => t.id === selectedTool)
      const response = await fetch(tool.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      })

      const data = await response.json()
      
      if (response.ok) {
        setOutput(data.result)
      } else {
        setError(data.error || 'An error occurred')
      }
    } catch (err) {
      setError('Failed to connect to AI service. Using fallback response.')
      // Fallback responses for demo purposes
      setOutput(getFallbackResponse(selectedTool, input))
    } finally {
      setLoading(false)
    }
  }

  const getFallbackResponse = (tool, input) => {
    const fallbacks = {
      solver: `Step-by-step solution for "${input}":\n\n1. Identify the type of equation\n2. Apply appropriate solving method\n3. Simplify and verify\n\nNote: Connect to OpenAI API for detailed solutions.`,
      explain: `Explanation of "${input}":\n\nThis concept involves understanding the fundamental principles and their applications. Key points include:\n\n• Definition and basic properties\n• Important formulas and relationships\n• Common applications and examples\n\nNote: Connect to AI service for detailed explanations.`,
      summarize: `Summary of the provided text:\n\nKey Points:\n• Main idea 1\n• Main idea 2\n• Main idea 3\n\nConclusion: [Brief conclusion]\n\nNote: Connect to AI service for accurate summaries.`,
      diagram: `Diagram description for "${input}":\n\nA visual representation would include:\n1. Main components\n2. Relationships between elements\n3. Flow or structure\n\nNote: Connect to Mermaid.js or similar service for actual diagram generation.`,
      study: `Study guidance for "${input}":\n\nRecommended approach:\n1. Review core concepts\n2. Practice with examples\n3. Test your understanding\n\nNote: Connect to AI service for personalized study plans.`
    }
    return fallbacks[tool] || 'AI response would appear here'
  }

  const placeholders = {
    solver: 'Enter an equation (e.g., 2x + 5 = 13)',
    explain: 'Enter a concept to explain (e.g., Quantum mechanics)',
    summarize: 'Paste text to summarize...',
    diagram: 'Describe a diagram (e.g., water cycle)',
    study: 'What topic do you need help with?'
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            AI-Powered Learning Assistant
          </h1>
          <p className="text-lg text-dark/70 max-w-2xl mx-auto">
            Get instant help with complex problems and concepts using AI
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tool Selector */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Select AI Tool</h3>
              <div className="space-y-2">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedTool(tool.id)
                      setInput('')
                      setOutput('')
                      setError('')
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      selectedTool === tool.id
                        ? 'bg-primary text-white'
                        : 'bg-gray hover:bg-gray-medium'
                    }`}
                  >
                    {tool.icon}
                    <span className="text-sm font-medium">{tool.name}</span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="mt-6">
              <h4 className="font-semibold text-sm mb-2">💡 Pro Tips</h4>
              <ul className="text-xs text-dark/70 space-y-1">
                <li>• Be specific with your questions</li>
                <li>• Provide context when needed</li>
                <li>• Use AI as a learning aid</li>
                <li>• Verify important results</li>
              </ul>
            </Card>
          </div>

          {/* Main Interface */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <h3 className="text-xl font-semibold mb-4">
                {tools.find(t => t.id === selectedTool)?.name}
              </h3>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholders[selectedTool]}
                className="w-full h-32 px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-4"
              />

              <Button onClick={handleSubmit} disabled={loading} className="w-full md:w-auto">
                {loading ? 'Processing...' : 'Generate Response'}
              </Button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </Card>

            {/* Output */}
            {(loading || output) && (
              <Card>
                <h3 className="text-xl font-semibold mb-4">Response</h3>
                {loading ? (
                  <div className="py-12">
                    <LoadingSpinner />
                    <p className="text-center text-dark/60 mt-4">Generating response...</p>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <div className="p-4 bg-blue-50 rounded-lg whitespace-pre-wrap">
                      {output}
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/20">
          <div className="flex items-start gap-4">
            <SparklesIcon className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">AI Integration Note</h4>
              <p className="text-sm text-dark/70">
                This platform uses fallback responses for demonstration. To enable full AI capabilities:
              </p>
              <ul className="text-sm text-dark/70 mt-2 space-y-1">
                <li>• Add your OpenAI API key to environment variables</li>
                <li>• Or use free alternatives like Hugging Face Inference API</li>
                <li>• See API routes in /app/api/ai/ for implementation details</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
