const variants = {
  primary:   'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  danger:    'bg-red-600 text-white hover:bg-red-700',
}

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
