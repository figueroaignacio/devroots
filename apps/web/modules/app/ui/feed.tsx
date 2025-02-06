"use client";

// Hooks
import { useDeletePost, usePosts } from "../queries/post-queries";

// Components
import { FeedPost } from "./feed-post";
import { FeedPostSkeleton } from "./feed-post-skeleton";

// Types
import type { Post } from "../lib/definitions";

export function Feed() {
  const { data: posts, isLoading, error } = usePosts();
  const deleteMutation = useDeletePost();

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
    <ul>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <li key={post.id}>
            <FeedPost post={post} onDelete={() => handleDelete(post)} />
          </li>
        ))
      ) : (
        <li>No posts available.</li>
      )}
    </ul>
  );
}
