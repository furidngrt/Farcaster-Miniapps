import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Farcaster Mini App',
  description: 'A simple Farcaster Mini App with basic features',
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
    'fc:frame:button:1': 'Open App',
    'fc:frame:button:1:action': 'launch',
    'fc:frame:button:1:target': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

