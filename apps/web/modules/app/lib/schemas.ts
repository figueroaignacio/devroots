import { z } from "zod";

export const EditPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z.string().min(1, "Content is required"),
});

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000, "Content must be 1000 characters or less"),
});

export const CommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment must be less than 500 characters"),
});
