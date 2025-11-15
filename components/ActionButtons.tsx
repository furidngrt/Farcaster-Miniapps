'use client'

import { useState } from 'react'
import sdk from '@farcaster/frame-sdk'

interface ActionButtonsProps {
  isSDKLoaded: boolean
}

export default function ActionButtons({ isSDKLoaded }: ActionButtonsProps) {
  const [lastAction, setLastAction] = useState<string | null>(null)

  const handleHaptic = (type: 'light' | 'medium' | 'heavy' | 'success') => {
    if (!isSDKLoaded) return
    
    try {
      switch (type) {
        case 'light':
          sdk.actions.haptics?.light()
          break
        case 'medium':
          sdk.actions.haptics?.medium()
          break
        case 'heavy':
          sdk.actions.haptics?.heavy()
          break
        case 'success':
          sdk.actions.haptics?.success()
          break
      }
      setLastAction(`Haptic: ${type}`)
    } catch (error) {
      console.error('Haptic error:', error)
    }
  }

  const handleOpenUrl = () => {
    if (!isSDKLoaded) return
    
    try {
      sdk.actions.openUrl('https://warpcast.com')
      setLastAction('Opened Warpcast')
    } catch (error) {
      console.error('Open URL error:', error)
    }
  }

  const handleShare = () => {
    if (!isSDKLoaded) return
    
    try {
      const shareText = encodeURIComponent('Check out this awesome Mini App! 🚀')
      const shareUrl = encodeURIComponent(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
      sdk.actions.openUrl(
        `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${shareUrl}`
      )
      setLastAction('Opened share dialog')
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  const handleClose = () => {
    if (!isSDKLoaded) return
    
    try {
      sdk.actions.close()
      setLastAction('Closing app...')
    } catch (error) {
      console.error('Close error:', error)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>⚡</span> Actions
      </h2>
      
      {/* Haptic Feedback */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Haptic Feedback</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleHaptic('light')}
            disabled={!isSDKLoaded}
            className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            Light
          </button>
          <button
            onClick={() => handleHaptic('medium')}
            disabled={!isSDKLoaded}
            className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            Medium
          </button>
          <button
            onClick={() => handleHaptic('heavy')}
            disabled={!isSDKLoaded}
            className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            Heavy
          </button>
          <button
            onClick={() => handleHaptic('success')}
            disabled={!isSDKLoaded}
            className="bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            ✓ Success
          </button>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Navigation</h3>
        <div className="space-y-2">
          <button
            onClick={handleOpenUrl}
            disabled={!isSDKLoaded}
            className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            🌐 Open Warpcast
          </button>
          <button
            onClick={handleShare}
            disabled={!isSDKLoaded}
            className="w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-200 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            📤 Share This App
          </button>
        </div>
      </div>

      {/* Close App */}
      <div>
        <button
          onClick={handleClose}
          disabled={!isSDKLoaded}
          className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 disabled:opacity-50 transition-colors text-sm font-medium"
        >
          ✕ Close Mini App
        </button>
      </div>

      {/* Last Action Display */}
      {lastAction && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-600 text-center">
          Last action: <span className="font-semibold">{lastAction}</span>
        </div>
      )}
    </div>
  )
}

