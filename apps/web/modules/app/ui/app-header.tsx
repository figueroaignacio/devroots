// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignOutButton } from "@/modules/auth/ui/signout-button";

// Icons
import { Settings, User } from "lucide-react";

// Utils
import { auth } from "@/modules/auth/lib/auth";

export async function AppHeader() {
  const session = await auth();

  const userInitials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="border-b">
      <div className="container mx-auto py-2 flex items-center justify-between lg:justify-end">
        <SidebarTrigger className="block lg:hidden" />
        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition">
                <AvatarImage
                  src={session.user.image ?? undefined}
                  alt={session.user.name ?? "User avatar"}
                />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm">
                <div className="font-medium">{session.user.name}</div>
                <div className="text-muted-foreground">
                  {session.user.email}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
