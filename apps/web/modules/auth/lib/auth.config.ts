import { db } from "@repo/db";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { success, data } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid Credentials");
        }

        const user = await db.user.findUnique({ where: { email: data.email } });

        if (!user || !user.password) {
          throw new Error("Invalid Credentials");
        }

        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error("Invalid Credentials");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
