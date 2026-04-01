import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, mode, summaryLength, tone, outputFormat } = body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Get API key from server environment
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        { error: 'Gemini API key not configured on server. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Build prompt based on options
    let prompt = '';
    
    if (mode === 'simplify') {
      prompt = `Simplify the following text into easy-to-understand language suitable for a general audience. Use simple words and short sentences:\n\n${text}`;
    } else {
      const lengthInstruction = summaryLength < 33 ? 'very concise (2-3 sentences)' : 
                               summaryLength < 66 ? 'moderate length (4-6 sentences)' : 
                               'detailed (7-10 sentences)';
      
      const toneInstruction = tone === 'formal' ? 'Use formal, professional language.' :
                             tone === 'simple' ? 'Use simple, easy-to-understand language.' :
                             tone === 'bullets' ? 'Format as bullet points.' :
                             'Extract and list only the key highlights.';
      
      const formatInstruction = outputFormat === 'paragraph' ? 'Write in paragraph form.' :
                               outputFormat === 'bullets' ? 'Format as bullet points with • symbols.' :
                               'List as numbered key points.';

      prompt = `Summarize the following text in a ${lengthInstruction} summary. ${toneInstruction} ${formatInstruction}\n\nText:\n${text}`;
    }

    // Call Gemini API from backend
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return NextResponse.json(
        { error: data.error?.message || 'Failed to generate summary' },
        { status: response.status }
      );
    }

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!result) {
      return NextResponse.json(
        { error: 'No summary generated. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary: result });

  } catch (error) {
    console.error('Summarize API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
