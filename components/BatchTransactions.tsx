'use client'

import { useState } from 'react'
import { useAccount, useSendCalls, useCapabilities } from 'wagmi'
import { parseEther } from 'viem'

export default function BatchTransactions() {
  const { address, isConnected, chainId } = useAccount()
  const { sendCalls, data: callsId, isPending } = useSendCalls()
  const { data: capabilities } = useCapabilities({
    account: address,
  })

  const [recipients, setRecipients] = useState(['', ''])
  const [amounts, setAmounts] = useState(['', ''])

  // Check if batch transactions are supported
  const supportsBatchTransactions = capabilities?.[chainId!]?.atomicBatch?.supported

  const handleSendBatch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!recipients[0] || !amounts[0]) return

    try {
      const calls = recipients
        .map((recipient, index) => {
          if (!recipient || !amounts[index]) return null
          return {
            to: recipient as `0x${string}`,
            value: parseEther(amounts[index]),
          }
        })
        .filter(Boolean) as any[]

      sendCalls({
        calls,
      })
    } catch (err) {
      console.error('Error sending batch:', err)
    }
  }

  const addRecipient = () => {
    setRecipients([...recipients, ''])
    setAmounts([...amounts, ''])
  }

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index))
    setAmounts(amounts.filter((_, i) => i !== index))
  }

  const updateRecipient = (index: number, value: string) => {
    const newRecipients = [...recipients]
    newRecipients[index] = value
    setRecipients(newRecipients)
  }

  const updateAmount = (index: number, value: string) => {
    const newAmounts = [...amounts]
    newAmounts[index] = value
    setAmounts(newAmounts)
  }

  if (!isConnected) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-600">Connect your wallet first to use batch transactions</p>
      </div>
    )
  }

  if (!supportsBatchTransactions) {
    return (
      <div className="bg-yellow-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-yellow-900 mb-2 flex items-center gap-2">
          <span>⚠️</span> Batch Transactions Not Available
        </h2>
        <p className="text-sm text-yellow-800">
          Batch transactions are not supported on the current network or wallet.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <span>⚡</span> Batch Transactions
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Send multiple transactions in one confirmation using EIP-5792
      </p>

      <form onSubmit={handleSendBatch} className="space-y-4">
        {recipients.map((recipient, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Transaction {index + 1}
              </span>
              {recipients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRecipient(index)}
                  className="text-xs text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => updateRecipient(index, e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Amount (ETH)
              </label>
              <input
                type="number"
                step="0.000001"
                value={amounts[index]}
                onChange={(e) => updateAmount(index, e.target.value)}
                placeholder="0.001"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addRecipient}
          className="w-full bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
        >
          ➕ Add Transaction
        </button>

        <button
          type="submit"
          disabled={isPending || !recipients[0] || !amounts[0]}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              Sending Batch...
            </span>
          ) : (
            '🚀 Send All Transactions'
          )}
        </button>
      </form>

      {callsId && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
            ✅ Batch submitted!
          </p>
          <p className="text-xs font-mono text-green-700 mt-2 break-all">{callsId}</p>
        </div>
      )}

      <div className="mt-4 bg-blue-50 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> All transactions are validated and scanned for security. They execute sequentially, not atomically.
        </p>
      </div>
    </div>
  )
}

