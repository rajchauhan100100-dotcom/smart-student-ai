'use client'

import { useState } from 'react';
import { ToolLayout, CopyButton } from '../../../components/ToolLayout';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Label } from '../../../components/ui/label';
import { Slider } from '../../../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Loader2, Sparkles, AlertCircle, Download, Copy, Check, RefreshCw, Lightbulb, SplitSquareHorizontal } from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';

const MAX_CHARS = 10000;

export default function TextSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Advanced options
  const [summaryLength, setSummaryLength] = useState(50); // 0-100 slider
  const [tone, setTone] = useState('formal');
  const [outputFormat, setOutputFormat] = useState('paragraph');
  const [compareView, setCompareView] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const getLengthLabel = () => {
    if (summaryLength < 33) return 'Short';
    if (summaryLength < 66) return 'Medium';
    return 'Long';
  };

  const handleSummarize = async (mode = 'normal') => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setSummary('');

    try {
      // Call backend API (secure method)
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          mode,
          summaryLength,
          tone,
          outputFormat
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      if (!data.summary) {
        throw new Error('No summary generated. Please try again.');
      }

      setSummary(data.summary);
      setActiveTab('output');
    } catch (err) {
      setError(err.message || 'Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImprove = () => {
    if (!summary) return;
    // Use the current summary as new input to generate an improved version
    const originalText = text;
    setText(summary);
    handleSummarize();
    // Restore original after a delay
    setTimeout(() => setText(originalText), 100);
  };

  const copyText = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setText('');
    setSummary('');
    setError('');
  };

  return (
    <ToolLayout
      title="AI Text Summarizer"
      description="Advanced AI-powered text summarization with custom length, tone, and format options"
      toolId="text-summarizer"
      category="ai-writing"
    >
      <div className="space-y-6">
        {/* Control Panel */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Summary Length */}
              <div className="space-y-3">
                <Label className="flex items-center justify-between">
                  <span>Summary Length</span>
                  <Badge variant="outline">{getLengthLabel()}</Badge>
                </Label>
                <Slider
                  value={[summaryLength]}
                  onValueChange={(value) => setSummaryLength(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Short</span>
                  <span>Medium</span>
                  <span>Long</span>
                </div>
              </div>

              {/* Tone Selection */}
              <div className="space-y-3">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="bullets">Bullet Points</SelectItem>
                    <SelectItem value="highlights">Key Highlights</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Output Format */}
              <div className="space-y-3">
                <Label>Output Format</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                    <SelectItem value="bullets">Bullet Points</SelectItem>
                    <SelectItem value="keypoints">Key Points</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                onClick={() => handleSummarize()}
                disabled={!text.trim() || loading}
                className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>

              <Button
                onClick={() => handleSummarize('simplify')}
                disabled={!text.trim() || loading}
                variant="outline"
                className="gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                Simplify Text
              </Button>

              {summary && (
                <>
                  <Button
                    onClick={handleImprove}
                    disabled={loading}
                    variant="outline"
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Improve Summary
                  </Button>

                  <Button
                    onClick={() => setCompareView(!compareView)}
                    variant="outline"
                    className="gap-2"
                  >
                    <SplitSquareHorizontal className="h-4 w-4" />
                    {compareView ? 'Single View' : 'Compare View'}
                  </Button>
                </>
              )}

              <Button
                onClick={clearAll}
                variant="outline"
                className="gap-2 text-destructive ml-auto"
                disabled={!text && !summary}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Compare View */}
        {compareView && summary ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Text */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Original Text</h3>
                  <Badge variant="outline">{text.length} chars</Badge>
                </div>
                <div className="max-h-[500px] overflow-y-auto p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{text}</p>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Summary</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyText(summary)}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      onClick={downloadText}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="max-h-[500px] overflow-y-auto p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{summary}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Tabbed View */
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="output" disabled={!summary && !error}>
                Output {summary && <Badge className="ml-2 bg-green-500">Ready</Badge>}
              </TabsTrigger>
            </TabsList>

            {/* Input Tab */}
            <TabsContent value="input" className="space-y-4 mt-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Enter Text to Summarize</Label>
                  <span className={`text-sm ${text.length > MAX_CHARS ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
                    {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
                  </span>
                </div>
                <Textarea
                  placeholder="Paste your text here to get an AI-powered summary. Supports up to 10,000 characters..."
                  className="min-h-[400px] text-base"
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                />
              </div>
            </TabsContent>

            {/* Output Tab */}
            <TabsContent value="output" className="space-y-4 mt-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {summary && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold mb-1">Generated Summary</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline">{getLengthLabel()}</Badge>
                          <Badge variant="outline">{tone}</Badge>
                          <Badge variant="outline">{summary.split(/\s+/).length} words</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => copyText(summary)}
                          size="sm"
                          variant="outline"
                          className="gap-2"
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                        <Button
                          onClick={downloadText}
                          size="sm"
                          variant="outline"
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                        {summary}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* SEO Content */}
        <div className="mt-12 space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Advanced AI Text Summarizer
            </h2>
            <p className="leading-relaxed">
              Our AI-powered text summarizer uses Google's Gemini 2.5 Flash model to generate accurate, contextual summaries of any text. Whether you need to condense articles, research papers, or long documents, our tool provides instant results with customizable length, tone, and format options.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Key Features
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Custom Summary Length</strong> - Choose between short, medium, or long summaries</li>
              <li><strong>Multiple Tone Options</strong> - Formal, simple, bullet points, or key highlights</li>
              <li><strong>Flexible Output Formats</strong> - Paragraph, bullet points, or numbered key points</li>
              <li><strong>Simplify Text Mode</strong> - Convert complex text into easy-to-understand language</li>
              <li><strong>Improve Summary</strong> - Regenerate for better results</li>
              <li><strong>Compare View</strong> - Side-by-side original and summary comparison</li>
              <li><strong>Copy & Download</strong> - Save your summaries easily</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              How to Use
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Paste or type your text in the input area (up to 10,000 characters)</li>
              <li>Adjust summary length using the slider (Short, Medium, or Long)</li>
              <li>Select your preferred tone (Formal, Simple, Bullets, or Highlights)</li>
              <li>Choose output format (Paragraph, Bullets, or Key Points)</li>
              <li>Click "Generate Summary" to get instant AI-powered results</li>
              <li>Use "Improve Summary" to regenerate for better quality</li>
              <li>Try "Simplify Text" for easy-to-understand language</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Related Tools
            </h2>
            <p className="leading-relaxed">
              Enhance your writing workflow with our other AI tools. Use our <a href="/tools/paraphrasing" className="text-primary hover:underline font-medium">paraphrasing tool</a> to rewrite content, <a href="/tools/grammar-corrector" className="text-primary hover:underline font-medium">grammar checker</a> to fix errors, or <a href="/tools/word-counter" className="text-primary hover:underline font-medium">word counter</a> to track your document statistics.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
