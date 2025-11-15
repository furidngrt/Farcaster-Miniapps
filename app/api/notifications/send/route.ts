import { NextRequest, NextResponse } from 'next/server'
import { NeynarAPIClient, Configuration } from '@neynar/nodejs-sdk'

// Initialize Neynar client
const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY || '',
})
const client = new NeynarAPIClient(config)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { targetFids, title, message, targetUrl } = body

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      )
    }

    // Send notification using Neynar API
    const response = await client.publishFrameNotifications({
      targetFids: targetFids || [], // Empty array = all users who added the app
      notification: {
        title,
        body: message,
        target_url: targetUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Notification sent successfully',
      data: response,
    })
  } catch (error: any) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send notification' },
      { status: 500 }
    )
  }
}

