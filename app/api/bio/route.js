import { NextResponse } from 'next/server';
import { callGeminiAPI } from '../../../lib/geminiUtils';

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
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Build optimized prompt
    const prompt = buildBioPrompt(details);

    // Call Gemini API with retry logic
    const result = await callGeminiAPI(apiKey, prompt, { maxRetries: 2 });

    return NextResponse.json({ bio: result });

  } catch (error) {
    console.error('Bio API Error:', error);
    
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
      { error: error.message || 'Failed to generate bio. Please try again.' },
      { status: error.statusCode || 500 }
    );
  }
}

function buildBioPrompt(details) {
  const { name, profession, experience, skills, achievements } = details;
  
  let prompt = `Write a 2-3 sentence professional bio for:\n`;
  prompt += `Name: ${name}\n`;
  prompt += `Role: ${profession}\n`;
  
  if (experience) prompt += `Experience: ${experience}\n`;
  if (skills) prompt += `Skills: ${skills}\n`;
  if (achievements) prompt += `Achievements: ${achievements}\n`;
  
  return prompt;
}
