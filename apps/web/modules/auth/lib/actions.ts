"use server";

import { z } from "zod";
import { LoginSchema, RegisterSchema } from "./schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  return { success: "Email sent!" };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  return { success: "Email sent!" };
};
