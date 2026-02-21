import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

import * as schema from "./schema";

dotenv.config();

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
