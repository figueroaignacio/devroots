import { z } from "zod";

export const EditPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z.string().min(1, "Content is required"),
});
