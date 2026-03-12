import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import HeaderXP from '@/components/HeaderXP';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Stack - Free Financial Literacy for Students',
  description:
    'Free, interactive financial literacy for grades 5-12. Learn money, budgeting, investing, and the real math behind sports betting and crypto.',
  openGraph: {
    title: 'Stack - Learn Money. Level Up For Real.',
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
      <body className={`${nunito.className} bg-[#F8F7F4] min-h-screen`}>
        {/* Accent bar */}
        <div className="h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400" />

        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-emerald-500 text-white text-sm font-black w-8 h-8 rounded-lg flex items-center justify-center">
                $
              </div>
              <span className="font-black text-xl text-gray-900 tracking-tight">Stack</span>
            </Link>
            <nav className="flex items-center gap-3">
              <HeaderXP />
              <Link
                href="/learn"
                className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors hidden sm:block"
              >
                All Lessons
              </Link>
              <Link
                href="/learn"
                className="bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-emerald-600 transition-colors"
              >
                Play →
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>

        <footer className="border-t border-gray-200 mt-16 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-400">
            <p>Stack is free. No ads. No login. No data collection.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
