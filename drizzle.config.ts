import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load appropriate .env file
const envPath = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envPath });
dotenv.config({ path: ".env.local", override: true });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || "file:local.db",
  },
});
