import { defineConfig } from "drizzle-kit";

import {
  IS_PRODUCTION,
  getOptionalEnv,
  loadServerEnv,
} from "./src/lib/server-env";

loadServerEnv();

const url =
  getOptionalEnv("TURSO_DATABASE_URL") ??
  (IS_PRODUCTION ? undefined : "file:local.db");

if (!url) {
  throw new Error(
    "[env] TURSO_DATABASE_URL is required for drizzle in production mode.",
  );
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url,
  },
});
