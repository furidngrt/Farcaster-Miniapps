export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-farcaster-purple mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading Mini App...</h2>
        <p className="text-gray-500 mt-2">Setting up SDK</p>
      </div>
    </div>
  )
}

