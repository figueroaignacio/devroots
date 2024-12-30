"use client";

// Hooks
import { useTranslations } from "next-intl";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "@/config/i18n/routing";

// Icons
import { Edit } from "lucide-react";

// Types
import { User } from "next-auth";

interface ProfileHeaderProps {
  user: User;
}

export function UserProfileHeader({ user }: ProfileHeaderProps) {
  const t = useTranslations("profile.header");

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={user.image || "/placeholder.svg"}
            alt={t("avatarAlt")}
          />
          <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Button variant="outline" asChild>
        <Link href="/settings" className="flex gap-3">
          {t("editProfile")}
          <Edit className="mr-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
