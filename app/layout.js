import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smart Student AI Toolkit - Free AI Tools for Students & Job Seekers',
  description: 'All-in-one AI toolkit with free tools including text summarizer, resume generator, grammar checker, study planner, and more for students and job seekers.',
  keywords: 'AI tools, student tools, resume generator, text summarizer, grammar checker, study planner, productivity tools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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