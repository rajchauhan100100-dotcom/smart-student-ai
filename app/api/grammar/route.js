import { NextResponse } from 'next/server';
import { callGeminiAPI } from '../../../lib/geminiUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, mode = 'standard', action = 'fix', includeSuggestions = false } = body;

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

    // Build prompt based on action and mode
    const prompt = buildGrammarPrompt(text, mode, action, includeSuggestions);

    // Call Gemini API with retry logic
    const result = await callGeminiAPI(apiKey, prompt, { maxRetries: 2 });

    // Parse response
    const response = parseGrammarResponse(result, action, includeSuggestions);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Grammar API Error:', error);
    
    if (error.isQuotaError) {
      return NextResponse.json(
        { 
          error: 'Our AI writing assistant is experiencing high demand. Please wait a moment and try again.',
          retryAfter: 60
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to process text. Please try again.' },
      { status: error.statusCode || 500 }
    );
  }
}

function buildGrammarPrompt(text, mode, action, includeSuggestions) {
  let instruction = '';

  // Action-specific instructions
  if (action === 'fix') {
    instruction = 'Fix all grammar, spelling, and punctuation errors';
    
    // Mode-specific refinements for fix
    const modeInstructions = {
      standard: '. Keep natural tone',
      professional: '. Use formal business language',
      casual: '. Keep it simple and friendly',
      academic: '. Follow strict academic writing standards'
    };
    instruction += modeInstructions[mode] || modeInstructions.standard;
    
  } else if (action === 'improve') {
    instruction = 'Improve writing quality';
    
    // Mode-specific refinements for improve
    const modeInstructions = {
      standard: ': make sentences clearer and more impactful',
      professional: ': enhance professionalism and clarity',
      casual: ': make it more engaging and easy to read',
      academic: ': enhance scholarly tone and precision'
    };
    instruction += modeInstructions[mode] || modeInstructions.standard;
    instruction += '. Fix errors and improve structure';
  }

  // Add suggestion request if needed
  if (includeSuggestions) {
    instruction += '. Provide 2-3 alternative versions at the end, each on a new line starting with "ALT:"';
  }

  instruction += '. Write naturally. Return only the corrected/improved text.\n\n';

  return `${instruction}Text: ${text}`;
}

function parseGrammarResponse(result, action, includeSuggestions) {
  if (!includeSuggestions) {
    return {
      corrected: result.trim(),
      suggestions: []
    };
  }

  // Parse main text and suggestions
  const lines = result.split('\n');
  const mainText = [];
  const suggestions = [];

  for (const line of lines) {
    if (line.trim().startsWith('ALT:')) {
      suggestions.push(line.replace('ALT:', '').trim());
    } else if (line.trim()) {
      mainText.push(line);
    }
  }

  return {
    corrected: mainText.join('\n').trim(),
    suggestions: suggestions.length > 0 ? suggestions : []
  };
}
