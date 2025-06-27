// Fonts
import { geistSans } from '@/lib/fonts';

// Styles
import '@/styles/globals.css';

// Components
import { Header } from '@/components/header';

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
      <body className={`${geistSans.className}`}>
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
