import { Card, CardContent } from '../components/ui/card';
import { Sparkles, Users, Target, Zap } from 'lucide-react';

export const metadata = {
  title: 'About Us | QuickTextTool AI',
  description: 'Learn about QuickTextTool AI - your free AI-powered writing assistant for students, professionals, and content creators.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          About QuickTextTool AI
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Your free AI-powered writing assistant for better content
        </p>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  QuickTextTool AI is dedicated to making professional-grade AI writing tools accessible to everyone, completely free of charge. We believe that powerful writing assistance shouldn't be locked behind premium paywalls or require complicated accounts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  What We Offer
                </h2>
                <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">🔤 Text Summarizer</h3>
                    <p className="text-sm">Condense long articles into concise summaries with customizable length and tone</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">✍️ Paraphrasing Tool</h3>
                    <p className="text-sm">Rewrite text in multiple styles with 5 modes and adjustable rewrite strength</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">✅ Grammar Checker</h3>
                    <p className="text-sm">Advanced AI grammar correction with writing intelligence and clarity scoring</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">👤 Bio Generator</h3>
                    <p className="text-sm">Create professional bios for LinkedIn, resumes, and social profiles</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">📊 Word Counter</h3>
                    <p className="text-sm">Advanced text analysis with readability scores and keyword density</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">📝 Resume Generator</h3>
                    <p className="text-sm">Create professional resumes with clean, printable layouts</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Who We Serve
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">📚 Students</h3>
                    <p className="leading-relaxed">
                      Help with essays, assignments, and study materials. Our tools assist with grammar checking, paraphrasing for better understanding, and summarizing research materials.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">💼 Professionals</h3>
                    <p className="leading-relaxed">
                      Improve business emails, reports, and presentations. Create polished professional content quickly and efficiently.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">✨ Content Creators</h3>
                    <p className="leading-relaxed">
                      Generate fresh content variations, improve readability, and maintain consistent quality across all your writing.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">🔍 Job Seekers</h3>
                    <p className="leading-relaxed">
                      Create compelling resumes, professional bios, and error-free cover letters that stand out.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  Why Choose Us
                </h2>
                <div className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <div>
                      <strong className="text-foreground">100% Free</strong> - All tools, all features, no hidden costs
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <div>
                      <strong className="text-foreground">No Account Needed</strong> - Start using tools immediately
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <div>
                      <strong className="text-foreground">Advanced AI</strong> - Powered by Google Gemini 2.5 Flash
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <div>
                      <strong className="text-foreground">Privacy Focused</strong> - Your data is not stored
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <div>
                      <strong className="text-foreground">Fast & Responsive</strong> - Instant results, mobile-friendly
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <div>
                      <strong className="text-foreground">Better Than Competitors</strong> - More features than premium tools
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We're committed to continuously improving our tools, adding new features, and maintaining the highest standards of quality and privacy. Our tools are designed to assist and enhance your writing, not replace your unique voice and perspective.
                </p>
              </section>

              <section className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-3">Get Started Today</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Join thousands of students, professionals, and content creators who use QuickTextTool AI every day to write better, faster, and more confidently.
                </p>
                <a href="/" className="text-primary hover:underline font-medium">
                  → Explore Our Tools
                </a>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
