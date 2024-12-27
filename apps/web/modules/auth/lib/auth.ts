// db
import PostgresAdapter from "@auth/pg-adapter";
import { Pool as NeonPool } from "@neondatabase/serverless";

// next-auth
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

// Schemas
import { loginSchema } from "./schemas";

// Utils
import bcrypt from "bcryptjs";

const pool = new NeonPool({
  connectionString: process.env.DATABASE_URL,
}) as unknown as import("pg").Pool;

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
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { success, data } = loginSchema.safeParse(credentials);
          if (!success) {
            return null;
          }

          const { email, password } = data;

          const userResult = await pool.query(
            `SELECT id, email, password, name FROM "users" WHERE email = $1`,
            [email]
          );

          const user = userResult.rows[0];
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
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
        const { email, name, image } = user;
        try {
          const userResult = await pool.query(
            `SELECT id FROM "users" WHERE email = $1`,
            [email]
          );
          if (userResult.rows.length === 0) {
            // El usuario no existe, créalo
            await pool.query(
              `INSERT INTO "users" (email, name, image, github_id, role) 
               VALUES ($1, $2, $3, $4, $5)`,
              [email, name || null, image || null, profile?.id || null, "user"]
            );
          } else {
            // El usuario existe, actualiza su información
            await pool.query(
              `UPDATE "users" SET name = $1, image = $2, github_id = $3 
               WHERE email = $4`,
              [name || null, image || null, profile?.id || null, email]
            );
          }
          return true;
        } catch (error) {
          console.error("Error durante el inicio de sesión con GitHub:", error);
          return false;
        }
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
