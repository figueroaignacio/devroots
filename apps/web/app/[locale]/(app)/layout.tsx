import { auth } from "@/modules/auth/lib/auth";

// Styles
import "@/styles/globals.css";

// Components
import { AppSidebar } from "@/modules/app/ui/app-sidebar";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { SessionProvider } from "next-auth/react";

// Config
import { routing } from "@/config/i18n/routing";
import { AppHeader } from "@/modules/app/ui/app-header";
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
