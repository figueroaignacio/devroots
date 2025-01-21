"use client";

import { useEffect, useState } from "react";
import { Post } from "../lib/definitions";
import { deletePost, getPosts } from "../lib/services";
import { FeedPost } from "./feed-post";

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
    } catch (error) {
      setError("Failed to delete post");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ul className="space-y-6">
        {posts.length === 0 ? (
          <li>No posts available.</li>
        ) : (
          posts.map((post) => (
            <li key={post.id}>
              <FeedPost post={post} onDelete={() => handleDelete(post.id)} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
