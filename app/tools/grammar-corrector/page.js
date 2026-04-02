'use client'

import { useState } from 'react';
import { ToolLayout } from '../../../components/ToolLayout';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Loader2, CheckCircle2, AlertCircle, Copy, Check, Sparkles, Wand2, Clock, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { useApiCooldown } from '../../../hooks/useApiCooldown';

const MAX_CHARS = 5000;

export default function GrammarCorrector() {
  const [text, setText] = useState('');
  const [corrected, setCorrected] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState('standard');
  const [showHighlights, setShowHighlights] = useState(true);
  const { canMakeRequest, secondsRemaining, startCooldown } = useApiCooldown(3);
  
  // Advanced analysis state
  const [analysis, setAnalysis] = useState(null);
  const [clarityScore, setClarityScore] = useState(null);
  const [readability, setReadability] = useState(null);
  const [tone, setTone] = useState(null);

  const handleFixGrammar = async () => {
    if (!text.trim() || !canMakeRequest) return;
    
    console.log('🔵 [Frontend] Fix Grammar button clicked');
    console.log('🔵 [Frontend] Text length:', text.length);
    
    setLoading(true);
    setError('');
    setCorrected('');
    setSuggestions([]);
    setAnalysis(null);
    startCooldown();

    try {
      console.log('🔵 [Frontend] Making API call to /api/grammar');
      
      // Call backend API (secure method with retry)
      const response = await fetch('/api/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          mode,
          action: 'fix',
          includeSuggestions: false,
          analyzeWriting: true // Get analysis
        })
      });

      console.log('🔵 [Frontend] API response status:', response.status);

      const data = await response.json();
      console.log('🔵 [Frontend] API response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to correct grammar');
      }

      setCorrected(data.corrected || '');
      
      // Set analysis data
      if (data.clarityScore !== undefined) {
        console.log('✅ [Frontend] Analysis received:', data.clarityScore);
        setClarityScore(data.clarityScore);
        setReadability(data.readability);
        setTone(data.tone);
        setAnalysis(data.analysis);
      }
      
      console.log('✅ [Frontend] Grammar correction successful');
    } catch (err) {
      console.error('❌ [Frontend] Error:', err);
      setError(err.message || 'Failed to correct grammar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImproveWriting = async () => {
    if (!text.trim() || !canMakeRequest) return;
    
    setLoading(true);
    setError('');
    setCorrected('');
    setSuggestions([]);
    setAnalysis(null);
    startCooldown();

    try {
      const response = await fetch('/api/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          mode,
          action: 'improve',
          includeSuggestions: true
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to improve writing');
      }

      setCorrected(data.corrected || '');
      setSuggestions(data.suggestions || []);
    } catch (err) {
      setError(err.message || 'Failed to improve writing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRewriteBetter = async () => {
    if (!text.trim() || !canMakeRequest) return;
    
    setLoading(true);
    setError('');
    setCorrected('');
    setSuggestions([]);
    setAnalysis(null);
    startCooldown();

    try {
      const response = await fetch('/api/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          mode,
          action: 'rewrite',
          analyzeWriting: true // Get analysis of rewritten version
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to rewrite text');
      }

      setCorrected(data.corrected || '');
      
      // Set analysis data if available
      if (data.clarityScore !== undefined) {
        setClarityScore(data.clarityScore);
        setReadability(data.readability);
        setTone(data.tone);
        setAnalysis(data.analysis);
      }
    } catch (err) {
      setError(err.message || 'Failed to rewrite text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyText = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([corrected], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corrected-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setText('');
    setCorrected('');
    setSuggestions([]);
    setError('');
    setAnalysis(null);
    setClarityScore(null);
    setReadability(null);
    setTone(null);
  };

  const getClarityColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getReadabilityIcon = (level) => {
    if (level === 'Easy') return '📖';
    if (level === 'Advanced') return '🎓';
    return '📚';
  };

  const getToneIcon = (toneType) => {
    if (toneType === 'Formal') return '👔';
    if (toneType === 'Casual') return '😊';
    return '⚖️';
  };

  // Simple diff highlighting (basic version)
  const getHighlightedText = () => {
    if (!showHighlights || !corrected) return corrected;
    
    // This is a simple implementation - for production, use a proper diff library
    const originalWords = text.toLowerCase().split(/\s+/);
    const correctedWords = corrected.split(/\s+/);
    
    return correctedWords.map((word, i) => {
      const isChanged = !originalWords.includes(word.toLowerCase());
      return isChanged ? `<mark class="bg-green-200 dark:bg-green-900">${word}</mark>` : word;
    }).join(' ');
  };

  return (
    <ToolLayout
      title="AI Grammar Checker & Writing Assistant"
      description="Professional grammar correction and writing improvement powered by advanced AI - better than basic grammar tools"
      toolId="grammar-corrector"
      category="ai-writing"
    >
      <div className="space-y-6">
        {/* Control Panel */}
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Writing Mode */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  Writing Mode
                </Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard - Natural corrections</SelectItem>
                    <SelectItem value="professional">Professional - Formal business</SelectItem>
                    <SelectItem value="casual">Casual - Simple & friendly</SelectItem>
                    <SelectItem value="academic">Academic - Strict grammar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Highlight Toggle */}
              <div className="space-y-3">
                <Label>Display Options</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="highlights"
                    checked={showHighlights}
                    onChange={(e) => setShowHighlights(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="highlights" className="text-sm cursor-pointer">
                    Highlight corrections
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                onClick={handleFixGrammar}
                disabled={!text.trim() || loading || !canMakeRequest}
                className="gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : !canMakeRequest ? (
                  <>
                    <Clock className="h-4 w-4" />
                    Wait {secondsRemaining}s
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Fix Grammar
                  </>
                )}
              </Button>

              <Button
                onClick={handleImproveWriting}
                disabled={!text.trim() || loading || !canMakeRequest}
                variant="outline"
                className="gap-2 border-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Improve Writing
                  </>
                )}
              </Button>

              <Button
                onClick={handleRewriteBetter}
                disabled={!text.trim() || loading || !canMakeRequest}
                variant="outline"
                className="gap-2 border-2 border-purple-500/50 text-purple-600 dark:text-purple-400"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Rewriting...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Rewrite Better
                  </>
                )}
              </Button>

              <Button
                onClick={clearAll}
                variant="outline"
                className="gap-2 text-destructive ml-auto"
                disabled={!text && !corrected}
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

        {/* Advanced Analysis Panel */}
        {analysis && clarityScore !== null && (
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-600/10 border-2 border-blue-500/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-blue-500" />
                <Label className="text-lg font-semibold">Writing Analysis</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Clarity Score */}
                <div className="p-4 bg-background/50 rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">Clarity Score</div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${getClarityColor(clarityScore)}`}>
                      {clarityScore}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({analysis.clarity})
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        clarityScore >= 90 ? 'bg-green-500' :
                        clarityScore >= 75 ? 'bg-blue-500' :
                        clarityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${clarityScore}%` }}
                    />
                  </div>
                </div>

                {/* Readability Level */}
                <div className="p-4 bg-background/50 rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">Readability</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getReadabilityIcon(readability)}</span>
                    <span className="text-2xl font-semibold">{readability}</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {readability === 'Easy' && 'Simple & accessible'}
                    {readability === 'Medium' && 'Moderate complexity'}
                    {readability === 'Advanced' && 'Complex & detailed'}
                  </div>
                </div>

                {/* Tone Detection */}
                <div className="p-4 bg-background/50 rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">Detected Tone</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getToneIcon(tone)}</span>
                    <span className="text-2xl font-semibold">{tone}</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {tone === 'Formal' && 'Professional style'}
                    {tone === 'Casual' && 'Friendly & relaxed'}
                    {tone === 'Neutral' && 'Balanced approach'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dual View Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Original Text */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold">Your Text</Label>
                  <span className={`text-sm ${text.length > MAX_CHARS ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
                    {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                  </span>
                </div>
                <Textarea
                  placeholder="Paste or type your text here. I can fix grammer mistakes, improve clarity, and enhance your writing..."
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

          {/* Corrected Text */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold">Corrected Text</Label>
                  {corrected && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyText(corrected)}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="min-h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
                    <div className="text-center space-y-4">
                      <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                      <p className="text-muted-foreground">
                        Analyzing and improving your text...
                      </p>
                    </div>
                  </div>
                ) : corrected ? (
                  <div className="min-h-[400px] p-6 bg-muted/50 rounded-lg">
                    <div 
                      className="text-foreground whitespace-pre-wrap leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
                    />
                    <div className="flex gap-2 mt-4 text-sm">
                      <Badge variant="outline">{corrected.split(/\s+/).filter(w => w).length} words</Badge>
                      <Badge variant="outline" className="capitalize">{mode} mode</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center bg-muted/50 rounded-lg border-2 border-dashed">
                    <p className="text-muted-foreground text-center px-4">
                      Your corrected text will appear here.<br />
                      <span className="text-sm">Click "Fix Grammar" or "Improve Writing"</span>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggestions Section */}
        {suggestions.length > 0 && (
          <Card className="border-2 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-500" />
                  <Label className="text-lg font-semibold">Alternative Versions</Label>
                  <Badge variant="outline">{suggestions.length} suggestions</Badge>
                </div>
                <div className="space-y-3">
                  {suggestions.map((suggestion, idx) => (
                    <Card key={idx} className="bg-blue-500/5">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex justify-between items-start gap-4">
                          <p className="flex-1 leading-relaxed">{suggestion}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyText(suggestion)}
                            className="shrink-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Content Section */}
        <div className="mt-12 space-y-8 text-muted-foreground">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Professional AI Grammar Checker & Writing Assistant
            </h2>
            <p className="leading-relaxed text-lg">
              Our advanced AI grammar checker goes beyond basic correction. Powered by Google Gemini 2.5 Flash, it not only fixes grammar, spelling, and punctuation errors but also enhances your writing quality, clarity, and impact. With multiple writing modes and intelligent suggestions, it's the perfect tool for students, professionals, and anyone who wants to write better.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              What Makes Our Grammar Tool Better?
            </h2>
            <ul className="space-y-3 list-none">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Dual-View Interface</strong> - Compare original and corrected text side-by-side with highlighted changes
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">4 Writing Modes</strong> - Standard, Professional, Casual, and Academic modes for any context
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Improve Writing Feature</strong> - Not just corrections - actively enhances clarity and impact
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Alternative Suggestions</strong> - Get multiple improved versions to choose from
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✦</span>
                <div>
                  <strong className="text-foreground">Instant Results</strong> - AI-powered corrections in seconds, no account needed
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              How to Use This Grammar Tool
            </h2>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="leading-relaxed">
                <strong className="text-foreground">Paste Your Text</strong> - Enter up to 5,000 characters in the left panel
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Choose Writing Mode</strong> - Select Standard, Professional, Casual, or Academic
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Fix Grammar</strong> - Corrects spelling, grammar, and punctuation errors
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Or Improve Writing</strong> - Enhances clarity, flow, and impact (includes suggestions)
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Review Changes</strong> - See highlighted corrections in the right panel
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Use Suggestions</strong> - Choose from alternative improved versions
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Copy or Download</strong> - Save your corrected text
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Why Grammar and Writing Quality Matter
            </h2>
            <p className="leading-relaxed mb-4">
              Good grammar is essential for effective communication. Whether you're writing emails, reports, essays, or social media posts, clear and error-free writing makes you look more professional, credible, and intelligent. Poor grammar can distract readers, create confusion, and damage your reputation.
            </p>
            <p className="leading-relaxed">
              Beyond basic correctness, writing quality matters too. Clear, concise, and powerful writing gets your message across more effectively, engages readers, and achieves your communication goals. Our AI writing assistant helps you achieve both: error-free grammar and compelling, impactful writing.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">What's the difference between "Fix Grammar" and "Improve Writing"?</h3>
                <p>"Fix Grammar" focuses on correcting errors (spelling, grammar, punctuation) while maintaining your original writing style. "Improve Writing" goes further by enhancing sentence structure, clarity, and impact, plus provides alternative versions for you to choose from.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">How is this better than Grammarly Free or other grammar checkers?</h3>
                <p>Unlike basic grammar checkers, our tool offers multiple writing modes, side-by-side comparison view, highlighted changes, writing improvement (not just correction), and alternative suggestions - all powered by advanced AI. Plus, it's completely free with no account required.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Which writing mode should I use?</h3>
                <p>Use <strong>Standard</strong> for everyday writing, <strong>Professional</strong> for business emails and reports, <strong>Casual</strong> for social media and friendly messages, and <strong>Academic</strong> for essays, research papers, and scholarly writing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Is my text stored or shared?</h3>
                <p>No. Your text is processed securely through our AI system and is not stored, logged, or shared. We prioritize your privacy and data security.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Can I use this for academic assignments?</h3>
                <p>Yes, use our Academic mode for scholarly writing. However, always review AI suggestions and ensure they match your voice. This tool is meant to help you improve your writing, not to write for you. Check your institution's AI usage policies.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Related Writing Tools
            </h2>
            <p className="leading-relaxed">
              Enhance your content creation with our other AI-powered tools. Try our <a href="/tools/paraphrasing" className="text-primary hover:underline font-medium">paraphrasing tool</a> to rewrite text in different styles, <a href="/tools/text-summarizer" className="text-primary hover:underline font-medium">text summarizer</a> for condensing long content, <a href="/tools/bio-generator" className="text-primary hover:underline font-medium">bio generator</a> for professional profiles, or <a href="/tools/word-counter" className="text-primary hover:underline font-medium">word counter</a> for document analysis.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
