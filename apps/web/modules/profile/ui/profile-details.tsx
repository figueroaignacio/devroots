// Components
import { Link } from "@/config/i18n/routing";
import { ChallengesTab } from "@/modules/profile/ui/challenges-tab";
import { CommentsTab } from "@/modules/profile/ui/comments-tab";
import { PostsTab } from "@/modules/profile/ui/posts-tab";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { ArrowLeft } from "lucide-react";

// Utils
import { getInitials } from "@/modules/app/lib/utils";
import { getUser } from "@/modules/app/services/users-service";
import { auth } from "@/modules/auth/lib/auth";
import { notFound } from "next/navigation";

export async function ProfileDetails({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const session = await auth();
  const currentUser = session?.user?.id;

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 space-y-6 max-w-3xl">
      <header className="w-full border-b flex items-center gap-x-4 pb-3">
        <Button className="" variant="ghost" size="icon">
          <Link href="/hub" className="flex items-center">
            <ArrowLeft className="size-6" />
          </Link>
        </Button>
        {user.name}
      </header>
      <div className="space-y-6">
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex items-center">
            <Avatar className="size-24">
              <AvatarImage
                src={user?.image ?? undefined}
                alt={user?.name ?? "User avatar"}
              />
              <AvatarFallback>
                {getInitials(user?.name ?? "User")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <h2 className="text-sm text-muted-foreground">{user.email}</h2>
              <span className="text-sm">Fullstack Developer</span>
            </div>
          </div>
          {currentUser === user.id && (
            <Button variant="outline">
              <Link href="/profile/edit">Edit profile</Link>
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          obcaecati sequi reiciendis ad excepturi sunt repellat facilis omnis
          soluta saepe.
        </p>
      </div>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <PostsTab userId={user.id} />
        </TabsContent>
        <TabsContent value="challenges">
          <ChallengesTab userId={user.id} />
        </TabsContent>
        <TabsContent value="comments">
          <CommentsTab userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
