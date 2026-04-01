'use client'

import { useState } from 'react';
import { ToolLayout, CopyButton } from '../../../components/ToolLayout';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';

const MAX_CHARS = 5000;

export default function GrammarCorrector() {
  const [text, setText] = useState('');
  const [corrected, setCorrected] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCorrect = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setCorrected('');

    try {
      // Call backend API (secure method)
      const response = await fetch('/api/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to correct grammar');
      }

      if (!data.corrected) {
        throw new Error('No corrected text generated. Please try again.');
      }

      setCorrected(data.corrected);
    } catch (err) {
      setError(err.message || 'Failed to correct grammar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Grammar Corrector"
      toolId="grammar-corrector"
      category="ai-writing"
      description="Fix grammar and spelling errors instantly"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Enter text to check</span>
            <span className={`text-sm ${text.length > MAX_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}>
              {text.length}/{MAX_CHARS}
            </span>
          </div>
          <Textarea
            placeholder="Enter text to check for grammar and spelling errors..."
            className="min-h-[250px] text-base"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          />
          <Button
            onClick={handleCorrect}
            disabled={!text.trim() || loading || text.length > MAX_CHARS}
            className="w-full gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Correct Grammar
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

        {corrected && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold">Corrected Text</h3>
                <CopyButton text={corrected} />
              </div>
              <p className="text-foreground whitespace-pre-wrap">{corrected}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}