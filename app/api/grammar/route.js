import { NextResponse } from 'next/server';
import { callGeminiAPI } from '../../../lib/geminiUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Optimized prompt
    const prompt = `Fix grammar and spelling. Return corrected text only.\n\nText: ${text}`;

    // Call Gemini API with retry logic
    const result = await callGeminiAPI(apiKey, prompt, { maxRetries: 2 });

    return NextResponse.json({ corrected: result });

  } catch (error) {
    console.error('Grammar API Error:', error);
    
    if (error.isQuotaError) {
      return NextResponse.json(
        { 
          error: 'Our AI service is experiencing high demand. Please wait a moment and try again.',
          retryAfter: 60
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to correct grammar. Please try again.' },
      { status: error.statusCode || 500 }
    );
  }
}
