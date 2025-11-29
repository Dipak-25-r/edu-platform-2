'use client'

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  className = ''
}) {
  const baseStyles = 'px-8 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark transform hover:scale-105 hover:shadow-lg active:scale-95',
    secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-white transform hover:scale-105 active:scale-95',
    ghost: 'text-primary hover:bg-gray px-6 py-2'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
