import { Card, CardContent } from '../components/ui/card';

export const metadata = {
  title: 'Cookie Policy | QuickTextTool AI',
  description: 'Learn about how QuickTextTool AI uses cookies and local storage to enhance your experience.',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Cookie Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Cookies and Local Storage</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Local Storage</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We use browser local storage (not cookies) to remember:
                    </p>
                    <ul className="mt-2 space-y-2 text-muted-foreground list-disc list-inside">
                      <li>Your recently used tools</li>
                      <li>Your theme preference (dark/light mode)</li>
                      <li>Tool-specific settings and preferences</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-2">
                      This data stays on your device and is never sent to our servers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Third-Party Cookies</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may use services that set their own cookies:
                    </p>
                    <ul className="mt-2 space-y-2 text-muted-foreground list-disc list-inside">
                      <li><strong>Google AdSense</strong> - For displaying advertisements (if applicable)</li>
                      <li><strong>Analytics Services</strong> - To understand how visitors use our site</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Essential Data (Local Storage)</h3>
                    <p className="text-sm">Required for the website to function properly. Includes theme preferences and recently used tools.</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Performance/Analytics</h3>
                    <p className="text-sm">Help us understand how visitors interact with our website to improve user experience.</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Advertising (if applicable)</h3>
                    <p className="text-sm">Used by Google AdSense to serve relevant advertisements based on your interests.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Managing Cookies and Local Storage</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p className="leading-relaxed">
                    You have several options to control cookies and local storage:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong>Browser Settings:</strong> Most browsers allow you to refuse cookies or delete existing ones through settings</li>
                    <li><strong>Clear Local Storage:</strong> You can clear your browser's local storage at any time, which will reset your preferences</li>
                    <li><strong>Ad Settings:</strong> Visit Google's Ads Settings to opt out of personalized advertising</li>
                    <li><strong>Do Not Track:</strong> Many browsers support "Do Not Track" signals</li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    Note: Blocking or deleting cookies may affect your experience on our website, such as losing your theme preference or recent tools list.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How to Clear Local Storage</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-medium text-foreground">To clear local storage in your browser:</p>
                  <ul className="space-y-2 list-decimal list-inside">
                    <li>Open your browser's Developer Tools (usually F12)</li>
                    <li>Go to the "Application" or "Storage" tab</li>
                    <li>Find "Local Storage" in the left sidebar</li>
                    <li>Right-click on our website's entry and select "Clear"</li>
                  </ul>
                  <p className="mt-3">
                    Alternatively, clearing your browser cache will also remove local storage data.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. Please review this page periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies or local storage, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
