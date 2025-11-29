'use client'
import Card from './Card'
import Link from 'next/link'

export default function FeatureCard({ icon, title, description, link }) {
  return (
    <Link href={link}>
      <Card className="h-full cursor-pointer group">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <h3 className="text-2xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-dark/70 mb-4">
          {description}
        </p>
        <span className="text-primary font-semibold group-hover:underline">
          Learn more →
        </span>
      </Card>
    </Link>
  )
}
