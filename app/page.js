'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToolCard } from '../components/ToolCard';
import { tools } from '../lib/toolsData';
import { getLatestBlogPosts } from '../lib/blogData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Search, Sparkles, Zap, Lock, Target, CheckCircle, Star, Users, TrendingUp, Award, BookOpen, Calendar, Clock } from 'lucide-react';
import { useRecentTools } from '../hooks/useRecentTools';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { recentTools } = useRecentTools();
  const router = useRouter();
  const latestPosts = getLatestBlogPosts(3);

  // Most popular tools (highlight these)
  const popularToolIds = ['grammar-corrector', 'paraphrasing', 'text-summarizer'];
  const popularTools = tools.filter(tool => popularToolIds.includes(tool.id));
  
  // Filter tools
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Tools', icon: '🎯' },
    { id: 'ai-writing', name: 'AI Writing', icon: '✍️' },
    { id: 'student', name: 'Study Tools', icon: '📚' },
    { id: 'resume-job', name: 'Resume Tools', icon: '💼' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION - POWERFUL & STUDENT-FOCUSED */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-background"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <Badge className="mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-6 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Trusted by 10,000+ Students Daily
            </Badge>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Free AI Tools Every<br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Student Needs
              </span>{' '}
              to Study Smarter 🚀
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Fix grammar, summarize notes, rewrite essays, and save hours instantly — <strong className="text-foreground">no signup required</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 text-lg px-10 py-7 group"
                onClick={() => router.push('/tools/grammar-corrector')}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Fix My Grammar Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 text-lg px-10 py-7"
                onClick={() => scrollToSection('tools')}
              >
                Explore All Tools
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">No Login Required</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Instant Results</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Built for Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / STATS SECTION */}
      <section className="py-12 px-4 border-y bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">Daily Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Free Forever</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">10+</div>
              <div className="text-sm text-muted-foreground mt-1">AI Tools</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">4.9★</div>
              <div className="text-sm text-muted-foreground mt-1">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* MOST POPULAR TOOLS - TOP PRIORITY */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-blue-500/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mb-4">
              🔥 MOST POPULAR
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tools Students Use <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Every Day</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our most loved AI tools that save students hours of work
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <Card
                key={tool.id}
                className="group relative overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
                onClick={() => router.push(tool.path)}
              >
                {/* Popular Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                    🔥 Most Used
                  </Badge>
                </div>

                <CardContent className="pt-8 pb-6">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-purple-600 group-hover:to-blue-500 transition-all duration-300">
                        <tool.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {tool.description}
                  </p>

                  {/* CTA */}
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white group-hover:shadow-lg"
                  >
                    Use Tool
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              className="border-2"
              onClick={() => scrollToSection('all-tools')}
            >
              See All {tools.length} Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / TRUST SECTION */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-500/5 to-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 mb-4">
              ⭐ STUDENT REVIEWS
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Loved by Students Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-foreground mb-4 font-medium">
                  "Saved me hours during finals! The grammar checker caught mistakes I never would have found."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <div className="font-medium">Sarah M.</div>
                    <div className="text-sm text-muted-foreground">University Student</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-foreground mb-4 font-medium">
                  "Best free tool for assignments. No signup BS, just instant results. Exactly what students need!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <div className="font-medium">Michael T.</div>
                    <div className="text-sm text-muted-foreground">College Senior</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-foreground mb-4 font-medium">
                  "I use the paraphrasing tool every week. It's better than paid alternatives I've tried!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <div>
                    <div className="font-medium">Emma L.</div>
                    <div className="text-sm text-muted-foreground">Graduate Student</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA SECTION - FIX GRAMMAR */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Fix Your Grammar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get instant AI-powered corrections and improve your writing quality in seconds
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-10 py-6"
            onClick={() => router.push('/tools/grammar-corrector')}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Fix Grammar Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* SEARCH + FILTER + ALL TOOLS */}
      <section id="all-tools" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              All Tools at Your Fingertips
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose from {tools.length} powerful tools to boost your productivity
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tools... (try 'grammar' or 'summarize')"
                className="pl-12 pr-4 py-6 text-lg border-2 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                className={`
                  ${selectedCategory === cat.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'border-2'
                  }
                `}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Tool Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card
                key={tool.id}
                className="group relative overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => router.push(tool.path)}
              >
                {tool.aiPowered && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI
                    </Badge>
                  </div>
                )}

                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tool.description}
                  </p>

                  <Button 
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-blue-500 group-hover:text-white"
                  >
                    Use Tool
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No tools found matching "{searchQuery}"
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-500/5 to-purple-500/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Why Students Choose Us
            </h2>
            <p className="text-xl text-muted-foreground">
              The smartest way to get your work done faster
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center border-2 hover:border-blue-500 transition-all hover:scale-105">
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Get results in seconds, not minutes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-green-500 transition-all hover:scale-105">
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 inline-flex p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% Free Forever</h3>
                <p className="text-muted-foreground">
                  No hidden fees or premium tiers
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-purple-500 transition-all hover:scale-105">
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Login Required</h3>
                <p className="text-muted-foreground">
                  Start using tools immediately
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-orange-500 transition-all hover:scale-105">
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 inline-flex p-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Built for Students</h3>
                <p className="text-muted-foreground">
                  Designed with your needs in mind
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES SECTION */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-blue-500/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 mb-4">
              <BookOpen className="h-4 w-4 mr-2" />
              Latest Articles
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Learn More About{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                AI Writing
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Expert tips, guides, and comparisons to help you write better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group h-full overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Badge className="w-fit mb-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-500 border border-blue-500/20">
                      {post.category}
                    </Badge>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {post.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pt-4 border-t border-border/40">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <Button variant="ghost" className="w-full justify-between group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      Read More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="border-2"
              >
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <CardContent className="pt-12 pb-12 text-center relative z-10">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 mb-4">
                <TrendingUp className="h-4 w-4 mr-2" />
                Join 10,000+ Students
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Start Working Smarter,{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Not Harder
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who save hours every week with our free AI tools
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-10 py-6"
                  onClick={() => scrollToSection('all-tools')}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 text-lg px-10 py-6"
                  onClick={() => router.push('/about')}
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
