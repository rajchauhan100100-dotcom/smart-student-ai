import { NextResponse } from 'next/server';

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
        { error: 'Gemini API key not configured on server. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Build sophisticated prompt based on mode, tone, and strength
    let prompt = buildParaphrasePrompt(text, mode, tone, strength, outputFormat);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return NextResponse.json(
        { error: data.error?.message || 'Failed to paraphrase text' },
        { status: response.status }
      );
    }

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!result) {
      return NextResponse.json(
        { error: 'No paraphrased text generated. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ paraphrased: result });

  } catch (error) {
    console.error('Paraphrase API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

function buildParaphrasePrompt(text, mode, tone, strength, outputFormat) {
  // Determine rewrite intensity based on strength (0-100 slider)
  let intensityLevel = 'moderate';
  if (strength < 33) {
    intensityLevel = 'minimal';
  } else if (strength > 66) {
    intensityLevel = 'extensive';
  }

  // Base instruction
  let instruction = 'Paraphrase the following text while preserving its original meaning and key information.';

  // Add mode-specific instructions
  const modeInstructions = {
    standard: 'Use clear, natural language that sounds human-written. Maintain a balanced tone.',
    formal: 'Use professional, sophisticated language. Employ formal vocabulary and sentence structures appropriate for business or academic contexts.',
    simple: 'Use simple, easy-to-understand words and short sentences. Make it accessible to a general audience. Avoid jargon and complex terms.',
    creative: 'Use imaginative, engaging language. Feel free to restructure sentences creatively while keeping the core message intact. Make it interesting and dynamic.',
    academic: 'Use scholarly language and formal academic tone. Employ precise terminology, complex sentence structures, and maintain objectivity.'
  };

  instruction += ' ' + (modeInstructions[mode] || modeInstructions.standard);

  // Add tone-specific instruction
  if (tone) {
    const toneInstructions = {
      professional: 'Maintain a professional and businesslike tone throughout.',
      casual: 'Use a friendly, conversational tone as if explaining to a friend.',
      confident: 'Use assertive, decisive language that conveys confidence.',
      friendly: 'Use warm, approachable language that feels welcoming.',
      neutral: 'Keep a balanced, objective tone without emotional coloring.'
    };
    
    if (toneInstructions[tone]) {
      instruction += ' ' + toneInstructions[tone];
    }
  }

  // Add strength-based instruction
  const strengthInstructions = {
    minimal: 'Make light changes - primarily swap out some words with synonyms while keeping most of the sentence structure intact.',
    moderate: 'Make moderate changes - rephrase sentences and restructure some parts while maintaining readability.',
    extensive: 'Make significant changes - completely restructure sentences, use different word choices, and vary the writing style substantially while preserving the exact meaning.'
  };

  instruction += ' ' + strengthInstructions[intensityLevel];

  // Add output format instruction
  if (outputFormat === 'bullets') {
    instruction += ' Format the output as clear bullet points, with each main idea as a separate bullet.';
  } else {
    instruction += ' Format the output as flowing, well-connected paragraphs.';
  }

  // Final instruction for natural output
  instruction += '\n\nIMPORTANT: Write naturally as a human would. Avoid robotic or AI-sounding language. Do not add any explanations, comments, or metadata - only return the paraphrased text itself.';

  // Complete prompt
  const fullPrompt = `${instruction}\n\nOriginal text:\n${text}\n\nParaphrased version:`;

  return fullPrompt;
}
