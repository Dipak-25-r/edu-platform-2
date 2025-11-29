'use client'
import { motion } from 'framer-motion'
import Button from './Button'

export default function Hero({ 
  title, 
  subtitle, 
  description, 
  primaryCTA, 
  secondaryCTA,
  gradient = true 
}) {
  return (
    <section className={`py-20 md:py-32 ${
      gradient 
        ? 'bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white' 
        : 'bg-gray'
    }`}>
      <div className="container-custom">
        <motion.div
          initial= opacity: 0, y: 20 
          animate= opacity: 1, y: 0 
          transition= duration: 0.6 
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${
            gradient ? 'text-white' : 'text-dark'
          }`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-xl md:text-2xl mb-4 ${
              gradient ? 'text-white/90' : 'text-dark/80'
            }`}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              gradient ? 'text-white/80' : 'text-dark/70'
            }`}>
              {description}
            </p>
          )}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCTA}
              {secondaryCTA}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
