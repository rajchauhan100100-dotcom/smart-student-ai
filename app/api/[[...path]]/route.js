import { NextResponse } from 'next/server';
import aiService from '@/lib/aiService';

// Test endpoint
export async function GET(request) {
  return NextResponse.json({ message: 'Smart Student AI Toolkit API is running!' });
}

// AI-powered endpoints
export async function POST(request) {
  try {
    const { pathname } = new URL(request.url);
    const body = await request.json();

    // Text Summarizer
    if (pathname === '/api/summarize') {
      const { text } = body;
      if (!text) {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
      }
      const summary = await aiService.summarizeText(text);
      return NextResponse.json({ summary });
    }

    // Paraphrasing Tool
    if (pathname === '/api/paraphrase') {
      const { text } = body;
      if (!text) {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
      }
      const paraphrased = await aiService.paraphraseText(text);
      return NextResponse.json({ paraphrased });
    }

    // Grammar Corrector
    if (pathname === '/api/correct-grammar') {
      const { text } = body;
      if (!text) {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
      }
      const corrected = await aiService.correctGrammar(text);
      return NextResponse.json({ corrected });
    }

    // Bio Generator
    if (pathname === '/api/generate-bio') {
      const { details } = body;
      if (!details) {
        return NextResponse.json({ error: 'Details are required' }, { status: 400 });
      }
      const bio = await aiService.generateBio(details);
      return NextResponse.json({ bio });
    }

    return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
