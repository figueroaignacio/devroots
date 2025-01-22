"use client";

// Hooks
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Components
import { Loader } from "@/components/shared/loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@repo/ui/components/button";

// Services & Definitions
import { CreatePost } from "../lib/definitions";
import { createPost } from "../services/posts-service";

export function CreatePostForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      console.error("User not logged in");
      return;
    }
    setIsSubmitting(true);
    const newPost: CreatePost = {
      title,
      content,
      published: true,
      authorId: session.user.id,
    };
    try {
      await createPost(newPost);
      router.push("/hub");
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 w-[700px]">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[200px]"
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader /> : "Post"}
        </Button>
      </form>
    </div>
  );
}
