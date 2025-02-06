// Components
import { Providers } from "@/components/shared/providers";
import { AppHeader } from "@/modules/app/ui/app-header";
import { AppSidebar } from "@/modules/app/ui/app-sidebar";

// Styles
import "@/styles/globals.css";

// Utils
import { routing } from "@/config/i18n/routing";
import { auth } from "@/modules/auth/lib/auth";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

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

  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <Providers session={session}>
      <AppSidebar />
      <div className="w-full">
        <AppHeader />
        <main className="relative">{children}</main>
      </div>
    </Providers>
  );
}
