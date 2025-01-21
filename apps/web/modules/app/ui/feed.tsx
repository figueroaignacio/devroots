"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Post, UpdatePost } from "../lib/definitions";
import { deletePost, getPosts, updatePost } from "../lib/services";
import { FeedPost } from "./feed-post";

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedContent, setUpdatedContent] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
    } catch (error) {
      setError("Failed to delete post");
    }
  };

  const handleUpdate = async () => {
    if (editingPost) {
      const updatedPostData: UpdatePost = {
        title: updatedTitle,
        content: updatedContent,
        published: true,
      };
      try {
        await updatePost(editingPost.id, updatedPostData);
        const updatedPosts = await getPosts();
        setPosts(updatedPosts);
        setEditingPost(null);
      } catch (error) {
        setError("Failed to update post");
      }
    }
  };

  const startEditing = (post: Post) => {
    setEditingPost(post);
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
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
              <FeedPost
                post={post}
                onDelete={() => handleDelete(post.id)}
                onUpdate={() => startEditing(post)}
              />
            </li>
          ))
        )}
      </ul>

      {editingPost && (
        <div className="mt-6 p-4 border rounded">
          <h3 className="font-semibold mb-2">Edit Post</h3>
          <Input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="mb-4"
            placeholder="Title"
          />
          <Input
            type="text"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="mb-4"
            placeholder="Content"
          />
          <div className="flex gap-x-2">
            <Button onClick={handleUpdate}>Update</Button>
            <Button onClick={() => setEditingPost(null)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}
