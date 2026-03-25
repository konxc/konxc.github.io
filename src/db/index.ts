import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

import * as schema from "./schema";

// Load appropriate .env file based on environment
const envPath = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envPath });
dotenv.config({ path: ".env.local", override: true });

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
