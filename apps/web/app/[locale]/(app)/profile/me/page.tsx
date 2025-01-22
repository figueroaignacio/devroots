// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";

// Utils
import { getInitials } from "@/modules/app/lib/utils";
import { auth } from "@/modules/auth/lib/auth";

export default async function MyProfilePage() {
  const session = await auth();

  return (
    <div>
      <Avatar>
        <AvatarImage src={session?.user?.image ?? ""} />
        <AvatarFallback>
          {getInitials(session?.user?.name || "")}
        </AvatarFallback>
      </Avatar>
      <h1>{session?.user?.name}</h1>
      <span className="text-xs text-muted-foreground">
        {session?.user?.email}
      </span>
    </div>
  );
}
