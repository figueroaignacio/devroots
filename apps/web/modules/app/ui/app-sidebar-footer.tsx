"use client";

// Hooks
import { useIsMobile } from "@/hooks/use-mobile";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import { Link } from "@/config/i18n/routing";
import { SignOutButton } from "@/modules/auth/ui/signout-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { MoreHorizontal, Settings, User } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";
import { getInitials } from "../lib/utils";

interface AppSidebarFooterProps {
  closeMenu?: () => void;
}

export function AppSidebarFooter({ closeMenu }: AppSidebarFooterProps) {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!session?.user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex w-full items-center justify-between rounded-full p-3 transition-colors hover:bg-accent"
      >
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name ?? "User avatar"}
            />
            <AvatarFallback>
              {getInitials(session.user.name ?? "User")}
            </AvatarFallback>
          </Avatar>
          <div className={isMobile ? "block" : "hidden md:block"}>
            <p className="text-sm font-medium">{session.user.username}</p>
            <p className="text-xs text-muted-foreground">
              @{session.user.username}
            </p>
          </div>
        </div>
        <MoreHorizontal
          className={cn(
            "h-5 w-5 text-muted-foreground",
            isMobile ? "block" : "hidden md:block"
          )}
        />
      </button>

      {isMenuOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full rounded-lg border border-border bg-background shadow-lg">
          <div className="p-2">
            <Link
              href={`/profile/${session.user.username}`}
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
              onClick={() => {
                setIsMenuOpen(false);
                isMobile && closeMenu?.();
              }}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
              onClick={() => {
                setIsMenuOpen(false);
                isMobile && closeMenu?.();
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
            <div
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
              onClick={() => {
                setIsMenuOpen(false);
                isMobile && closeMenu?.();
              }}
            >
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
