'use client'

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

export default function TextSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to summarize');
      }

      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Text Summarizer"
      description="AI-powered tool to summarize long texts quickly"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Textarea
            placeholder="Paste your text here to summarize..."
            className="min-h-[250px] text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            onClick={handleSummarize}
            disabled={!text.trim() || loading}
            className="w-full gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Summarize Text
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

        {summary && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold">Summary</h3>
                <CopyButton text={summary} />
              </div>
              <p className="text-foreground whitespace-pre-wrap">{summary}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}