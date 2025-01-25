"use client";

// Hooks
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

// Components
import { Link } from "@/config/i18n/routing";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";

// Icons
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

export function AppSidebarLinks() {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const sidebarNavigation = t.raw("sidebarNavigation") as Sidebar[];

  const isActive = (href: string) => {
    const normalizedPathname = pathname.replace(`/${currentLocale}`, "");
    return normalizedPathname.startsWith(href);
  };

  return (
    <SidebarContent>
      {sidebarNavigation.map((group) => (
        <SidebarGroup key={group.groupLabel}>
          <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon];
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center py-2 px-3 rounded-md transition-colors dark:hover:bg-gray-600 dark:hover:bg-opacity-30 hover:bg-[#dde3ea] ${
                        active
                          ? "dark:bg-gray-600 dark:bg-opacity-30 bg-[#dde3ea]"
                          : ""
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.title}
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
