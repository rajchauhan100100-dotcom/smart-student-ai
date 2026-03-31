'use client'

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

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
      const response = await fetch('/api/paraphrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to paraphrase');
      }

      setParaphrased(data.paraphrased);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Paraphrasing Tool"
      description="Rewrite text while maintaining original meaning"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Textarea
            placeholder="Enter text to paraphrase..."
            className="min-h-[250px] text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            onClick={handleParaphrase}
            disabled={!text.trim() || loading}
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
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
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