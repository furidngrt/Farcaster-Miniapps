'use client'

import { useState } from 'react'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

export default function SendTransaction() {
  const { address, isConnected } = useAccount()
  const { sendTransaction, data: hash, isPending, error } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!recipient || !amount) return

    try {
      sendTransaction({
        to: recipient as `0x${string}`,
        value: parseEther(amount),
      })
    } catch (err) {
      console.error('Error sending transaction:', err)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-600">Connect your wallet first to send transactions</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>📤</span> Send Transaction
      </h2>

      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            step="0.000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || isConfirming || !recipient || !amount}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              Sending...
            </span>
          ) : isConfirming ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              Confirming...
            </span>
          ) : (
            '🚀 Send Transaction'
          )}
        </button>
      </form>

      {/* Transaction Status */}
      {hash && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-1">Transaction Hash:</p>
          <p className="text-xs font-mono text-blue-700 break-all">{hash}</p>
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
            ✅ Transaction confirmed!
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm font-semibold text-red-900">Error:</p>
          <p className="text-xs text-red-700 mt-1">{error.message}</p>
        </div>
      )}
    </div>
  )
}

