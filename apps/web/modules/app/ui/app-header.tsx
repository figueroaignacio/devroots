// Components
import { SidebarTrigger } from "@repo/ui/components/sidebar";

export async function AppHeader() {
  return (
    <header className="sticky top-0 left-0 z-50 border-b backdrop-blur-md block md:hidden">
      <div className="container mx-auto py-2 flex items-center justify-between lg:justify-end">
        <SidebarTrigger className="block lg:hidden" />
      </div>
    </header>
  );
}
