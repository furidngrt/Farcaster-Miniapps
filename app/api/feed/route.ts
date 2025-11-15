import { NextRequest, NextResponse } from 'next/server'
import { NeynarAPIClient, Configuration } from '@neynar/nodejs-sdk'
import { FeedType } from '@neynar/nodejs-sdk/build/api'

// Initialize Neynar client
const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY || '',
})
const client = new NeynarAPIClient(config)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const fid = searchParams.get('fid')
    const feedType = searchParams.get('feedType') || 'following'
    const limit = parseInt(searchParams.get('limit') || '25')

    if (!fid) {
      return NextResponse.json(
        { error: 'FID is required' },
        { status: 400 }
      )
    }

    // Fetch feed from Neynar
    const response = await client.fetchFeed({
      feedType: feedType as FeedType,
      fid: parseInt(fid),
      withRecasts: true,
      limit,
    })

    return NextResponse.json({
      success: true,
      feed: response,
    })
  } catch (error: any) {
    console.error('Error fetching feed:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}

