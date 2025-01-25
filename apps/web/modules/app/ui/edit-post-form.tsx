"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// Components
import { Loader } from "@/components/shared/loader";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Types
import type { UpdatePost } from "../lib/definitions";

// Services
import { updatePost } from "../services/posts-service";

// Schemas
import { EditPostSchema } from "../lib/schemas";

type FormData = z.infer<typeof EditPostSchema>;

export function EditPostForm({
  post,
}: {
  post: { id: string; title: string; content: string; published: boolean };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(EditPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: (updatedPostData: UpdatePost) =>
      updatePost(post.id, updatedPostData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/hub");
    },
    onError: (error) => {
      console.error("Failed to update post", error);
    },
  });

  const onSubmit = (data: FormData) => {
    const updatedPostData: UpdatePost = {
      ...data,
      published: true,
    };

    updatePostMutation.mutate(updatedPostData);
  };

  return (
    <div className="container mx-auto py-8 w-[700px]">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      {updatePostMutation.isError && (
        <p className="text-red-500 mb-4">Failed to update post</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} disabled={updatePostMutation.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={updatePostMutation.isPending}
                    className="min-h-[200px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-2">
            <Button type="submit" disabled={updatePostMutation.isPending}>
              {updatePostMutation.isPending ? <Loader /> : "Update"}
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/hub")}
              disabled={updatePostMutation.isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
