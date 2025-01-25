// Components
import { Link } from "@/config/i18n/routing";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";

// Utils
import { getInitials } from "@/modules/app/lib/utils";
import { getPostBySlug } from "@/modules/app/services/posts-service";
import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <>
      <Avatar>
        <AvatarImage src={post.author.image ?? ""} />
        <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <Link href={`/profile/${post.authorId}`} className="hover:underline">
          {post.author.name}
        </Link>
      </div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </>
  );
}
