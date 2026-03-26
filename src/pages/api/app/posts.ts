import type { APIRoute } from "astro";
import { and, desc, eq, inArray, isNull, sql } from "drizzle-orm";

import { db } from "../../../db";
import { ensureDatabaseBootstrap } from "../../../db/bootstrap";
import {
  appPostComments,
  appPostLikes,
  posts,
  profiles,
  users,
} from "../../../db/schema";
import { getSessionFromRequest } from "../../../lib/session";

function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function toDisplayHandle(
  profile: { tagline: string | null } | null,
  fallbackName: string,
) {
  if (profile?.tagline?.trim()) return profile.tagline.trim();
  return `Member @ ${fallbackName}`;
}

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const session = await getSessionFromRequest(request);
  if (!session) return unauthorized();

  await ensureDatabaseBootstrap();

  const postRows = await db
    .select({
      id: posts.id,
      content: posts.content,
      likes: posts.likesCount,
      createdAt: posts.createdAt,
      authorName: users.name,
      authorId: users.id,
      authorTagline: profiles.tagline,
    })
    .from(posts)
    .innerJoin(users, eq(posts.userId, users.id))
    .leftJoin(profiles, eq(users.id, profiles.userId))
    .orderBy(desc(posts.createdAt))
    .limit(50);

  if (postRows.length === 0) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const postIds = postRows.map((row) => row.id);
  const commentCounts = await db
    .select({
      postId: appPostComments.postId,
      count: sql<number>`count(*)`.as("count"),
    })
    .from(appPostComments)
    .where(
      and(inArray(appPostComments.postId, postIds), isNull(appPostComments.parentId)),
    )
    .groupBy(appPostComments.postId);

  const commentCountMap = new Map(
    commentCounts.map((row) => [row.postId, Number(row.count)]),
  );

  const likedRows = await db
    .select({
      postId: appPostLikes.postId,
    })
    .from(appPostLikes)
    .where(
      and(
        inArray(appPostLikes.postId, postIds),
        eq(appPostLikes.userId, session.user.id),
      ),
    );
  const likedSet = new Set(likedRows.map((row) => row.postId));

  const payload = postRows.map((row) => ({
    id: row.id,
    author: row.authorName,
    handle: toDisplayHandle(
      {
        tagline: row.authorTagline,
      },
      row.authorName,
    ),
    content: row.content,
    likes: row.likes ?? 0,
    comments: commentCountMap.get(row.id) ?? 0,
    shares: 0,
    liked: likedSet.has(row.id),
    createdAt: row.createdAt?.toISOString?.() ?? new Date().toISOString(),
    isOwner: row.authorId === session.user.id,
  }));

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const session = await getSessionFromRequest(request);
  if (!session) return unauthorized();

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

  const rawContent =
    typeof data === "object" && data !== null && "content" in data
      ? String((data as { content: unknown }).content ?? "")
      : "";
  const content = rawContent.trim();

  if (content.length < 3) {
    return new Response(
      JSON.stringify({ error: "Konten minimal 3 karakter." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (content.length > 5000) {
    return new Response(
      JSON.stringify({ error: "Konten terlalu panjang (maks. 5000 karakter)." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const now = new Date();
  const id = crypto.randomUUID();

  await db.insert(posts).values({
    id,
    userId: session.user.id,
    content,
    likesCount: 0,
    createdAt: now,
    updatedAt: now,
  });

  const profileRow = await db
    .select({ tagline: profiles.tagline })
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .limit(1);

  return new Response(
    JSON.stringify({
      id,
      author: session.user.name,
      handle: toDisplayHandle(profileRow[0] ?? null, session.user.name),
      content,
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      createdAt: now.toISOString(),
      isOwner: true,
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    },
  );
};
