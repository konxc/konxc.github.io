import type { APIRoute } from "astro";
import { and, asc, eq, sql } from "drizzle-orm";

import { db } from "../../db";
import { ensureDatabaseBootstrap } from "../../db/bootstrap";
import { blogCommentLikes, blogComments } from "../../db/schema";
import { getSessionFromRequest } from "../../lib/session";

type CommentRow = {
  id: string;
  postSlug: string;
  parentId: string | null;
  author: string;
  email: string;
  content: string;
  status: string;
  likes: number | null;
  createdAt: Date;
};

function badRequest(message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

function sanitizeCommentOutput(row: CommentRow) {
  return {
    id: row.id,
    postSlug: row.postSlug,
    parentId: row.parentId,
    author: row.author,
    content: row.content,
    likes: row.likes ?? 0,
    timestamp: row.createdAt.toISOString(),
  };
}

async function resolveUserKey(request: Request) {
  const session = await getSessionFromRequest(request);
  if (session?.user?.id) return `user:${session.user.id}`;

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
  const ua = request.headers.get("user-agent") ?? "unknown";
  return `anon:${forwardedFor}:${ua}`.slice(0, 255);
}

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    await ensureDatabaseBootstrap();
    const postSlug = url.searchParams.get("post")?.trim();

    if (!postSlug) return badRequest("Post slug is required");

    const rows = await db
      .select({
        id: blogComments.id,
        postSlug: blogComments.postSlug,
        parentId: blogComments.parentId,
        author: blogComments.author,
        email: blogComments.email,
        content: blogComments.content,
        status: blogComments.status,
        likes: blogComments.likesCount,
        createdAt: blogComments.createdAt,
      })
      .from(blogComments)
      .where(eq(blogComments.postSlug, postSlug))
      .orderBy(asc(blogComments.createdAt));

    const visibleRows = rows.filter((row) => row.status !== "rejected");
    const rootRows = visibleRows.filter((row) => !row.parentId);
    const replies = visibleRows.filter((row) => row.parentId);

    const repliesByParent = new Map<string, ReturnType<typeof sanitizeCommentOutput>[]>();
    for (const reply of replies) {
      if (!reply.parentId) continue;
      const bucket = repliesByParent.get(reply.parentId) ?? [];
      bucket.push(sanitizeCommentOutput(reply));
      repliesByParent.set(reply.parentId, bucket);
    }

    const payload = rootRows.map((root) => ({
      ...sanitizeCommentOutput(root),
      replies: repliesByParent.get(root.id) ?? [],
    }));

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Comments GET Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch comments" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    await ensureDatabaseBootstrap();
    const data = await request.json();
    const postSlug = String(data?.postSlug ?? "").trim();
    const author = String(data?.author ?? "").trim();
    const email = String(data?.email ?? "").trim().toLowerCase();
    const content = String(data?.content ?? "").trim();
    const parentId = String(data?.parentId ?? "").trim() || null;

    if (!postSlug || !author || !email || !content) {
      return badRequest("Missing required fields: postSlug, author, email, content");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return badRequest("Invalid email format");
    if (content.length > 500) {
      return badRequest("Comment content too long (max 500 characters)");
    }

    if (parentId) {
      const parent = await db
        .select({
          id: blogComments.id,
          postSlug: blogComments.postSlug,
        })
        .from(blogComments)
        .where(eq(blogComments.id, parentId))
        .limit(1);
      if (parent.length === 0 || parent[0].postSlug !== postSlug) {
        return badRequest("Invalid parent comment");
      }
    }

    const now = new Date();
    const id = crypto.randomUUID();

    await db.insert(blogComments).values({
      id,
      postSlug,
      parentId,
      author,
      email,
      content,
      status: "approved",
      likesCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    const created = {
      id,
      postSlug,
      parentId,
      author,
      email,
      content,
      timestamp: now.toISOString(),
      likes: 0,
      replies: [],
      status: "approved",
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: "Comment submitted successfully",
        comment: created,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Comments POST Error:", error);
    return new Response(JSON.stringify({ error: "Failed to submit comment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export async function processCommentLike(request: Request) {
  try {
    await ensureDatabaseBootstrap();
    const data = await request.json();
    const id = String(data?.id ?? "").trim();
    const type = String(data?.type ?? "").trim();

    if (!id || !type) return badRequest("Missing required fields: id, type");
    if (!["comment", "reply"].includes(type)) {
      return badRequest('Invalid type. Must be "comment" or "reply"');
    }

    const rows = await db
      .select({ id: blogComments.id })
      .from(blogComments)
      .where(eq(blogComments.id, id))
      .limit(1);
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Comment not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userKey = await resolveUserKey(request);
    const existingLike = await db
      .select({ id: blogCommentLikes.id })
      .from(blogCommentLikes)
      .where(
        and(eq(blogCommentLikes.commentId, id), eq(blogCommentLikes.userKey, userKey)),
      )
      .limit(1);

    if (existingLike.length > 0) {
      await db
        .delete(blogCommentLikes)
        .where(
          and(
            eq(blogCommentLikes.commentId, id),
            eq(blogCommentLikes.userKey, userKey),
          ),
        );
      await db.run(sql`
        UPDATE blog_comments
        SET likes_count = CASE WHEN likes_count > 0 THEN likes_count - 1 ELSE 0 END
        WHERE id = ${id}
      `);
    } else {
      await db.insert(blogCommentLikes).values({
        id: crypto.randomUUID(),
        commentId: id,
        userKey,
        createdAt: new Date(),
      });
      await db.run(sql`
        UPDATE blog_comments
        SET likes_count = likes_count + 1
        WHERE id = ${id}
      `);
    }

    const latest = await db
      .select({ likes: blogComments.likesCount })
      .from(blogComments)
      .where(eq(blogComments.id, id))
      .limit(1);

    return new Response(
      JSON.stringify({
        success: true,
        likes: latest[0]?.likes ?? 0,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Comments LIKE Error:", error);
    return new Response(JSON.stringify({ error: "Failed to like comment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  return processCommentLike(request);
};
