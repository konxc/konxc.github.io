import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
  url,
  authToken,
});

async function runMigration() {
  try {
    const migrationSQL = readFileSync(
      join(__dirname, "../migrations/0001_add_accounts_timestamps.sql"),
      "utf-8",
    );

    // File berisi beberapa statement ALTER TABLE dipisah dengan ';'
    const statements = migrationSQL
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    for (const statement of statements) {
      const sql = statement.endsWith(";") ? statement : statement + ";";
      console.log("Executing:", sql);
      await client.execute(sql);
    }

    console.log("✅ Migration completed successfully!");
  } catch (error) {
    if (error.message?.includes("duplicate column name")) {
      console.log("⚠️  Columns already exist, skipping migration.");
    } else {
      console.error("❌ Migration failed:", error);
      process.exit(1);
    }
  } finally {
    client.close();
  }
}

runMigration();
