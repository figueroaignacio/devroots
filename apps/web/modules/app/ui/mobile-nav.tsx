"use client";

import { Link } from "@/config/i18n/routing";
import { cn } from "@/lib/utils";
import {
  BugPlay,
  Home,
  Lightbulb,
  Mail,
  Rss,
  Search,
  Settings,
  User,
  UsersRound,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const iconMap = {
  Home,
  Search,
  Lightbulb,
  Mail,
  UsersRound,
  BugPlay,
  Settings,
  User,
  Rss,
};

interface Sidebar {
  groupLabel: string;
  items: { href: string; icon: keyof typeof iconMap; title: string }[];
}

export function MobileNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const sidebarNavigation = t.raw("sidebarNavigation") as Sidebar[];

  // Flatten all items from all groups and take the first 5 for the bottom nav
  const bottomNavItems = sidebarNavigation
    .flatMap((group) => group.items)
    .slice(0, 5);

  const isActive = (href: string) => {
    const normalizedPathname = pathname.replace(`/${currentLocale}`, "");
    return normalizedPathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-border bg-background md:hidden">
      <div className="flex h-14 items-center justify-around">
        {bottomNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-2",
                active && "text-primary"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="sr-only">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
