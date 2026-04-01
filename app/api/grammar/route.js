import { NextResponse } from 'next/server';
import { callGeminiAPI } from '../../../lib/geminiUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, mode = 'standard', action = 'fix', includeSuggestions = false, analyzeWriting = false } = body;

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

    // Build prompt based on action
    const prompt = buildGrammarPrompt(text, mode, action, includeSuggestions, analyzeWriting);

    // Call Gemini API with retry logic
    const result = await callGeminiAPI(apiKey, prompt, { maxRetries: 2 });

    // Parse response
    const response = parseGrammarResponse(result, action, includeSuggestions, analyzeWriting);

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

function buildGrammarPrompt(text, mode, action, includeSuggestions, analyzeWriting) {
  let instruction = '';

  if (analyzeWriting) {
    // Advanced analysis prompt
    instruction = `Analyze this text and provide:
1. CORRECTED: Grammar-corrected version
2. CLARITY: Score 0-100 based on readability and clarity
3. READABILITY: Easy, Medium, or Advanced
4. TONE: Formal, Casual, or Neutral

Format response as:
CORRECTED: [corrected text]
CLARITY: [score]
READABILITY: [level]
TONE: [tone]

Text: ${text}`;
    
  } else if (action === 'rewrite') {
    // One-click rewrite
    instruction = 'Rewrite this text to be clearer, more engaging, and professional';
    
    const modeInstructions = {
      standard: '. Keep natural tone',
      professional: '. Use formal business language',
      casual: '. Keep it simple and friendly',
      academic: '. Follow scholarly standards'
    };
    instruction += modeInstructions[mode] || modeInstructions.standard;
    instruction += '.\n\nText: ' + text;
    
  } else if (action === 'fix') {
    instruction = 'Fix all grammar, spelling, and punctuation errors';
    
    const modeInstructions = {
      standard: '. Keep natural tone',
      professional: '. Use formal business language',
      casual: '. Keep it simple and friendly',
      academic: '. Follow strict academic writing standards'
    };
    instruction += modeInstructions[mode] || modeInstructions.standard;
    instruction += '.\n\nText: ' + text;
    
  } else if (action === 'improve') {
    instruction = 'Improve writing quality';
    
    const modeInstructions = {
      standard: ': make sentences clearer and more impactful',
      professional: ': enhance professionalism and clarity',
      casual: ': make it more engaging and easy to read',
      academic: ': enhance scholarly tone and precision'
    };
    instruction += modeInstructions[mode] || modeInstructions.standard;
    instruction += '. Fix errors and improve structure';
    
    if (includeSuggestions) {
      instruction += '. Provide 2-3 alternative versions at the end, each on a new line starting with "ALT:"';
    }
    
    instruction += '.\n\nText: ' + text;
  }

  return instruction;
}

function parseGrammarResponse(result, action, includeSuggestions, analyzeWriting) {
  if (analyzeWriting) {
    // Parse structured analysis
    const lines = result.split('\n').filter(l => l.trim());
    let corrected = '';
    let clarityScore = 0;
    let readability = 'Medium';
    let tone = 'Neutral';

    for (const line of lines) {
      if (line.startsWith('CORRECTED:')) {
        corrected = line.replace('CORRECTED:', '').trim();
      } else if (line.startsWith('CLARITY:')) {
        const scoreMatch = line.match(/\d+/);
        if (scoreMatch) {
          clarityScore = parseInt(scoreMatch[0]);
        }
      } else if (line.startsWith('READABILITY:')) {
        const level = line.replace('READABILITY:', '').trim();
        if (['Easy', 'Medium', 'Advanced'].includes(level)) {
          readability = level;
        }
      } else if (line.startsWith('TONE:')) {
        const detectedTone = line.replace('TONE:', '').trim();
        if (['Formal', 'Casual', 'Neutral'].includes(detectedTone)) {
          tone = detectedTone;
        }
      }
    }

    // If parsing failed, use fallback
    if (!corrected) {
      corrected = result.replace(/CORRECTED:|CLARITY:|READABILITY:|TONE:/g, '').trim();
    }

    return {
      corrected,
      clarityScore: Math.min(100, Math.max(0, clarityScore)),
      readability,
      tone,
      analysis: {
        clarity: getClarityLabel(clarityScore),
        readability,
        tone
      }
    };
  }

  if (action === 'rewrite') {
    return {
      corrected: result.trim(),
      suggestions: []
    };
  }

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

function getClarityLabel(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Needs Improvement';
}
