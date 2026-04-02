import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Terms of Service | QuickTextTool AI',
  description: 'Terms and conditions for using QuickTextTool AI writing tools and services.',
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using QuickTextTool AI, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Use of Services</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Our AI-powered writing tools are provided for legitimate purposes only. You agree to:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Use the tools for lawful purposes only</li>
                    <li>Not attempt to abuse, harm, or overload our services</li>
                    <li>Not use automated systems to access our tools excessively</li>
                    <li>Not submit content that violates others' rights or applicable laws</li>
                    <li>Not attempt to reverse engineer or copy our services</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">AI-Generated Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our tools use artificial intelligence to generate, correct, or improve text. While we strive for accuracy:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside mt-3">
                  <li>AI outputs may contain errors or inaccuracies</li>
                  <li>You are responsible for reviewing and verifying all AI-generated content</li>
                  <li>We do not guarantee the correctness, quality, or suitability of outputs</li>
                  <li>Results should not be considered professional advice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of the text you input and the AI-generated outputs. Our website design, code, and branding remain our property. You may not copy, modify, or redistribute our website or services without permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p className="leading-relaxed font-medium text-foreground">
                    Our services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind.
                  </p>
                  <p className="leading-relaxed">
                    We disclaim all warranties, express or implied, including but not limited to:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Accuracy or reliability of AI outputs</li>
                    <li>Uninterrupted or error-free operation</li>
                    <li>Fitness for a particular purpose</li>
                    <li>Non-infringement of third-party rights</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, QuickTextTool AI and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services, including but not limited to damages for loss of profits, data, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Academic Integrity</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you're a student, you are responsible for using our tools in accordance with your institution's academic integrity policies. Our tools are designed to assist with writing, not to replace your own work or thinking.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice. We may also impose usage limits or restrictions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update these Terms of Service periodically. Continued use of our services after changes constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms, please visit our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
