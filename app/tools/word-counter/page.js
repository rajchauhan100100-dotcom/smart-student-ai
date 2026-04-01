'use client'

import { useState, useMemo } from 'react';
import { ToolLayout } from '../../../components/ToolLayout';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';
import { FileText, Hash, AlignLeft, List, Trash2, Copy, Download, Check, Clock, Mic, BarChart3, AlertTriangle } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [wordLimit, setWordLimit] = useState(0);

  // Basic Stats
  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200); // 200 words per minute
    const speakingTime = Math.ceil(words / 130); // 130 words per minute average speaking
    
    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    };
  }, [text]);

  // Advanced Stats
  const advancedStats = useMemo(() => {
    if (!text.trim()) {
      return {
        readingLevel: 'N/A',
        readingLevelScore: 0,
        keywordDensity: [],
        avgWordLength: 0,
        avgSentenceLength: 0,
        longSentences: 0
      };
    }

    // Calculate reading level (Flesch Reading Ease approximation)
    const words = stats.words;
    const sentences = stats.sentences || 1;
    const syllables = text.split(/\s+/).reduce((count, word) => {
      return count + countSyllables(word);
    }, 0);
    
    const fleschScore = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    
    let readingLevel = 'Easy';
    if (fleschScore < 30) readingLevel = 'Very Hard';
    else if (fleschScore < 50) readingLevel = 'Hard';
    else if (fleschScore < 60) readingLevel = 'Medium';
    else if (fleschScore < 70) readingLevel = 'Easy';
    else readingLevel = 'Very Easy';

    // Keyword density
    const wordArray = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const wordFreq = {};
    wordArray.forEach(word => {
      if (word.length > 3) { // Ignore short words
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });
    
    const keywordDensity = Object.entries(wordFreq)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / words) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Average word length
    const avgWordLength = words > 0 
      ? (text.split(/\s+/).reduce((sum, word) => sum + word.length, 0) / words).toFixed(1)
      : 0;

    // Average sentence length
    const avgSentenceLength = sentences > 0 ? (words / sentences).toFixed(1) : 0;

    // Count long sentences (> 20 words)
    const sentencesArray = text.split(/[.!?]+/).filter(s => s.trim());
    const longSentences = sentencesArray.filter(s => s.trim().split(/\s+/).length > 20).length;

    return {
      readingLevel,
      readingLevelScore: Math.round(fleschScore),
      keywordDensity,
      avgWordLength,
      avgSentenceLength,
      longSentences
    };
  }, [text, stats.words, stats.sentences]);

  // Helper function to count syllables (simplified)
  function countSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  }

  const clearText = () => {
    setText('');
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const isOverLimit = wordLimit > 0 && stats.words > wordLimit;
  const limitProgress = wordLimit > 0 ? (stats.words / wordLimit) * 100 : 0;

  return (
    <ToolLayout
      title="Word Counter"
      description="Advanced word counter with reading level analysis, keyword density, and more"
      toolId="word-counter"
      category="productivity"
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-2">
            <Button
              onClick={copyText}
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={!text}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              onClick={downloadText}
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={!text}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
          <Button
            onClick={clearText}
            variant="outline"
            size="sm"
            className="gap-2 text-destructive"
            disabled={!text}
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>

        {/* Word Limit Mode */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
              <div className="flex-1 space-y-2">
                <Label>Set Word Limit (Optional)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 500"
                  value={wordLimit || ''}
                  onChange={(e) => setWordLimit(parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
              {wordLimit > 0 && (
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className={isOverLimit ? 'text-destructive font-semibold' : 'text-foreground'}>
                      {stats.words} / {wordLimit} words
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(limitProgress, 100)} 
                    className={`h-2 ${isOverLimit ? '[&>div]:bg-destructive' : ''}`}
                  />
                  {isOverLimit && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {stats.words - wordLimit} words over limit
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Text Input */}
        <Textarea
          placeholder="Type or paste your text here..."
          className="min-h-[300px] text-base"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Character Limit Indicator */}
        {text && (
          <div className="flex items-center gap-3">
            <Progress value={Math.min((stats.characters / 5000) * 100, 100)} className="flex-1 h-2" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {stats.characters.toLocaleString()} / 5000 chars
            </span>
          </div>
        )}

        {/* Stats Tabs */}
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Stats</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Stats</TabsTrigger>
          </TabsList>

          {/* Basic Stats */}
          <TabsContent value="basic" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Words
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.words.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Characters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.characters.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    No Spaces
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.charactersNoSpaces.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlignLeft className="h-4 w-4" />
                    Sentences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.sentences.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Paragraphs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.paragraphs.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Reading Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.readingTime}<span className="text-base font-normal text-muted-foreground ml-1">min</span></p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Speaking Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.speakingTime}<span className="text-base font-normal text-muted-foreground ml-1">min</span></p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Advanced Stats */}
          <TabsContent value="advanced" className="space-y-6 mt-6">
            {/* Reading Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Reading Level Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Flesch Reading Ease</p>
                    <div className="flex items-center gap-3">
                      <Badge className={`text-lg px-4 py-1 ${
                        advancedStats.readingLevel === 'Very Easy' ? 'bg-green-500' :
                        advancedStats.readingLevel === 'Easy' ? 'bg-blue-500' :
                        advancedStats.readingLevel === 'Medium' ? 'bg-yellow-500' :
                        advancedStats.readingLevel === 'Hard' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}>
                        {advancedStats.readingLevel}
                      </Badge>
                      <span className="text-2xl font-bold">{advancedStats.readingLevelScore}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Avg Word Length</p>
                    <p className="text-2xl font-bold">{advancedStats.avgWordLength} chars</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Sentence Length</p>
                    <p className="text-xl font-semibold">{advancedStats.avgSentenceLength} words</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Long Sentences (&gt;20 words)</p>
                    <p className="text-xl font-semibold">{advancedStats.longSentences}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keyword Density */}
            {advancedStats.keywordDensity.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Top Keywords (Density %)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {advancedStats.keywordDensity.slice(0, 10).map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-xs font-semibold text-muted-foreground w-6">#{index + 1}</span>
                          <span className="font-medium">{keyword.word}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(parseFloat(keyword.percentage) * 10, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold w-16 text-right">
                            {keyword.count}x ({keyword.percentage}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* SEO Content with Internal Links */}
        <div className="mt-12 space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              What is a Word Counter?
            </h2>
            <p className="leading-relaxed">
              A word counter is an essential online tool that instantly counts words, characters, sentences, and paragraphs in your text. Whether you're a student working on an essay, a content writer optimizing blog posts, or a professional preparing documents, our free word counter helps you track your writing progress and meet specific word limits with precision.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              How to Use This Word Counter Tool
            </h2>
            <p className="leading-relaxed">
              Simply paste or type your text into the input box above, and our tool will automatically calculate all statistics in real-time. You can also use our <a href="/tools/text-summarizer" className="text-primary hover:underline font-medium">text summarizer</a> to condense long content or the <a href="/tools/paraphrasing" className="text-primary hover:underline font-medium">paraphrasing tool</a> to rewrite text while maintaining word count targets.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Advanced Features
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Real-time word and character counting with live updates</li>
              <li>Reading level analysis using Flesch Reading Ease score</li>
              <li>Keyword density tracking for SEO optimization</li>
              <li>Word limit mode with visual progress indicators</li>
              <li>Reading time and speaking time estimation</li>
              <li>Long sentence detection for readability improvement</li>
              <li>Copy, download, and clear text functionality</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Why Use a Word Counter?
            </h2>
            <p className="leading-relaxed">
              Word counters are essential for meeting word limits in academic essays, optimizing SEO content length, staying within social media character restrictions, and improving writing efficiency. Students can ensure their assignments meet requirements, while content writers can optimize for search engines. Our tool also integrates well with other writing aids like our <a href="/tools/grammar-corrector" className="text-primary hover:underline font-medium">grammar checker</a> and <a href="/tools/resume-generator" className="text-primary hover:underline font-medium">resume builder</a> for comprehensive writing support.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
