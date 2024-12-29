// Components
import { RegisterForm } from "@/modules/auth/ui/register-form";
import { RegisterHero } from "@/modules/auth/ui/register-hero";

// Utils
import { setRequestLocale } from "next-intl/server";

interface RegisterPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="min-h-[80dvh] flex justify-around">
      <RegisterHero />
      <RegisterForm />
    </section>
  );
}
