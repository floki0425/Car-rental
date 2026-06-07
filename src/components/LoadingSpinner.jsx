function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-16" role="status" aria-live="polite">
      <div className="h-11 w-11 animate-spin rounded-none border-4 border-gray-200 border-t-black shadow-sm"></div>
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default LoadingSpinner
