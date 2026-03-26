import type { User } from "better-auth";

import { auth } from "./auth";

type SessionResult = {
  user: User;
};

export async function getSessionFromRequest(
  request: Request,
): Promise<SessionResult | null> {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) return null;
  return { user: session.user };
}
