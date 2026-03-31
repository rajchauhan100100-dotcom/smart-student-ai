'use client'

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

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
      const response = await fetch('/api/correct-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to correct grammar');
      }

      setCorrected(data.corrected);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Grammar Corrector"
      description="Fix grammar and spelling errors instantly"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Textarea
            placeholder="Enter text to check for grammar and spelling errors..."
            className="min-h-[250px] text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            onClick={handleCorrect}
            disabled={!text.trim() || loading}
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
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
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