import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoUpButton from '@/components/layout/GoUpButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Love Letters to the World',
  description: 'Created by Brian Rashid',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon_dark.svg"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.svg"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="relative flex-grow">
          {children}
          <GoUpButton />
        </main>
        <Footer />
      </body>
    </html>
  );
}
