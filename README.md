# Farcaster Mini App Starter

Complete Mini App example with wallet, notifications, and all SDK features.

## Quick Start

```bash
npm install
cp .env.example .env
# Add your NEYNAR_API_KEY
npm run dev
```

Open in Farcaster app at `http://localhost:3000`

## Features

- Wallet integration (send ETH, batch transactions, multi-chain)
- User profiles from Farcaster
- Notifications
- Haptic feedback & SDK actions

## Deploy

Works anywhere Next.js runs. Set these env vars:
- `NEYNAR_API_KEY`
- `NEXT_PUBLIC_APP_URL`

## Publishing

Update `public/.well-known/farcaster.json` with your app info, then deploy.

## Docs

- Full documentation: [llms-full.txt](./llms-full.txt)
- Mini Apps: [miniapps.farcaster.xyz](https://miniapps.farcaster.xyz/)
- Neynar: [docs.neynar.com](https://docs.neynar.com/)
