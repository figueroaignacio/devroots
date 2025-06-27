// Components
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devroots',
  description: 'Explore challenges to practice your coding skills',
};

export default function LobbyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[100svh] flex-col">
      <Header />
      <main className="container mx-auto flex-1 px-4">{children}</main>
      <Footer />
    </div>
  );
}
