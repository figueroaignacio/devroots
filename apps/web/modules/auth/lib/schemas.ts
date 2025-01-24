import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .transform((value) => value.toLowerCase())
    .refine((value) => /^[a-z0-9_]+$/.test(value), {
      message:
        "Username must be lowercase and contain only letters, numbers, or underscores",
    }),
  password: z.string().min(6, { message: "Password is required" }),
});
