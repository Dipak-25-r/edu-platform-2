'use client'
import ToolCard from '@/components/ToolCard'
import { 
  ChartBarIcon,
  CalculatorIcon,
  CubeIcon,
  CircleStackIcon,
  Square3Stack3DIcon,
  BeakerIcon,
  FunctionIcon,
  ChartPieIcon,
  AcademicCapIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline'

export default function ToolsPage() {
  const tools = [
    {
      icon: <ChartBarIcon className="w-6 h-6 text-primary" />,
      title: 'Graph Plotter',
      description: 'Plot 2D functions with interactive zoom and pan',
      href: '/tools/graph-plotter'
    },
    {
      icon: <CalculatorIcon className="w-6 h-6 text-primary" />,
      title: 'Equation Solver',
      description: 'Solve linear and complex equations instantly',
      href: '/tools/equation-solver'
    },
    {
      icon: <FunctionIcon className="w-6 h-6 text-primary" />,
      title: 'Quadratic Solver',
      description: 'Find roots of quadratic equations with steps',
      href: '/tools/quadratic-solver'
    },
    {
      icon: <CircleStackIcon className="w-6 h-6 text-primary" />,
      title: 'Trigonometry Calculator',
      description: 'Calculate trigonometric values and conversions',
      href: '/tools/trigonometry'
    },
    {
      icon: <Square3Stack3DIcon className="w-6 h-6 text-primary" />,
      title: 'Matrix Calculator',
      description: 'Perform matrix operations and calculations',
      href: '/tools/matrix-calculator'
    },
    {
      icon: <CubeIcon className="w-6 h-6 text-primary" />,
      title: '3D Graph Plotter',
      description: 'Visualize 3D functions and surfaces',
      href: '/tools/3d-graph'
    },
    {
      icon: <BeakerIcon className="w-6 h-6 text-primary" />,
      title: 'Geometry Calculator',
      description: 'Calculate area, volume, and perimeter',
      href: '/tools/geometry'
    },
    {
      icon: <PresentationChartLineIcon className="w-6 h-6 text-primary" />,
      title: 'Polynomial Visualizer',
      description: 'Visualize and analyze polynomial functions',
      href: '/tools/polynomial'
    },
    {
      icon: <AcademicCapIcon className="w-6 h-6 text-primary" />,
      title: 'Calculus Calculator',
      description: 'Compute derivatives and integrals symbolically',
      href: '/tools/calculus'
    },
    {
      icon: <ChartPieIcon className="w-6 h-6 text-primary" />,
      title: 'Statistics Calculator',
      description: 'Calculate mean, median, standard deviation, and more',
      href: '/tools/statistics'
    }
  ]

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Mathematical Tools
          </h1>
          <p className="text-lg text-dark/70 max-w-2xl mx-auto">
            Powerful calculators and visualizers for instant results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </div>
  )
}
