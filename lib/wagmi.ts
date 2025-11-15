import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism, polygon } from 'wagmi/chains'
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'

// Configure Wagmi with multiple chains
export const config = createConfig({
  chains: [base, mainnet, optimism, polygon],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    miniAppConnector()
  ],
})

