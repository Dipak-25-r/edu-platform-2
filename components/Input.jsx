'use client'

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  className = '',
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-dark mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
        {...props}
      />
    </div>
  )
}
