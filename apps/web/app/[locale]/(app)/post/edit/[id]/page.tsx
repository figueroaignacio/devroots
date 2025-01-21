import { getPost } from "@/modules/app/services/posts-service";
import { EditPostForm } from "@/modules/app/ui/edit-post-form";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const post = await getPost(params.id);

    if (!post) {
      return <p>Post not found</p>;
    }

    return <EditPostForm post={post} />;
  } catch (error) {
    if (error instanceof Error) {
      return <p>Error fetching post: {error.message}</p>;
    } else {
      return <p>Unknown error occurred</p>;
    }
  }
}
