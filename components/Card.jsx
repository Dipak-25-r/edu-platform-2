'use client'

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border border-gray-medium rounded-lg shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}
