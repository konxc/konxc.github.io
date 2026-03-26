import type { APIRoute } from "astro";
import { and, eq, sql } from "drizzle-orm";

import { db } from "../../../../db";
import { ensureDatabaseBootstrap } from "../../../../db/bootstrap";
import { appPostLikes, posts } from "../../../../db/schema";
import { getSessionFromRequest } from "../../../../lib/session";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await ensureDatabaseBootstrap();

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const postId =
    typeof data === "object" && data !== null && "postId" in data
      ? String((data as { postId: unknown }).postId ?? "").trim()
      : "";

  if (!postId) {
    return new Response(JSON.stringify({ error: "postId is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const postRows = await db.select({ id: posts.id }).from(posts).where(eq(posts.id, postId)).limit(1);
  if (postRows.length === 0) {
    return new Response(JSON.stringify({ error: "Post not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const existingLike = await db
    .select({ id: appPostLikes.id })
    .from(appPostLikes)
    .where(and(eq(appPostLikes.postId, postId), eq(appPostLikes.userId, session.user.id)))
    .limit(1);

  let liked = false;
  if (existingLike.length > 0) {
    await db
      .delete(appPostLikes)
      .where(
        and(eq(appPostLikes.postId, postId), eq(appPostLikes.userId, session.user.id)),
      );

    await db.run(sql`
      UPDATE posts
      SET likes_count = CASE WHEN likes_count > 0 THEN likes_count - 1 ELSE 0 END
      WHERE id = ${postId}
    `);
  } else {
    liked = true;
    await db.insert(appPostLikes).values({
      id: crypto.randomUUID(),
      postId,
      userId: session.user.id,
      createdAt: new Date(),
    });
    await db.run(sql`
      UPDATE posts
      SET likes_count = likes_count + 1
      WHERE id = ${postId}
    `);
  }

  const latest = await db
    .select({ likes: posts.likesCount })
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  return new Response(
    JSON.stringify({
      success: true,
      liked,
      likes: latest[0]?.likes ?? 0,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};
