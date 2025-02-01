"use client";

// Hooks
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreatePost } from "../queries/post-queries";

// Components
import { Loader } from "@/components/shared/loader";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";

// Types
import type { CreatePost } from "../lib/definitions";

// Schemas
import { CreatePostSchema } from "../lib/schemas";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormData = z.infer<typeof CreatePostSchema>;

export function CreatePostForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate, isPending } = useCreatePost();

  const form = useForm<FormData>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: FormData) {
    if (!session?.user?.id) {
      console.error("User not logged in");
      return;
    }

    const newPost: CreatePost = {
      ...values,
      published: true,
      authorId: session.user.id,
    };

    mutate(newPost, {
      onSuccess: () => router.push("/hub"),
      onError: (error) => console.error("Failed to create post:", error),
    });
  }

  return (
    <div className="container mx-auto py-8 w-[700px]">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter the title of your post.</FormDescription>
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
                  <Textarea {...field} className="min-h-[200px]" />
                </FormControl>
                <FormDescription>
                  Write the content of your post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader /> : "Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
