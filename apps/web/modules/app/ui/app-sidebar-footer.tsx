// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarFooter } from "@/components/ui/sidebar";
import { SignOutButton } from "@/modules/auth/ui/signout-button";

// Icons
import { MoreVertical, Settings, User } from "lucide-react";

// Utils
import { auth } from "@/modules/auth/lib/auth";

export async function AppSidebarFooter() {
  const session = await auth();

  const userInitials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <SidebarFooter className="border-t p-4">
      <DropdownMenu>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={session?.user?.image ?? undefined}
                alt={session?.user?.name ?? "User avatar"}
              />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium">{session?.user?.name}</p>
            </div>
          </div>
          <DropdownMenuTrigger className="focus:outline-none">
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent align="end" className="w-56">
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
    </SidebarFooter>
  );
}
