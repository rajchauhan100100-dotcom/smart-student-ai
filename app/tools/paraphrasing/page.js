'use client'

import { useState } from 'react';
import { ToolLayout, CopyButton } from '../../../components/ToolLayout';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';

const MAX_CHARS = 5000;

export default function Paraphrasing() {
  const [text, setText] = useState('');
  const [paraphrased, setParaphrased] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleParaphrase = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setParaphrased('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        throw new Error('Gemini API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env file.');
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Paraphrase the following text while maintaining its original meaning. Keep the same tone and length:\n\n${text}`
            }]
          }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to paraphrase text');
      }

      const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!result) {
        throw new Error('No paraphrased text generated');
      }

      setParaphrased(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Paraphrasing Tool"
      toolId="paraphrasing"
      category="ai-writing"
      description="Rewrite text while maintaining original meaning"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Enter text to paraphrase</span>
            <span className={`text-sm ${text.length > MAX_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}>
              {text.length}/{MAX_CHARS}
            </span>
          </div>
          <Textarea
            placeholder="Enter text to paraphrase..."
            className="min-h-[250px] text-base"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          />
          <Button
            onClick={handleParaphrase}
            disabled={!text.trim() || loading || text.length > MAX_CHARS}
            className="w-full gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Paraphrasing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Paraphrase Text
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {paraphrased && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold">Paraphrased Text</h3>
                <CopyButton text={paraphrased} />
              </div>
              <p className="text-foreground whitespace-pre-wrap">{paraphrased}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}