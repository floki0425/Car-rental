function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default LoadingSpinner

