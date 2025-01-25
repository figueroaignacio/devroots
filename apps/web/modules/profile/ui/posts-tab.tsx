"use client";

// Hooks
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Components
import { Post } from "@/modules/app/lib/definitions";
import { FeedPost } from "@/modules/app/ui/feed-post";
import { FeedPostSkeleton } from "@/modules/app/ui/feed-post-skeleton";

// Services
import { deletePost } from "@/modules/app/services/posts-service";
import { getUserPosts } from "@/modules/app/services/users-service";

interface PostsTabProps {
  userId: string;
}

export function PostsTab({ userId }: PostsTabProps) {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: () => getUserPosts(userId),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = async (post: Post) => {
    try {
      await deleteMutation.mutateAsync(post.id);
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  if (isLoading) {
    return (
      <ul className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index}>
            <FeedPostSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <ul className="space-y-4">
      {posts?.map((post) => (
        <li key={post.id}>
          <FeedPost post={post} onDelete={() => handleDelete(post)} />
        </li>
      ))}
    </ul>
  );
}
