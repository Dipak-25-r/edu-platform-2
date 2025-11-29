'use client'
import { useState } from 'react'
import Card from '@/components/Card.jsx'
import Button from '@/components/Button.jsx'
import Input from '@/components/Input.jsx'

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, send to actual backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        {/* Mission */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center">
            Our Mission
          </h1>
          <Card>
            <p className="text-lg text-dark/80 leading-relaxed mb-4">
              We believe every student deserves access to world-class learning resources — regardless of where they live or their economic background. This platform was built to democratize education and help Class 11-12 Science students master complex concepts through interactive tools, comprehensive notes, and AI-powered assistance.
            </p>
            <p className="text-lg text-dark/80 leading-relaxed">
              <strong className="text-primary">Our Goal:</strong> Make science and mathematics accessible, understandable, and enjoyable for students worldwide.
            </p>
          </Card>
        </section>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-6 text-center">
            The Story Behind This Platform
          </h2>
          <Card>
            <p className="text-dark/80 leading-relaxed mb-4">
              Started by a student who struggled with visualizing mathematical concepts and understanding complex physics problems, this platform was born from personal need. After spending countless hours searching for quality free resources and tools, the decision was made to build what was missing.
            </p>
            <p className="text-dark/80 leading-relaxed">
              Today, this platform serves students across continents, helping them learn faster, understand deeper, and perform better in their exams — all completely free.
            </p>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-6 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-3">100% Free</h3>
              <p className="text-dark/70">
                No paywalls, no premium tiers. Quality education should never be locked behind a price tag.
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-3">Student-First</h3>
              <p className="text-dark/70">
                Every feature is designed based on actual student needs and feedback. You drive what we build.
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Always Improving</h3>
              <p className="text-dark/70">
                Regular updates, new tools, and fresh content. We're committed to staying relevant and helpful.
              </p>
            </Card>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-6 text-center">
            What Makes Us Different
          </h2>
          <Card>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'No registration required to use tools',
                'No advertisements or distractions',
                'Mobile-optimized for learning on-the-go',
                'Works offline (PWA capability)',
                'Open-source and transparent',
                'Privacy-focused (no data selling)'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary font-bold text-sm">✓</span>
                  </div>
                  <p className="text-dark/80">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Future Goals */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-6 text-center">
            Future Goals
          </h2>
          <Card>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <p className="text-dark/80">Expand to cover more subjects and grade levels</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <p className="text-dark/80">Add video explanations for complex concepts</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <p className="text-dark/80">Develop mobile apps for iOS and Android</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <p className="text-dark/80">Create personalized learning paths with AI</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <p className="text-dark/80">Build a community forum for student collaboration</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <p className="text-dark/80">Partner with schools and educational institutions</p>
              </li>
            </ul>
          </Card>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-3xl font-display font-bold mb-6 text-center">
            Get in Touch
          </h2>
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input"
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="content">Content Error</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows="5"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto">
                Send Message
              </Button>

              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  ✓ Message sent successfully! We'll respond within 48 hours.
                </div>
              )}
            </form>

            <div className="mt-8 pt-8 border-t border-gray-medium">
              <p className="text-sm text-dark/70">
                <strong>Email:</strong> support@eduplatform.com<br />
                <strong>Response time:</strong> Within 48 hours
              </p>
            </div>
          </Card>
        </section>

        {/* Support Section */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/20">
            <h3 className="text-xl font-semibold mb-4">Support This Project</h3>
            <p className="text-dark/80 mb-4">
              This platform runs on passion and limited resources. If you find it helpful, consider:
            </p>
            <ul className="space-y-2 text-dark/80">
              <li>⭐ Sharing with classmates and friends</li>
              <li>💬 Providing feedback and suggestions</li>
              <li>🐛 Reporting bugs and issues</li>
              <li>⭐ Starring the project on GitHub</li>
            </ul>
          </Card>
        </section>
      </div>
    </div>
  )
}
