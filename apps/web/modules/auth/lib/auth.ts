import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@repo/db";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers: { POST, GET },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
