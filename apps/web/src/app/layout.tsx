// Providers
import { ThemeProvider } from '@/providers/theme-provider';

// Components
import { BackgroundDecoration } from '@/modules/lobby/components/background-decoration';

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
      <body className={`${geistSans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundDecoration />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
