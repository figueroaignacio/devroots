// Fonts
import { geistSans } from '@/lib/fonts';

// Styles
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>{children}</body>
    </html>
  );
}
