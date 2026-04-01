'use client'

import { useState } from 'react';
import { Search, Sparkles, Zap, Shield, CheckCircle, Star, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { ToolCard } from '../components/ToolCard';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { tools, categories } from '../lib/toolsData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTools = tools.slice(0, 6);
  const newTools = tools.slice(6, 10);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant results with no delays'
    },
    {
      icon: Shield,
      title: '100% Free',
      description: 'No hidden fees, ever'
    },
    {
      icon: CheckCircle,
      title: 'No Login Required',
      description: 'Start using immediately'
    },
    {
      icon: Star,
      title: 'AI-Powered',
      description: 'Cutting-edge technology'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'College Student',
      content: 'These tools have saved me hours on my assignments. The text summarizer is a game-changer!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Content Writer',
      content: 'The paraphrasing tool is incredible. It helps me create unique content quickly.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Job Seeker',
      content: 'Resume generator helped me create a professional resume in minutes. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-1.5 text-sm shadow-lg shadow-blue-500/25">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Free AI-Powered Tools for Everyone
            </Badge>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                All-in-One AI Toolkit
              </span>
              <br />
              <span className="text-foreground">
                for Students & Professionals
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Boost your productivity with our collection of <strong>10+ free AI tools</strong>. 
              No sign-up required. Start creating, writing, and building instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl shadow-blue-500/25 text-lg px-8 py-6"
                asChild
              >
                <a href="#tools">
                  Start Using Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 text-lg px-8 py-6"
                asChild
              >
                <a href="#about">
                  Explore All Tools
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/50 backdrop-blur border border-border/50 shadow-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">No Login Required</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/50 backdrop-blur border border-border/50 shadow-lg">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Free Forever</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/50 backdrop-blur border border-border/50 shadow-lg">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Fast & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section id="categories" className="py-8 px-4 bg-muted/30 border-y border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for tools..."
                className="pl-12 h-14 text-lg rounded-2xl border-2 bg-background/50 backdrop-blur"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                className="cursor-pointer px-5 py-2.5 text-sm rounded-full hover:scale-105 transition-transform"
                onClick={() => setSelectedCategory('all')}
              >
                All Tools
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className="cursor-pointer px-5 py-2.5 text-sm rounded-full hover:scale-105 transition-transform"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              Most Popular
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trending Tools
            </h2>
            <p className="text-muted-foreground text-lg">
              Most used by thousands of students and professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Section */}
      <section id="tools" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {searchQuery ? 'Search Results' : 'All Tools'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No tools found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Smart Student AI?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to providing the best free tools for students and professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary hover:scale-105 transition-all duration-300">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 inline-block p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <Users className="h-3.5 w-3.5 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Thousands
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our users have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:scale-105 transition-transform">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 bg-gradient-to-br from-blue-500/10 to-purple-600/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <CardContent className="pt-12 pb-12 text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Boost Your Productivity?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students and professionals using our free AI tools every day
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl shadow-blue-500/25 text-lg px-10 py-6"
                asChild
              >
                <a href="#tools">
                  Get Started Now - It's Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
