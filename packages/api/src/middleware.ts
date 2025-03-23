import { TRPCError } from "@trpc/server";
import { middleware } from "./init";
import { getUserById } from "./router/user";

/**
 * Middleware to check if the user is authenticated and has a session.
 */
export const authenticatedMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx });
});

/**
 * Middleware to check if the user exists in the database.
 */
export const protectedMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const userId = ctx.session?.user.id;
  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const user = await getUserById(ctx.db, userId);
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, user } });
});
