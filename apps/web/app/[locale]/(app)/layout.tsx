// Styles
import "@/styles/globals.css";

// Config
import { routing } from "@/config/i18n/routing";
import { AppHeader } from "@/modules/app/ui/app-header";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
}
