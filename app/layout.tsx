import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import HeaderXP from '@/components/HeaderXP';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
      <body className={`${spaceGrotesk.className} bg-[#0D0F14] min-h-screen`}>
        <header className="bg-[#131620] border-b border-white/5 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="bg-emerald-400 text-gray-900 text-xs font-bold w-7 h-7 rounded-md flex items-center justify-center">
                $
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Stack</span>
            </Link>
            <nav className="flex items-center gap-3">
              <HeaderXP />
              <Link
                href="/learn"
                className="text-sm font-medium text-gray-500 hover:text-white transition-colors hidden sm:block"
              >
                All Missions
              </Link>
              <Link
                href="/learn"
                className="bg-emerald-400 text-gray-900 text-sm font-bold px-4 py-2 rounded-md hover:bg-emerald-300 transition-colors"
              >
                Play →
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>

        <footer className="border-t border-white/5 mt-16 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-700">
            Stack is free. No ads. No login. No data collection.
          </div>
        </footer>
      </body>
    </html>
  );
}
