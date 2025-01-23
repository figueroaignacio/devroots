"use client";

import { Post } from "@/modules/app/lib/definitions";
import { deletePost } from "@/modules/app/services/posts-service";
import { getUserPosts } from "@/modules/app/services/users-service";
import { FeedPost } from "@/modules/app/ui/feed-post";
import { useEffect, useState } from "react";

interface PostsTabProps {
  userId: string;
}

export function PostsTab({ userId }: PostsTabProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const userPosts = await getUserPosts(userId);
        setPosts(userPosts);
      } catch (error) {
        console.error("Failed to fetch user posts", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userId]);

  const handleDelete = async (post: Post) => {
    try {
      await deletePost(post.id);
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
}
