import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import Header from '@/components/Layout/Header/Header';
import { ModalProvider } from '@/providers/modal-provider';
import Providers from '@/components/Layout/Providers';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ExpenseTracker',
  description:
    'Track your income and expenses easily with our intuitive finance management tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable}`}>
        <Providers>
          <Header />

          <ModalProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
