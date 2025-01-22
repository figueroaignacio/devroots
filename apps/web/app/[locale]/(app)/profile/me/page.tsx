import { Link } from "@/config/i18n/routing";
import { getInitials } from "@/modules/app/lib/utils";
import { auth } from "@/modules/auth/lib/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 space-y-3 max-w-3xl">
      <header className="w-full border-b flex items-center gap-x-4 pb-3">
        <Button className="" variant="ghost" size="icon">
          <Link href="/hub" className="flex items-center">
            <ArrowLeft className="size-6" />
          </Link>
        </Button>
        {session.user.name}
      </header>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Avatar className="size-24">
            <AvatarImage
              src={session?.user?.image ?? undefined}
              alt={session?.user?.name ?? "User avatar"}
            />
            <AvatarFallback>
              {getInitials(session?.user?.name ?? "User")}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline">Edit profile</Button>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{session.user.name}</h1>
          <h2 className="text-sm text-muted-foreground">
            {session.user.email}
          </h2>
        </div>
        <div className="space-y-3">
          <span>Fullstack Developer</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            obcaecati sequi reiciendis ad excepturi sunt repellat facilis omnis
            soluta saepe.
          </p>
        </div>
      </div>
    </div>
  );
}
