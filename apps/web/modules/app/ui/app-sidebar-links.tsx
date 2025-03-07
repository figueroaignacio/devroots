"use client";

// Hooks
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

// Components
import { Link } from "@/config/i18n/routing";
import {
  BugPlay,
  Home,
  Lightbulb,
  Mail,
  Rss,
  Settings,
  User,
  UsersRound,
} from "lucide-react";

// Utils
import { cn } from "@/lib/utils";

const iconMap = {
  Home,
  Lightbulb,
  Rss,
  User,
  Settings,
  BugPlay,
  Mail,
  UsersRound,
};

interface Sidebar {
  groupLabel: string;
  items: { href: string; icon: keyof typeof iconMap; title: string }[];
}

interface AppSidebarLinksProps {
  closeMenu?: () => void;
}

export function AppSidebarLinks({ closeMenu }: AppSidebarLinksProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const isMobile = useIsMobile();
  const sidebarNavigation = t.raw("sidebarNavigation") as Sidebar[];

  const isActive = (href: string) => {
    const normalizedPathname = pathname.replace(`/${currentLocale}`, "");
    return normalizedPathname.startsWith(href);
  };

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto">
      {sidebarNavigation.map((group) => (
        <div key={group.groupLabel} className="mb-6">
          <h2 className="mb-2 px-4 text-sm font-medium text-muted-foreground">
            {group.groupLabel}
          </h2>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const Icon = iconMap[item.icon];
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-full px-4 py-3 text-base font-medium transition-colors hover:bg-accent",
                      active ? "font-bold" : ""
                    )}
                    onClick={() => isMobile && closeMenu?.()}
                  >
                    <Icon
                      className={cn(
                        "mr-4 h-6 w-6",
                        active ? "text-primary" : ""
                      )}
                    />
                    <span className={isMobile ? "inline" : "hidden md:inline"}>
                      {item.title}
                    </span>
                    {active && !isMobile && (
                      <div className="absolute left-0 h-12 w-1 rounded-r-full bg-primary md:hidden" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
