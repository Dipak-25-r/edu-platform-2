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

    // Simple word count for demo
    const wordCount = input.split(/\s+/).length

    const result = `Summary (${wordCount} words in original):\n\n` +
      `Main points extracted from the text:\n\n` +
      `1. [Key point 1]\n` +
      `2. [Key point 2]\n` +
      `3. [Key point 3]\n\n` +
      `Conclusion: [Brief conclusion]\n\n` +
      `To enable AI-powered summaries, integrate with a text summarization API.`

    return NextResponse.json({ result })
  } catch (error) {
    console.error('AI Summarize Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
}
