// Components
import { Providers } from "@/components/shared/providers";
import { AppHeader } from "@/modules/app/ui/app-header";
import { AppSidebar } from "@/modules/app/ui/app-sidebar";
import { MobileNav } from "@/modules/app/ui/mobile-nav";

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
      <AppHeader />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto">
        <div className="lg:col-span-3">
          <AppSidebar />
        </div>
        <main className="relative lg:col-span-6">{children}</main>
        <div className="lg:col-span-4"></div>
        <MobileNav />
      </div>
    </Providers>
  );
}
