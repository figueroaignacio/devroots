import { UserRole } from "@repo/db";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: {
      role: ExtendedUser;
    };
  }
}
