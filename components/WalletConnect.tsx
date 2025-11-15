'use client'

import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { useState } from 'react'
import { base, mainnet, optimism, polygon } from 'wagmi/chains'

const supportedChains = [base, mainnet, optimism, polygon]

export default function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { data: balance } = useBalance({
    address: address,
  })

  const [showChainSelector, setShowChainSelector] = useState(false)

  const currentChain = supportedChains.find(chain => chain.id === chainId)

  const handleConnect = () => {
    // Use the first connector (miniAppConnector)
    if (connectors[0]) {
      connect({ connector: connectors[0] })
    }
  }

  const handleSwitchChain = (newChainId: number) => {
    switchChain({ chainId: newChainId })
    setShowChainSelector(false)
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>💰</span> Wallet
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700 mb-4">
            Connect your wallet to interact with blockchain features like sending transactions, minting NFTs, and more.
          </p>
          <button
            onClick={handleConnect}
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                Connecting...
              </span>
            ) : (
              '🔗 Connect Wallet'
            )}
          </button>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>✓ No wallet selection dialog needed</p>
          <p>✓ Automatically uses your Farcaster wallet</p>
          <p>✓ Secure and seamless</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>💰</span> Wallet Connected
      </h2>

      {/* Wallet Address */}
      <div className="bg-green-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-green-900">Address</span>
          <button
            onClick={() => disconnect()}
            className="text-xs text-red-600 hover:text-red-800 font-medium"
          >
            Disconnect
          </button>
        </div>
        <div className="font-mono text-sm text-green-800 break-all">
          {address}
        </div>
      </div>

      {/* Balance */}
      {balance && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="text-sm font-semibold text-blue-900 mb-1">Balance</div>
          <div className="text-2xl font-bold text-blue-800">
            {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
          </div>
        </div>
      )}

      {/* Chain Selector */}
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-purple-900">Network</span>
          <button
            onClick={() => setShowChainSelector(!showChainSelector)}
            className="text-xs text-purple-600 hover:text-purple-800 font-medium"
          >
            {showChainSelector ? 'Close' : 'Switch'}
          </button>
        </div>
        
        {!showChainSelector ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-purple-800">
              {currentChain?.name || 'Unknown'}
            </span>
          </div>
        ) : (
          <div className="space-y-2 mt-3">
            {supportedChains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => handleSwitchChain(chain.id)}
                disabled={chain.id === chainId}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  chain.id === chainId
                    ? 'bg-purple-200 text-purple-900 font-semibold cursor-default'
                    : 'bg-white text-purple-700 hover:bg-purple-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {chain.id === chainId && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {chain.name}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

