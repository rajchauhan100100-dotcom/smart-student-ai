import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Privacy Policy | QuickTextTool AI',
  description: 'Learn how QuickTextTool AI collects, uses, and protects your data. Transparent privacy practices for our AI-powered writing tools.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  QuickTextTool AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our AI-powered writing tools and website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Text Input Data</h3>
                    <p className="leading-relaxed">
                      When you use our AI tools (grammar checker, paraphrasing tool, text summarizer, etc.), the text you input is temporarily processed by our AI service (Google Gemini API) to generate results. This data is not permanently stored on our servers and is only used for providing the requested service.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Usage Data</h3>
                    <p className="leading-relaxed">
                      We may collect information about how you interact with our website, including pages visited, features used, and time spent on the site. This helps us improve our services.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Cookies and Local Storage</h3>
                    <p className="leading-relaxed">
                      We use browser local storage to remember your recently used tools and preferences (such as theme selection). This data stays on your device and is not transmitted to our servers.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>To provide and maintain our AI-powered tools</li>
                  <li>To process your text and generate AI responses</li>
                  <li>To improve our services and user experience</li>
                  <li>To analyze website usage and performance</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Google Gemini API</h3>
                    <p className="leading-relaxed">
                      We use Google's Gemini AI API to power our writing tools. Text you submit is processed by Google's servers according to their privacy policy. We do not store your input text permanently.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Google AdSense</h3>
                    <p className="leading-relaxed">
                      We may display advertisements through Google AdSense. Google uses cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Analytics</h3>
                    <p className="leading-relaxed">
                      We may use analytics services to understand how visitors use our website. These services may collect information about your device, browser, and browsing behavior.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Clear your browser's local storage at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please visit our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
