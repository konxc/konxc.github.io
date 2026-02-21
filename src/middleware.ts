import { defineMiddleware } from "astro:middleware";

import { auth } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;
  const isAppRoute = path.startsWith("/app");
  const isAuthRoute = path.startsWith("/api/auth");
  const isLoginOrRegister = path === "/login" || path === "/register";

  if (isAuthRoute) {
    return auth.handler(context.request);
  }

  // Get session for login, register, and app routes so redirects work
  const needSession = isAppRoute || isLoginOrRegister;
  if (needSession) {
    const session = await auth.api.getSession({
      headers: context.request.headers,
    });
    context.locals.session = session ?? undefined;
    context.locals.user = session?.user;

    // Protect /app: redirect to login if not authenticated
    if (isAppRoute && !session) {
      return context.redirect("/login");
    }
    // If already logged in, don't show login/register
    if (isLoginOrRegister && session) {
      return context.redirect("/app");
    }
  }

  return next();
});
