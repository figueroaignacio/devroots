// Components
import { Link } from "@/config/i18n/routing";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarLinks } from "./app-sidebar-links";

// Icons
import {
  BugPlay,
  Home,
  Lightbulb,
  Mail,
  Pen,
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

export function AppSidebar() {
  return (
    <div className="hidden lg:flex h-screen flex-col justify-between border-r border-border p-2 md:p-4">
      <div className="mb-6">
        <Link href="/" className="flex items-center px-2 py-3">
          <span className="text-xl font-bold">devs.</span>
        </Link>
      </div>
      <AppSidebarLinks />
      <div className="mb-6 px-2">
        <Link
          href="/post/create"
          className="flex w-full items-center justify-center rounded-full bg-primary p-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:p-4"
        >
          <Pen className="h-5 w-5 md:mr-2" />
          <span className="hidden md:inline">Post</span>
        </Link>
      </div>
      <AppSidebarFooter />
    </div>
  );
}
