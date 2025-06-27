// Components
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
    <div>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
