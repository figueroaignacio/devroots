// Components
import { Link } from "@/config/i18n/routing";
import { SignOutButton } from "@/modules/auth/ui/signout-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { SidebarFooter } from "@repo/ui/components/sidebar";

// Icons
import { MoreVertical, Pen, Settings, User } from "lucide-react";

// Utils
import { auth } from "@/modules/auth/lib/auth";
import { getInitials } from "../lib/utils";

export async function AppSidebarFooter() {
  const session = await auth();

  return (
    <SidebarFooter className="p-4">
      <Button className="mb-5">
        <Link href="/post/create" className="flex items-center gap-x-3">
          <span>Post</span>
          <Pen className="size-4" />
        </Link>
      </Button>
      <DropdownMenu>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={session?.user?.image ?? undefined}
                alt={session?.user?.name ?? "User avatar"}
              />
              <AvatarFallback>
                {getInitials(session?.user?.name ?? "User")}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium">{session?.user?.username}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <DropdownMenuTrigger className="focus:outline-none">
              <MoreVertical className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </DropdownMenuTrigger>
          </Button>
        </div>
        <DropdownMenuContent align="end" className="w-56">
          <Link href={`/profile/${session?.user?.username}`}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );
}
