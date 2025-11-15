import { NextRequest, NextResponse } from 'next/server'

// In a real application, you would save this to a database
// For this example, we'll just log it
const notificationTokens = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, url } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Notification token is required' },
        { status: 400 }
      )
    }

    // In production, save to database
    // For demo, we'll store in memory
    notificationTokens.set(token, {
      token,
      url,
      createdAt: new Date().toISOString(),
    })

    console.log('Notification token saved:', { token, url })

    return NextResponse.json({
      success: true,
      message: 'Notification token saved successfully',
    })
  } catch (error: any) {
    console.error('Error saving notification token:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save notification token' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Get all saved tokens (for debugging)
  const tokens = Array.from(notificationTokens.values())
  
  return NextResponse.json({
    success: true,
    count: tokens.length,
    tokens,
  })
}

