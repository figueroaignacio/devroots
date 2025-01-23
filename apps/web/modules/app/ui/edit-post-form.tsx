"use client";

// Hooks
import { useRouter } from "next/navigation";
import { useState } from "react";

// Components
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";

// Definitions & Services
import { Loader } from "@/components/shared/loader";
import { UpdatePost } from "../lib/definitions";
import { updatePost } from "../services/posts-service";

export function EditPostForm({
  post,
}: {
  post: { id: string; title: string; content: string; published: boolean };
}) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(post.title);
  const [content, setContent] = useState<string>(post.content);
  const [published, setPublished] = useState<boolean>(post.published);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedPostData: UpdatePost = {
      title,
      content,
      published: true,
    };

    try {
      await updatePost(post.id, updatedPostData);
      router.push("/hub");
    } catch (error) {
      setError("Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 w-[700px]">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <div className="flex gap-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader /> : "Update"}
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/hub")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
