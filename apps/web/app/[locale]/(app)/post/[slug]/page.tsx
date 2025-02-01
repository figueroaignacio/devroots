import { getPostBySlug } from "@/modules/app/services/posts-service";
import { PostDetails } from "@/modules/app/ui/post-details";
import { auth } from "@/modules/auth/lib/auth";
import { notFound, redirect } from "next/navigation";

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
    notFound();
  }

  return <PostDetails post={post} />;
}
