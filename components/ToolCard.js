'use client'

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ToolCard({ tool }) {
  const Icon = tool.icon;

  return (
    <Link href={tool.path}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group border-2 hover:border-primary">
        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-purple-600 group-hover:to-blue-500 transition-all duration-300">
              <Icon className="h-6 w-6 text-white" />
            </div>
            {tool.aiPowered && (
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {tool.title}
          </CardTitle>
          <CardDescription className="text-sm">
            {tool.description}
          </CardDescription>
          <div className="flex items-center text-sm text-primary font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            Open Tool
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}