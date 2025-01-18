// Hooks
import { useTranslations } from "next-intl";

// Components
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/config/i18n/routing";

// Icons
import {
  BugPlay,
  Home,
  Lightbulb,
  Mail,
  Rss,
  Settings,
  User,
} from "lucide-react";

const iconMap = {
  Home,
  Lightbulb,
  Rss,
  User,
  Settings,
  BugPlay,
  Mail,
};

interface Sidebar {
  groupLabel: string;
  items: { href: string; icon: keyof typeof iconMap; title: string }[];
}

export function AppSidebarLinks() {
  const t = useTranslations();
  const sidebarNavigation = t.raw("sidebarNavigation") as Sidebar[];

  return (
    <SidebarContent>
      {sidebarNavigation.map(
        (group: {
          groupLabel: string;
          items: { href: string; icon: keyof typeof iconMap; title: string }[];
        }) => (
          <SidebarGroup key={group.groupLabel}>
            <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <SidebarMenuButton asChild key={item.href} variant="ghost">
                      <SidebarMenuItem className="text-sm">
                        <Link
                          href={item.href}
                          className="flex items-center py-2 w-full"
                        >
                          <Icon className="mr-3 h-5 w-5" />
                          {item.title}
                        </Link>
                      </SidebarMenuItem>
                    </SidebarMenuButton>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )
      )}
    </SidebarContent>
  );
}
