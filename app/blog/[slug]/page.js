'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { getBlogPost, getLatestBlogPosts } from '../../../lib/blogData';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const params = useParams();
  const post = getBlogPost(params.slug);
  const relatedPosts = getLatestBlogPosts(3).filter(p => p.slug !== params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center mb-6 px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        {/* Category Badge */}
        <Badge className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-500 border border-blue-500/20">
          {post.category}
        </Badge>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border/40">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-4xl font-bold mt-8 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-bold mt-6 mb-3 text-foreground" {...props} />,
              p: ({node, ...props}) => <p className="text-lg leading-relaxed mb-6 text-muted-foreground" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 space-y-2 text-muted-foreground" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 space-y-2 text-muted-foreground" {...props} />,
              li: ({node, ...props}) => <li className="text-lg leading-relaxed" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-muted-foreground" {...props} />,
              table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="min-w-full border-collapse border border-border" {...props} /></div>,
              thead: ({node, ...props}) => <thead className="bg-muted" {...props} />,
              th: ({node, ...props}) => <th className="border border-border px-4 py-2 text-left font-bold" {...props} />,
              td: ({node, ...props}) => <td className="border border-border px-4 py-2" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* CTA Section */}
        <Card className="my-12 border-2 border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Try Our AI Writing Tools?
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Experience the power of AI-driven grammar checking, paraphrasing, and writing improvement
            </p>
            <a href="https://ai.quicktexttool.in" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-10 py-6">
                Try Free AI Tools
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 border-t border-border/40 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="group h-full overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-500 border border-blue-500/20">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {relatedPost.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
