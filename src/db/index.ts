import path from "node:path";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import * as schema from "./schema";
import {
  IS_PRODUCTION,
  getOptionalEnv,
  loadServerEnv,
  validateServerRuntimeEnv,
} from "../lib/server-env";

loadServerEnv();
validateServerRuntimeEnv();

const rawUrl =
  getOptionalEnv("TURSO_DATABASE_URL") ??
  (IS_PRODUCTION
    ? undefined
    : "file:local.db");

// Convert relative file: path to absolute if it starts with file:
let url = rawUrl;
if (!IS_PRODUCTION && rawUrl?.startsWith("file:")) {
  const relativePath = rawUrl.replace("file:", "");
  const absolutePath = path.resolve(process.cwd(), relativePath);
  url = `file:${absolutePath}`;
}

console.log("[db] Using raw database URL:", rawUrl);
console.log("[db] Resolved database URL:", url);

if (!url) {
  throw new Error(
    "[env] TURSO_DATABASE_URL is required in production (example: libsql://<db>.turso.io)",
  );
}

const authToken = getOptionalEnv("TURSO_AUTH_TOKEN");

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
