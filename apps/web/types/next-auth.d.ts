import "next-auth";

declare module "next-auth" {
  interface User {
    username?: string | null;
    bio?: string | null;
  }

  interface Session {
    user: User & {
      username?: string | null;
      bio?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string | null;
    bio?: string | null;
  }
}
