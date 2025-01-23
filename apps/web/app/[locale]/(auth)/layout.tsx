import { auth } from "@/modules/auth/lib/auth";

// Styles
import "@/styles/globals.css";

// Components
import { BackToHomeButton } from "@/modules/auth/ui/back-to-home-button";

// Config
import { routing } from "@/config/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AuthLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();

  if (session) {
    redirect("/hub");
  }

  return (
    <>
      <BackToHomeButton />
      {children}
    </>
  );
}
