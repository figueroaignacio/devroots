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

export function AppSidebarLinks() {
  const appMenuItems = [
    { icon: Home, label: "Hub", href: "/hub" },
    { icon: Lightbulb, label: "Challenges", href: "/challenges" },
    { icon: User, label: "Profile", href: "/user/profile" },
    { icon: Settings, label: "Settings", href: "/user/settings" },
    { icon: Rss, label: "Blog", href: "/blog" },
  ];

  const supportMenuItems = [
    { icon: BugPlay, label: "Report a Bug", href: "/report-bug" },
    { icon: Mail, label: "Developer Contact", href: "/contact" },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>App</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {appMenuItems.map((item) => (
              <SidebarMenuButton asChild key={item.href}>
                <SidebarMenuItem>
                  <Link href={item.href} className="flex items-center py-2">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </SidebarMenuItem>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Support</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {supportMenuItems.map((item) => (
              <SidebarMenuButton asChild key={item.href}>
                <SidebarMenuItem>
                  <Link href={item.href} className="flex items-center py-2">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </SidebarMenuItem>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
