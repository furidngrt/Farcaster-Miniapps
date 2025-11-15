import { NeynarAPIClient, Configuration } from '@neynar/nodejs-sdk'

// Singleton Neynar client instance
let client: NeynarAPIClient | null = null

export function getNeynarClient(): NeynarAPIClient {
  if (!client) {
    const config = new Configuration({
      apiKey: process.env.NEYNAR_API_KEY || '',
    })
    client = new NeynarAPIClient(config)
  }
  return client
}

// Helper functions
export async function fetchUserByFid(fid: number) {
  const client = getNeynarClient()
  const response = await client.fetchBulkUsers({ fids: [fid] })
  return response.users[0]
}

export async function fetchUserFeed(fid: number, limit: number = 25) {
  const client = getNeynarClient()
  return await client.fetchFeed({
    feedType: 'following' as any,
    fid,
    withRecasts: true,
    limit,
  })
}

export async function sendNotification({
  targetFids = [],
  title,
  body,
  targetUrl,
}: {
  targetFids?: number[]
  title: string
  body: string
  targetUrl: string
}) {
  const client = getNeynarClient()
  return await client.publishFrameNotifications({
    targetFids,
    notification: {
      title,
      body,
      target_url: targetUrl,
    },
  })
}

