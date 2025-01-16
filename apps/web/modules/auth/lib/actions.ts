"use server";

import { db } from "@repo/db";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "./auth";
import { loginSchema, registerSchema } from "./schemas";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const result = registerSchema.safeParse(values);

    if (!result.success) {
      return {
        error: "Invalid Data",
        details: result.error.flatten(),
      };
    }

    const { email, name, password } = result.data;

    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return { error: "Failed to create user" };
    }

    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      return { error: "Failed to sign in after registration" };
    }

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message || "Authentication error" };
    }
    return { error: "An unexpected error occurred" };
  }
};
