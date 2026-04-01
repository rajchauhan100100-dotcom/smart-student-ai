'use client'

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function ToolCard({ tool, featured = false }) {
  const Icon = tool.icon;

  return (
    <Link href={tool.path} className="group">
      <Card className={`
        h-full overflow-hidden
        border-2 hover:border-primary
        transition-all duration-300
        hover:scale-105 hover:shadow-2xl hover:shadow-primary/20
        ${featured ? 'bg-gradient-to-br from-blue-500/10 to-purple-600/10' : ''}
      `}>
        <div className="p-6 space-y-4">
          {/* Icon and Badge */}
          <div className="flex items-start justify-between">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-purple-600 group-hover:to-blue-500 transition-all duration-300 shadow-lg">
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            {tool.aiPowered && (
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-md">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            )}
          </div>

          {/* Title */}
          <div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
              {tool.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tool.description}
            </p>
          </div>

          {/* CTA Button */}
          <Button 
            variant="ghost" 
            className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          >
            Try Now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}
