import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load .env and .env.local for Drizzle CLI tools
dotenv.config();
dotenv.config({ path: ".env.local", override: true });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || "file:local.db",
  },
});
