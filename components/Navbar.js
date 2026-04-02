'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              QuickTextTool AI
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              href="/#all-tools"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all cursor-pointer"
            >
              Tools
            </Link>
            <Link
              href="/#all-tools"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all cursor-pointer"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all cursor-pointer"
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link 
              href="/#all-tools"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 cursor-pointer transition-all"
            >
              Start Now
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left py-2 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              href="/#all-tools"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left py-2 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all cursor-pointer"
            >
              Tools
            </Link>
            <Link
              href="/#all-tools"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left py-2 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all cursor-pointer"
            >
              Categories
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left py-2 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all cursor-pointer"
            >
              About
            </Link>
            <div className="mt-4 px-4">
              <Link 
                href="/#all-tools" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full px-6 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white cursor-pointer transition-all"
              >
                Start Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
