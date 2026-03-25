import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "konxc_stable_secret_2024_01_30_xyz",
  baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:4321",
  trustedOrigins: [
    "https://www.konxc.space",
    "https://konxc.space",
    "http://localhost:4321",
  ],
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.users, // Better Auth expects 'user' (singular), but schema exports 'users' (plural)
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [],
});
