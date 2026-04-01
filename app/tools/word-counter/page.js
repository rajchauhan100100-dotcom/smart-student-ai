'use client'

import { useState } from 'react';
import { ToolLayout } from '../../../components/ToolLayout';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { FileText, Hash, AlignLeft, List, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n+/).filter(p => p.trim()).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200)
  };

  const clearText = () => {
    setText('');
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs instantly"
      toolId="word-counter"
      category="productivity"
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button
            onClick={clearText}
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={!text}
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>

        <Textarea
          placeholder="Type or paste your text here..."
          className="min-h-[300px] text-base"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Words
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.words}</p>
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
              <p className="text-3xl font-bold">{stats.characters}</p>
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
              <p className="text-3xl font-bold">{stats.charactersNoSpaces}</p>
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
              <p className="text-3xl font-bold">{stats.sentences}</p>
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
              <p className="text-3xl font-bold">{stats.paragraphs}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Reading Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.readingTime}<span className="text-base font-normal text-muted-foreground ml-1">min</span></p>
            </CardContent>
          </Card>
        </div>

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
              Key Features
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Real-time word and character counting</li>
              <li>Sentence and paragraph analysis</li>
              <li>Reading time estimation (based on 200 words/minute)</li>
              <li>Character count with and without spaces</li>
              <li>Perfect for essays, blogs, social media, and professional documents</li>
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