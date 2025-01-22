// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";

// Utils
import { getInitials } from "@/modules/app/lib/utils";
import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

// Services
import { getUser } from "@/modules/app/services/users-service";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  const user = await getUser(params.id);

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div>
      <Avatar>
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <h1>{user?.name}</h1>
      <span className="text-xs text-muted-foreground">{user.email}</span>
    </div>
  );
}
