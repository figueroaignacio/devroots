"use client";

// Hooks
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Components
import { FeedPost } from "./feed-post";
import { FeedPostSkeleton } from "./feed-post-skeleton";

// Types
import type { Post } from "../lib/definitions";

// Services
import { deletePost, getPosts } from "../services/posts-service";

export function Feed() {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
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
      <ul className="space-y-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index}>
            <FeedPostSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <ul className="space-y-6">
        {posts && posts.length === 0 ? (
          <li>No posts available.</li>
        ) : (
          posts &&
          posts.map((post) => (
            <li key={post.id}>
              <FeedPost post={post} onDelete={() => handleDelete(post)} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
