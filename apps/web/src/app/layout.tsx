// Fonts
import { geistMono, geistSans } from '@/lib/fonts';

// Styles
import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devroots',
  description: 'Explore challenges to practice your coding skills',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
