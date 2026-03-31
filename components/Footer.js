'use client'

import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Smart Student AI Toolkit
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your all-in-one toolkit for academic success and productivity. Free AI-powered tools for students and job seekers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/text-summarizer" className="hover:text-foreground transition-colors">Text Summarizer</Link></li>
              <li><Link href="/tools/resume-generator" className="hover:text-foreground transition-colors">Resume Generator</Link></li>
              <li><Link href="/tools/grammar-corrector" className="hover:text-foreground transition-colors">Grammar Corrector</Link></li>
              <li><Link href="/tools/pomodoro-timer" className="hover:text-foreground transition-colors">Pomodoro Timer</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Smart Student AI Toolkit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}