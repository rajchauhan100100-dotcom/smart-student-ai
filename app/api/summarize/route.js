import { NextResponse } from 'next/server';
import { callGeminiAPI } from '../../../lib/geminiUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, mode = 'normal', summaryLength = 50, tone = 'neutral', outputFormat = 'paragraph' } = body;

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

    // Build optimized prompt
    const prompt = buildSummaryPrompt(text, mode, summaryLength, tone, outputFormat);

    // Call Gemini API with retry logic
    const result = await callGeminiAPI(apiKey, prompt, { maxRetries: 2 });

    return NextResponse.json({ summary: result });

  } catch (error) {
    console.error('Summary API Error:', error);
    
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
      { error: error.message || 'Failed to generate summary. Please try again.' },
      { status: error.statusCode || 500 }
    );
  }
}

function buildSummaryPrompt(text, mode, summaryLength, tone, outputFormat) {
  let instruction = `Summarize in ${summaryLength}% length`;

  // Mode
  if (mode === 'detailed') {
    instruction += ', keep key details';
  } else if (mode === 'brief') {
    instruction += ', very brief';
  }

  // Tone
  if (tone === 'formal') {
    instruction += ', formal tone';
  } else if (tone === 'casual') {
    instruction += ', casual tone';
  }

  // Format
  if (outputFormat === 'bullets') {
    instruction += '. Use bullets';
  }

  instruction += '.\n\n';

  return `${instruction}Text: ${text}`;
}
