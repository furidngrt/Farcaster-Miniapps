'use client'

import { useEffect, useState } from 'react'
import sdk from '@farcaster/frame-sdk'
import UserProfile from '@/components/UserProfile'
import NotificationSetup from '@/components/NotificationSetup'
import ActionButtons from '@/components/ActionButtons'
import LoadingSpinner from '@/components/LoadingSpinner'
import WalletConnect from '@/components/WalletConnect'
import SendTransaction from '@/components/SendTransaction'
import BatchTransactions from '@/components/BatchTransactions'

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)
  const [context, setContext] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initSDK = async () => {
      try {
        // Wait for SDK to be ready
        const ctx = await sdk.context
        setContext(ctx)
        setIsSDKLoaded(true)
        
        // Signal that the app is ready to display
        sdk.actions.ready()
        
        console.log('SDK loaded successfully', ctx)
      } catch (err) {
        console.error('Error loading SDK:', err)
        setError('Failed to load Mini App SDK. This app must be opened in a Farcaster client.')
      }
    }

    initSDK()

    // Listen to SDK events
    sdk.on('contextChanged', (newContext) => {
      console.log('Context changed:', newContext)
      setContext(newContext)
    })

  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-900 mb-2">Error</h1>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    )
  }

  if (!isSDKLoaded || !context) {
    return <LoadingSpinner />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-farcaster-purple rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Simple Mini App
              </h1>
              <p className="text-sm text-gray-500">
                Powered by Farcaster
              </p>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="bg-white shadow-lg p-6 border-b border-gray-200">
          <UserProfile context={context} />
        </div>

        {/* Notification Setup Section */}
        <div className="bg-white shadow-lg p-6 border-b border-gray-200">
          <NotificationSetup isSDKLoaded={isSDKLoaded} />
        </div>

        {/* Wallet Section */}
        <div className="bg-white shadow-lg p-6 border-b border-gray-200">
          <WalletConnect />
        </div>

        {/* Send Transaction Section */}
        <div className="bg-white shadow-lg p-6 border-b border-gray-200">
          <SendTransaction />
        </div>

        {/* Batch Transactions Section */}
        <div className="bg-white shadow-lg p-6 border-b border-gray-200">
          <BatchTransactions />
        </div>

        {/* Action Buttons Section */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          <ActionButtons isSDKLoaded={isSDKLoaded} />
        </div>

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 bg-gray-900 text-white rounded-lg p-4 text-xs overflow-auto">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <pre>{JSON.stringify(context, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  )
}

