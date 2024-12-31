// Components
import { RegisterForm } from "@/modules/auth/ui/register-form";
import { RegisterHero } from "@/modules/auth/ui/register-hero";

// Utils
import { auth } from "@/modules/auth/lib/auth";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

interface RegisterPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();

  if (session) {
    redirect("/hub");
  }

  return (
    <section className="min-h-[90dvh] flex justify-around">
      <RegisterHero />
      <RegisterForm />
    </section>
  );
}
