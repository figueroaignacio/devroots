"use client";

// Hooks
import { useToast } from "@repo/ui/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Components
import { Loader } from "@/components/shared/loader";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/form";
import { Textarea } from "@repo/ui/components/textarea";
import { CommentSchema } from "../lib/schemas";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Services
import { createComment } from "@/modules/app/services/comments-service";

type CommentFormValues = z.infer<typeof CommentSchema>;

interface CommentFormProps {
  postId: string;
  onCommentAdded: (comment: any) => void;
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: CommentFormValues) {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const comment = await createComment(
        postId,
        values.content,
        session.user.id || ""
      );
      onCommentAdded(comment);
      form.reset();
      toast({
        title: "Success",
        description: "Your comment has been added",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write your comment here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="lg:w-56">
          {isSubmitting ? <Loader /> : "Comment"}
        </Button>
      </form>
    </Form>
  );
}
