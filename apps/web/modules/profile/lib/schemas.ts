import { z } from "zod";

export const EditProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(160, "Bio must be 160 characters or less"),
  image: z.string().url("Invalid URL").nullable(),
});
