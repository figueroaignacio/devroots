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
      <section className="grid place-items-center min-h-[80dvh]">
        <h1 className="text-4xl">Landing page</h1>
      </section>
      <section className="grid place-items-center min-h-[80dvh]">
        <h1 className="text-4xl">Welcome to the landing page!</h1>
      </section>
    </main>
  );
}
