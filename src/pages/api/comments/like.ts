import type { APIRoute } from "astro";

import { processCommentLike } from "../comments";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  return processCommentLike(request);
};
