// Components
import { LoginForm } from "@/modules/auth/ui/login-form";

// Utils
import { auth } from "@/modules/auth/lib/auth";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

interface LoginPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();

  if (session) {
    redirect("/hub");
  }

  return (
    <section className="min-h-dvh flex justify-center items-center">
      <LoginForm />
    </section>
  );
}
