import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stack - Free Financial Literacy for Students',
  description:
    'Free, interactive financial literacy for grades 5-12. Learn money, budgeting, investing, and the real math behind sports betting and crypto.',
  openGraph: {
    title: 'Stack - Learn Money. Build Your Future.',
    description: 'Free financial literacy for students grades 5-12. No login. Works on any device.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-black text-xl text-gray-900">
              <span className="text-2xl">📚</span>
              <span>Stack</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/learn"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                All Lessons
              </Link>
              <Link
                href="/learn"
                className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                Start Learning
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>

        <footer className="border-t border-gray-200 mt-16 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
            <p className="mb-1">Stack is free. No ads. No login. No data collection.</p>
            <p>Built for Sidd, and every kid who deserved this class.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
