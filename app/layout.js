import Script from "next/script";
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QuickTextTool AI - Free AI Tools for Students & Professionals',
  description: 'All-in-one AI toolkit with free tools including text summarizer, resume generator, grammar checker, study planner, and more. No login required.',
  keywords: 'AI tools, text tools, student tools, resume generator, text summarizer, grammar checker, study planner, productivity tools, free AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="GTS9w8j8wQx8HxCrcmjHu_VX3atyV4LYQW6aOJx0bH0" />
      </head>
      <body className={inter.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1719926826917839"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />

  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-MMF8DKS9YJ"
    strategy="afterInteractive"
  />
  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MMF8DKS9YJ');
    `}
  </Script>

  <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}