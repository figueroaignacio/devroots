// Components
import { Link } from "@/config/i18n/routing";
import { Sidebar, SidebarHeader } from "@repo/ui/components/sidebar";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarLinks } from "./app-sidebar-links";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="pl-20">
      <SidebarHeader className="px-2 py-3">
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
