// Database
import PostgresAdapter from "@auth/pg-adapter";
import { Pool as NeonPool } from "@neondatabase/serverless";

// Next-Auth
import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

// Schemas
import { loginSchema } from "./schemas";

// Utils
import bcrypt from "bcryptjs";

// Database Pool Initialization
const pool = new NeonPool({
  connectionString: process.env.DATABASE_URL,
}) as unknown as import("pg").Pool;

async function getUserByEmail(email: string) {
  const query = `SELECT id, email, password, name FROM "users" WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
}

async function syncGitHubUser(user: any, profile: any) {
  const { email, name, image } = user;
  const githubId = profile?.id || null;

  try {
    const existingUser = await pool.query(
      `SELECT id FROM "users" WHERE email = $1`,
      [email]
    );
    if (existingUser.rows.length === 0) {
      await pool.query(
        `INSERT INTO "users" (email, name, image, github_id, role) VALUES ($1, $2, $3, $4, $5)`,
        [email, name || null, image || null, githubId, "user"]
      );
    } else {
      await pool.query(
        `UPDATE "users" SET name = $1, image = $2, github_id = $3 WHERE email = $4`,
        [name || null, image || null, githubId, email]
      );
    }
    return true;
  } catch (error) {
    console.error("Error syncing GitHub user:", error);
    return false;
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PostgresAdapter(pool),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    // GitHub Provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    // Credentials Provider
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { success, data } = loginSchema.safeParse(credentials);
          if (!success) return null;

          const { email, password } = data;
          const user = await getUserByEmail(email);
          if (!user) return null;

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) return null;

          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && user.email) {
        return await syncGitHubUser(user, profile);
      }
      return true;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        if (url.includes("error=OAuthAccountNotLinked")) {
          return `${baseUrl}/auth/login?error=OAuthAccountNotLinked`;
        }
        return `${baseUrl}/hub`;
      } else if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
