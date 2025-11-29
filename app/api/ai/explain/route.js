import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { input } = await request.json()

    if (!input) {
      return NextResponse.json(
        { error: 'No input provided' },
        { status: 400 }
      )
    }

    // Integrate with AI service here
    // See solve/route.js for integration examples

    const result = `Explanation of "${input}":\n\n` +
      `This concept is fundamental to understanding... [AI explanation would appear here]\n\n` +
      `Key points:\n` +
      `• Point 1\n` +
      `• Point 2\n` +
      `• Point 3\n\n` +
      `To enable real AI explanations, integrate with OpenAI or similar service.`

    return NextResponse.json({ result })
  } catch (error) {
    console.error('AI Explain Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate explanation' },
      { status: 500 }
    )
  }
}
