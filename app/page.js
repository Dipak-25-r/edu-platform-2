'use client'
import Link from 'next/link'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { motion } from 'framer-motion'
import { 
  BeakerIcon, 
  CalculatorIcon, 
  SparklesIcon,
  BookOpenIcon,
  ChartBarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const features = [
    {
      icon: <CalculatorIcon className="w-12 h-12 text-primary" />,
      title: 'Interactive Math Tools',
      description: 'Graph generators, equation solvers, matrix calculators, and more. Visualize complex concepts instantly.',
      link: '/tools'
    },
    {
      icon: <BookOpenIcon className="w-12 h-12 text-primary" />,
      title: 'Complete Study Notes',
      description: 'Chapter-wise notes for Physics, Chemistry, and Mathematics. Formula sheets and quick revision guides.',
      link: '/notes'
    },
    {
      icon: <SparklesIcon className="w-12 h-12 text-primary" />,
      title: 'AI Learning Assistant',
      description: 'Get instant help with problems, concept explanations, and personalized study assistance powered by AI.',
      link: '/ai-tools'
    }
  ]

  const stats = [
    { label: '100% Free', value: 'Always' },
    { label: 'Math Tools', value: '10+' },
    { label: 'Study Chapters', value: '100+' },
    { label: 'AI Features', value: '5+' }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      class: 'Class 12 Science',
      text: 'The graph plotter helped me understand functions in minutes. Best free tool for students!',
      avatar: '👩‍🎓'
    },
    {
      name: 'Rahul Kumar',
      class: 'Class 11 Science',
      text: 'AI explanations are so clear. I finally understood calculus concepts I struggled with for months.',
      avatar: '👨‍🎓'
    },
    {
      name: 'Ananya Singh',
      class: 'Class 12 Science',
      text: 'The notes are comprehensive and exam-focused. Saved me hours of making my own study material.',
      avatar: '👩‍🎓'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white py-20 md:py-32">
        <div className="container-custom">
          <motion.div
            initial= opacity: 0, y: 20 
            animate= opacity: 1, y: 0 
            transition= duration: 0.6 
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Master Science & Math with Confidence
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90">
              Smart Tools for Smart Students
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Free interactive tools, comprehensive notes, and AI-powered learning for Class 11-12 Science students worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools">
                <Button variant="primary" className="bg-white text-primary hover:bg-gray w-full sm:w-auto">
                  Explore Math Tools
                </Button>
              </Link>
              <Link href="/notes">
                <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                  Browse Notes
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial= opacity: 0, y: 20 
                animate= opacity: 1, y: 0 
                transition= delay: index * 0.1 
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-dark/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-dark/70 max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for science students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial= opacity: 0, y: 20 
                animate= opacity: 1, y: 0 
                transition= delay: index * 0.2 
              >
                <Link href={feature.link}>
                  <Card className="h-full cursor-pointer">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-display font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-dark/70 mb-4">
                      {feature.description}
                    </p>
                    <span className="text-primary font-semibold hover:underline">
                      Learn more →
                    </span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Learn Smarter in 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Choose Your Subject', desc: 'Select from Physics, Chemistry, or Mathematics' },
              { step: '2', title: 'Pick a Tool or Topic', desc: 'Access calculators, notes, or AI helpers' },
              { step: '3', title: 'Learn & Master', desc: 'Practice with instant feedback and explanations' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-dark/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              What Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <div className="text-5xl mb-4">{testimonial.avatar}</div>
                <p className="text-dark/80 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-dark/60">{testimonial.class}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of students mastering science and math
          </p>
          <Link href="/tools">
            <Button variant="primary" className="bg-white text-primary hover:bg-gray">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
