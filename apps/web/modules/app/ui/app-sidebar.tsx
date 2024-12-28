// Components
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { Link } from "@/config/i18n/routing";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarLinks } from "./app-sidebar-links";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-2 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl px-2">devs.</span>
          </Link>
        </div>
      </SidebarHeader>
      <AppSidebarLinks />
      <AppSidebarFooter />
    </Sidebar>
  );
}
