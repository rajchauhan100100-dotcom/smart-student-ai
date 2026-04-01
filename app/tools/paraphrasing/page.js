'use client'

import { useState } from 'react';
import { ToolLayout, CopyButton } from '../../../components/ToolLayout';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Slider } from '../../../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Loader2, Sparkles, AlertCircle, Download, Copy, Check, RefreshCw, Wand2 } from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';

const MAX_CHARS = 5000;

export default function Paraphrasing() {
  const [text, setText] = useState('');
  const [paraphrased, setParaphrased] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Advanced options
  const [mode, setMode] = useState('standard');
  const [tone, setTone] = useState('neutral');
  const [strength, setStrength] = useState(50);
  const [outputFormat, setOutputFormat] = useState('paragraph');

  const getStrengthLabel = () => {
    if (strength < 33) return 'Light';
    if (strength < 66) return 'Medium';
    return 'Aggressive';
  };

  const handleParaphrase = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setParaphrased('');

    try {
      // Call backend API (secure method)
      const response = await fetch('/api/paraphrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          mode,
          tone,
          strength,
          outputFormat
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to paraphrase text');
      }

      if (!data.paraphrased) {
        throw new Error('No paraphrased text generated. Please try again.');
      }

      setParaphrased(data.paraphrased);
    } catch (err) {
      setError(err.message || 'Failed to paraphrase text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRephrase = () => {
    if (!paraphrased) return;
    // Use the current output as new input for another round
    const originalText = text;
    setText(paraphrased);
    setParaphrased('');
    setTimeout(() => {
      handleParaphrase();
      setText(originalText);
    }, 100);
  };

  const copyText = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([paraphrased], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paraphrased-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setText('');
    setParaphrased('');
    setError('');
  };

  return (
    <ToolLayout
      title="AI Paraphrasing Tool"
      description="Advanced AI-powered text paraphrasing with multiple modes, tones, and customizable rewrite strength"
      toolId="paraphrasing"
      category="ai-writing"
    >
      <div className="space-y-6">
        {/* Advanced Control Panel */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Mode Selection */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  Paraphrasing Mode
                </Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tone Selection */}
              <div className="space-y-3">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="confident">Confident</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rewrite Strength */}
              <div className="space-y-3">
                <Label className="flex items-center justify-between">
                  <span>Rewrite Strength</span>
                  <Badge variant="outline">{getStrengthLabel()}</Badge>
                </Label>
                <Slider
                  value={[strength]}
                  onValueChange={(value) => setStrength(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Light</span>
                  <span>Medium</span>
                  <span>Aggressive</span>
                </div>
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
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                onClick={handleParaphrase}
                disabled={!text.trim() || loading || text.length > MAX_CHARS}
                className="gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
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

              {paraphrased && (
                <Button
                  onClick={handleRephrase}
                  disabled={loading}
                  variant="outline"
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Rephrase Again
                </Button>
              )}

              <Button
                onClick={clearAll}
                variant="outline"
                className="gap-2 text-destructive ml-auto"
                disabled={!text && !paraphrased}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Side-by-Side Input/Output Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Box */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold">Input Text</Label>
                  <span className={`text-sm ${text.length > MAX_CHARS ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
                    {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                  </span>
                </div>
                <Textarea
                  placeholder="Enter or paste your text here to paraphrase. Supports up to 5,000 characters..."
                  className="min-h-[400px] text-base resize-none"
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                />
                {text && (
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{text.split(/\s+/).filter(w => w).length} words</Badge>
                    <Badge variant="outline">{text.split(/[.!?]+/).filter(s => s.trim()).length} sentences</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Output Box */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold">Paraphrased Output</Label>
                  {paraphrased && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyText(paraphrased)}
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
                  )}
                </div>

                {loading ? (
                  <div className="min-h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
                    <div className="text-center space-y-4">
                      <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                      <p className="text-muted-foreground">
                        Generating paraphrased text...
                      </p>
                    </div>
                  </div>
                ) : paraphrased ? (
                  <div className="min-h-[400px] p-6 bg-muted/50 rounded-lg">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {paraphrased}
                    </p>
                    <div className="flex gap-2 mt-4 text-sm">
                      <Badge variant="outline">{paraphrased.split(/\s+/).filter(w => w).length} words</Badge>
                      <Badge variant="outline" className="capitalize">{mode} mode</Badge>
                      <Badge variant="outline" className="capitalize">{tone} tone</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center bg-muted/50 rounded-lg border-2 border-dashed">
                    <p className="text-muted-foreground text-center px-4">
                      Your paraphrased text will appear here.<br />
                      <span className="text-sm">Enter text on the left and click "Paraphrase Text"</span>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-8 text-muted-foreground">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              The Best AI Paraphrasing Tool Online
            </h2>
            <p className="leading-relaxed text-lg">
              Our advanced AI paraphrasing tool uses Google's Gemini 2.5 Flash model to rewrite your text while preserving its original meaning. With 5 specialized modes, customizable tone options, and adjustable rewrite strength, you get complete control over how your content is paraphrased. Whether you need formal business writing, simple explanations, creative rewrites, or academic refinement, our tool delivers natural, human-like results instantly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              What is Paraphrasing?
            </h2>
            <p className="leading-relaxed">
              Paraphrasing is the process of rewording text to express the same ideas using different words and sentence structures. It's essential for avoiding plagiarism, improving clarity, adapting content for different audiences, and demonstrating understanding of source material. Our AI-powered paraphrasing tool makes this process instant and effortless while maintaining the original meaning and context.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Powerful Features That Set Us Apart
            </h2>
            <ul className="space-y-3 list-none">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">5 Paraphrasing Modes</strong> - Standard, Formal, Simple, Creative, and Academic modes tailored for different writing needs
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Adjustable Rewrite Strength</strong> - Choose between light, medium, or aggressive rewrites to match your requirements
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Multiple Tone Options</strong> - Professional, casual, confident, friendly, or neutral tones for any context
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Flexible Output Formats</strong> - Get results as flowing paragraphs or organized bullet points
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Side-by-Side View</strong> - Compare original and paraphrased text easily with our intuitive layout
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Rephrase Again Feature</strong> - Not satisfied? Generate alternative versions with one click
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Natural, Human-Like Output</strong> - AI-generated text that sounds authentic, not robotic
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Instant Results</strong> - Get professionally paraphrased text in seconds
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              How to Use This Paraphrasing Tool
            </h2>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="leading-relaxed">
                <strong className="text-foreground">Paste Your Text</strong> - Enter or paste up to 5,000 characters in the input box
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Choose Your Mode</strong> - Select from Standard, Formal, Simple, Creative, or Academic
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Set the Tone</strong> - Pick the tone that matches your needs (Professional, Casual, etc.)
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Adjust Rewrite Strength</strong> - Use the slider to control how extensively the text is rewritten
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Select Output Format</strong> - Choose between paragraph or bullet point format
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Click "Paraphrase Text"</strong> - Generate your paraphrased content instantly
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Copy or Download</strong> - Use the paraphrased text directly or save it for later
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              When to Use Different Paraphrasing Modes
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">📝 Standard Mode</h3>
                <p>Perfect for general content, blog posts, and everyday writing. Produces clear, natural text with balanced changes.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">💼 Formal Mode</h3>
                <p>Ideal for business documents, professional emails, reports, and corporate communications. Uses sophisticated vocabulary and formal structures.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">🎯 Simple Mode</h3>
                <p>Best for explaining complex topics, educational content, or making text accessible to wider audiences. Uses straightforward language.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">🎨 Creative Mode</h3>
                <p>Great for marketing copy, social media content, and engaging articles. Adds flair and dynamic phrasing while keeping the message clear.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">🎓 Academic Mode</h3>
                <p>Perfect for research papers, essays, theses, and scholarly writing. Maintains academic rigor and uses precise, formal terminology.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Benefits of Using Our Paraphrasing Tool
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">✓ Avoid Plagiarism</h3>
                <p className="text-sm">Rewrite content in your own words while maintaining the original ideas and citations.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">✓ Save Time</h3>
                <p className="text-sm">Instantly paraphrase lengthy texts instead of manually rewriting word by word.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">✓ Improve Clarity</h3>
                <p className="text-sm">Make complex or confusing text clearer and easier to understand.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">✓ Adapt Tone</h3>
                <p className="text-sm">Transform text to match different audiences, contexts, or platforms.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">✓ Enhance Vocabulary</h3>
                <p className="text-sm">Discover alternative ways to express ideas with varied word choices.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">✓ Content Repurposing</h3>
                <p className="text-sm">Create multiple versions of content for different channels or purposes.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Is the paraphrased text plagiarism-free?</h3>
                <p>While our AI tool significantly rewrites your text, we recommend always reviewing the output and citing original sources when needed. Paraphrasing is a tool to help express ideas in new ways, not to avoid proper attribution.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">How is this different from QuillBot or other paraphrasing tools?</h3>
                <p>Our tool offers more customization options including 5 distinct modes, adjustable rewrite strength, multiple tone options, and uses advanced Google Gemini AI for more natural, context-aware paraphrasing. The side-by-side comparison view and "Rephrase Again" feature provide greater flexibility.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What's the difference between rewrite strength levels?</h3>
                <p>Light rewrites make minimal changes (mainly synonym substitutions), Medium makes moderate structural changes, and Aggressive completely restructures sentences while preserving meaning. Choose based on how different you want the output to be from the original.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Can I use this for academic papers?</h3>
                <p>Yes! Use our Academic mode for scholarly writing. However, always check your institution's policies on AI assistance and ensure proper citations. This tool is meant to help you express ideas better, not to bypass academic integrity requirements.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Is my text stored or shared?</h3>
                <p>No. Your text is processed securely through our API and is not stored, logged, or shared. We prioritize your privacy and data security.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What if I'm not satisfied with the results?</h3>
                <p>Simply click "Rephrase Again" to generate a new version, or adjust the mode, tone, or strength settings and try again. Each generation produces unique results.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Related Writing Tools
            </h2>
            <p className="leading-relaxed">
              Enhance your content creation workflow with our other AI-powered tools. Use our <a href="/tools/text-summarizer" className="text-primary hover:underline font-medium">text summarizer</a> to condense long articles, <a href="/tools/grammar-corrector" className="text-primary hover:underline font-medium">grammar checker</a> to fix errors, <a href="/tools/bio-generator" className="text-primary hover:underline font-medium">bio generator</a> for professional profiles, or <a href="/tools/word-counter" className="text-primary hover:underline font-medium">word counter</a> to track document statistics.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
