import { sql } from "drizzle-orm";

import { db } from "./index";

let bootstrapped = false;

export async function ensureDatabaseBootstrap() {
  if (bootstrapped) return;

  await db.run(sql`PRAGMA foreign_keys = ON;`);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS app_post_comments (
      id text PRIMARY KEY NOT NULL,
      post_id text NOT NULL,
      user_id text NOT NULL,
      parent_id text,
      content text NOT NULL,
      likes_count integer DEFAULT 0,
      created_at integer DEFAULT (unixepoch()) NOT NULL,
      updated_at integer DEFAULT (unixepoch()) NOT NULL,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE cascade,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE cascade,
      FOREIGN KEY (parent_id) REFERENCES app_post_comments(id) ON DELETE cascade
    );
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS app_post_likes (
      id text PRIMARY KEY NOT NULL,
      post_id text NOT NULL,
      user_id text NOT NULL,
      created_at integer DEFAULT (unixepoch()) NOT NULL,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE cascade,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE cascade
    );
  `);

  await db.run(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS app_post_likes_post_user_unique
    ON app_post_likes(post_id, user_id);
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS blog_comments (
      id text PRIMARY KEY NOT NULL,
      post_slug text NOT NULL,
      parent_id text,
      author text NOT NULL,
      email text NOT NULL,
      content text NOT NULL,
      status text DEFAULT 'approved' NOT NULL,
      likes_count integer DEFAULT 0,
      created_at integer DEFAULT (unixepoch()) NOT NULL,
      updated_at integer DEFAULT (unixepoch()) NOT NULL,
      FOREIGN KEY (parent_id) REFERENCES blog_comments(id) ON DELETE cascade
    );
  `);

  await db.run(sql`
    CREATE INDEX IF NOT EXISTS blog_comments_post_slug_idx
    ON blog_comments(post_slug);
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS blog_comment_likes (
      id text PRIMARY KEY NOT NULL,
      comment_id text NOT NULL,
      user_key text NOT NULL,
      created_at integer DEFAULT (unixepoch()) NOT NULL,
      FOREIGN KEY (comment_id) REFERENCES blog_comments(id) ON DELETE cascade
    );
  `);

  await db.run(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS blog_comment_likes_comment_user_unique
    ON blog_comment_likes(comment_id, user_key);
  `);

  bootstrapped = true;
}
