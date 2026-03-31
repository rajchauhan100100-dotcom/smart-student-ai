'use client'

import { useState } from 'react';
import { Search, Sparkles, Zap, Shield } from 'lucide-react';
import { ToolCard } from '@/components/ToolCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { tools, categories } from '@/lib/toolsData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-1">
              <Sparkles className="h-3 w-3 mr-1" />
              Free AI-Powered Tools
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              All-in-One AI Toolkit
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              for Students & Job Seekers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Boost your productivity with our collection of free, fast, and powerful AI tools. 
              No login required.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for tools..."
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 px-4 border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Tools
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
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
    </div>
  );
}