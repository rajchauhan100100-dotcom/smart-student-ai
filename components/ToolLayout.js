'use client'

import { ArrowLeft, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useRecentTools } from '../hooks/useRecentTools';
import { RelatedTools } from './RelatedTools';

export function ToolLayout({ children, title, description, toolId, category }) {
  const [copied, setCopied] = useState(false);
  const { addRecentTool } = useRecentTools();

  // Track tool visit
  useEffect(() => {
    if (toolId) {
      addRecentTool(toolId, { title, description, category });
    }
  }, [toolId, title, description, category, addRecentTool]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-6 -ml-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {/* Content */}
          {children}

          {/* Ad Placeholder 1 - Below Main Tool */}
          <div className="my-8 p-8 border-2 border-dashed border-border/50 rounded-xl bg-muted/30 text-center">
            <p className="text-sm text-muted-foreground">Advertisement Space</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      {toolId && category && (
        <RelatedTools currentToolId={toolId} category={category} />
      )}

      {/* Ad Placeholder 2 - Below Related Tools */}
      <div className="container mx-auto px-4 max-w-6xl my-8">
        <div className="p-8 border-2 border-dashed border-border/50 rounded-xl bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground">Advertisement Space</p>
        </div>
      </div>
    </>
  );
}

export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={copyToClipboard}
      size="sm"
      variant="outline"
      className="gap-2"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  );
}