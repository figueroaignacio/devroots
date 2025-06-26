import { AuthGuard } from '@/modules/auth/components/auth-guard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Devroots',
  description: 'Home - Explore challenges to practice your coding skills',
};

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>;
}
