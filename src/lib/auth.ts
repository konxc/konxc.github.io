import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db";
import * as schema from "../db/schema";
import {
  getListEnv,
  getOptionalEnv,
  getRequiredEnv,
  getRequiredUrlEnv,
  validateServerRuntimeEnv,
} from "./server-env";

validateServerRuntimeEnv();

const baseURL =
  getRequiredUrlEnv("BETTER_AUTH_BASE_URL", {
    requiredInProduction: true,
    fallback: "http://localhost:4321",
  }) ?? "http://localhost:4321";

const trustedOriginsFromEnv = getListEnv("BETTER_AUTH_TRUSTED_ORIGINS");
const trustedOrigins = Array.from(
  new Set([
    baseURL,
    ...trustedOriginsFromEnv,
    "http://localhost:4321",
    "https://www.konxc.space",
    "https://konxc.space",
  ]),
);

const githubClientId = getOptionalEnv("GITHUB_CLIENT_ID");
const githubClientSecret = getOptionalEnv("GITHUB_CLIENT_SECRET");
const googleClientId = getOptionalEnv("GOOGLE_CLIENT_ID");
const googleClientSecret = getOptionalEnv("GOOGLE_CLIENT_SECRET");

const socialProviders: Record<
  string,
  {
    clientId: string;
    clientSecret: string;
  }
> = {};

if (githubClientId && githubClientSecret) {
  socialProviders.github = {
    clientId: githubClientId,
    clientSecret: githubClientSecret,
  };
}

if (googleClientId && googleClientSecret) {
  socialProviders.google = {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
}

export const auth = betterAuth({
  secret:
    getRequiredEnv("BETTER_AUTH_SECRET", {
      requiredInProduction: true,
    }) ?? "local_dev_secret_change_me",
  baseURL,
  trustedOrigins,
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
  socialProviders,
  plugins: [],
});
