// Sections
import { Hero } from "@/modules/landing/sections/hero";

// Utils
import { setRequestLocale } from "next-intl/server";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LandingPage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="page-container py-12 space-y-16">
      <Hero />
      {/* <Spotlights /> */}
    </main>
  );
}
