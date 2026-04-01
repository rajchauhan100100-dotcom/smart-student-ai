import { NextResponse } from 'next/server';

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
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        { error: 'Gemini API key not configured on server. Please contact administrator.' },
        { status: 500 }
      );
    }

    const prompt = `Correct the grammar and spelling in the following text. Only return the corrected text without any explanations:\n\n${text}`;

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
        { error: data.error?.message || 'Failed to correct grammar' },
        { status: response.status }
      );
    }

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!result) {
      return NextResponse.json(
        { error: 'No corrected text generated. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ corrected: result });

  } catch (error) {
    console.error('Grammar API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
