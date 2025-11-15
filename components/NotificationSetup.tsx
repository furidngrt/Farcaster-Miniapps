'use client'

import { useState } from 'react'
import sdk from '@farcaster/frame-sdk'

interface NotificationSetupProps {
  isSDKLoaded: boolean
}

export default function NotificationSetup({ isSDKLoaded }: NotificationSetupProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleAddMiniApp = async () => {
    if (!isSDKLoaded) {
      setMessage('SDK not loaded yet')
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const result = await sdk.actions.addMiniApp()
      
      if (result.added) {
        setIsAdded(true)
        setMessage('✅ Mini App added successfully!')
        
        // If notification token is available, save it to backend
        if (result.notificationDetails) {
          await fetch('/api/notifications/save-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: result.notificationDetails.token,
              url: result.notificationDetails.url,
            })
          })
          
          setMessage('✅ Mini App added! Notifications enabled.')
        }
      } else {
        setMessage('Mini App was not added')
      }
    } catch (error: any) {
      console.error('Error adding Mini App:', error)
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>🔔</span> Notifications
      </h2>
      
      <div className="bg-farcaster-light rounded-lg p-4">
        <p className="text-sm text-gray-700 mb-4">
          Add this Mini App to your collection to receive notifications about updates and new features.
        </p>
        
        {!isAdded ? (
          <button
            onClick={handleAddMiniApp}
            disabled={loading || !isSDKLoaded}
            className="w-full bg-farcaster-purple text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                Adding...
              </span>
            ) : (
              '➕ Add to My Apps'
            )}
          </button>
        ) : (
          <div className="text-center py-3 bg-green-100 text-green-800 rounded-lg font-semibold">
            ✓ Added to your apps!
          </div>
        )}
        
        {message && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${
            message.includes('❌') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

