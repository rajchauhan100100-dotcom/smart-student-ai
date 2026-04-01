// Gemini API utility functions

/**
 * Retry wrapper for Gemini API calls
 * @param {Function} apiCall - The API call function to retry
 * @param {number} maxRetries - Maximum number of retry attempts (default: 2)
 * @param {number} delayMs - Delay between retries in milliseconds (default: 1000)
 */
export async function retryGeminiCall(apiCall, maxRetries = 2, delayMs = 1000) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await apiCall();
      return result;
    } catch (error) {
      lastError = error;
      
      // Don't retry on certain errors
      if (error.isQuotaError || error.isInvalidKey || attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delayMs * (attempt + 1)));
      console.log(`Retry attempt ${attempt + 1}/${maxRetries}...`);
    }
  }
  
  throw lastError;
}

/**
 * Parse Gemini API error and return user-friendly message
 */
export function parseGeminiError(error, data) {
  // Quota exceeded
  if (data?.error?.code === 429 || data?.error?.status === 'RESOURCE_EXHAUSTED') {
    return {
      isQuotaError: true,
      userMessage: 'Our AI service is currently experiencing high demand. Please try again in a few moments.',
      technicalError: 'API quota exceeded'
    };
  }
  
  // Invalid API key
  if (data?.error?.code === 400 && data?.error?.message?.includes('API key')) {
    return {
      isInvalidKey: true,
      userMessage: 'Service configuration error. Please contact support.',
      technicalError: 'Invalid API key'
    };
  }
  
  // Rate limit
  if (data?.error?.code === 429) {
    return {
      isRateLimit: true,
      userMessage: 'Too many requests. Please wait a moment and try again.',
      technicalError: 'Rate limit exceeded'
    };
  }
  
  // Generic error
  return {
    userMessage: 'We encountered an issue processing your request. Please try again.',
    technicalError: data?.error?.message || error.message || 'Unknown error'
  };
}

/**
 * Make Gemini API call with automatic retry and error handling
 */
export async function callGeminiAPI(apiKey, prompt, options = {}) {
  const { maxRetries = 2, model = 'gemini-2.5-flash' } = options;
  
  const apiCall = async () => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024, // Limit output to save quota
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorInfo = parseGeminiError(new Error('API call failed'), data);
      const error = new Error(errorInfo.userMessage);
      error.isQuotaError = errorInfo.isQuotaError;
      error.isInvalidKey = errorInfo.isInvalidKey;
      error.technicalError = errorInfo.technicalError;
      error.statusCode = response.status;
      throw error;
    }

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!result) {
      throw new Error('No response generated. Please try again.');
    }

    return result;
  };

  return retryGeminiCall(apiCall, maxRetries);
}
