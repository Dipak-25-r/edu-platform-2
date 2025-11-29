'use client'
import Card from './Card'
import Link from 'next/link'

export default function ToolCard({ icon, title, description, href }) {
  return (
    <Link href={href}>
      <Card className="cursor-pointer group">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-dark/70">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
