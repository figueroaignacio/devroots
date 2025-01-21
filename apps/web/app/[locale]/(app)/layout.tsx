// Styles
import "@/styles/globals.css";

// Components
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/modules/app/ui/app-sidebar";
import { SessionProvider } from "next-auth/react";

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
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <AppHeader />
          <main className="page-container relative">{children}</main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
