import { NextResponse } from 'next/server';
import { callGeminiAPI, parseGeminiError } from '../../../lib/geminiUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, mode = 'standard', tone, strength = 50, outputFormat = 'paragraph' } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Build optimized prompt
    const prompt = buildParaphrasePrompt(text, mode, tone, strength, outputFormat);

    // Call Gemini API with retry logic
    const result = await callGeminiAPI(apiKey, prompt, { maxRetries: 2 });

    return NextResponse.json({ paraphrased: result });

  } catch (error) {
    console.error('Paraphrase API Error:', error);
    
    // Handle quota errors with user-friendly message
    if (error.isQuotaError) {
      return NextResponse.json(
        { 
          error: 'Our AI service is experiencing high demand. Please wait a moment and try again.',
          retryAfter: 60
        },
        { status: 429 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: error.message || 'Failed to paraphrase text. Please try again.' },
      { status: error.statusCode || 500 }
    );
  }
}

function buildParaphrasePrompt(text, mode, tone, strength, outputFormat) {
  // Optimized prompt - shorter to save tokens
  let instruction = 'Paraphrase this text';

  // Mode
  const modeInstructions = {
    standard: ' naturally',
    formal: ' using professional language',
    simple: ' using simple words',
    creative: ' creatively',
    academic: ' using scholarly tone'
  };
  instruction += modeInstructions[mode] || modeInstructions.standard;

  // Tone
  if (tone && tone !== 'neutral') {
    const toneMap = {
      professional: ' professionally',
      casual: ' casually',
      confident: ' confidently',
      friendly: ' warmly'
    };
    instruction += toneMap[tone] || '';
  }

  // Strength
  if (strength < 33) {
    instruction += '. Light changes only';
  } else if (strength > 66) {
    instruction += '. Rewrite extensively';
  }

  // Format
  if (outputFormat === 'bullets') {
    instruction += '. Use bullet points';
  }

  instruction += '. Keep it concise.\n\n';

  return `${instruction}Text: ${text}`;
}
