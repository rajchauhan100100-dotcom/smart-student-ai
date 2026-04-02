'use client'

import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { blogPosts } from '../../lib/blogData';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-background"></div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <Badge className="mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 mb-4">
            <BookOpen className="h-4 w-4 mr-2" />
            AI Writing Blog
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Writing Tips & AI Tool{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Guides
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to write better, faster, and smarter with AI-powered tools and expert writing advice
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group h-full overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Category Badge */}
                    <Badge className="w-fit mb-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-500 border border-blue-500/20">
                      {post.category}
                    </Badge>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {post.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-border/40 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Improve Your Writing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Try our free AI-powered writing tools and start writing better today
          </p>
          <Link href="/#all-tools">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-10 py-6">
              Explore Free Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
