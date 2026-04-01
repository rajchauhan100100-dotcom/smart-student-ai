import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { details } = body;

    if (!details || !details.name || !details.profession) {
      return NextResponse.json(
        { error: 'Name and profession are required' },
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

    const prompt = `Generate a professional bio based on these details:
Name: ${details.name}
Profession: ${details.profession}
${details.experience ? `Experience: ${details.experience}` : ''}
${details.skills ? `Skills: ${details.skills}` : ''}
${details.achievements ? `Achievements: ${details.achievements}` : ''}

Write a concise, professional bio (2-3 sentences) suitable for LinkedIn or a resume.`;

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
        { error: data.error?.message || 'Failed to generate bio' },
        { status: response.status }
      );
    }

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!result) {
      return NextResponse.json(
        { error: 'No bio generated. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ bio: result });

  } catch (error) {
    console.error('Bio API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
