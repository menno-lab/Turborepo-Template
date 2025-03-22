import "server-only";

import { auth } from "@repo/db/auth";
import { db } from "@repo/db";
import { headers } from "next/headers";
import { cache } from "react";
import { appRouter } from "@repo/api/router";

const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return { session, db };
});

export const trpc = appRouter.createCaller(createTRPCContext);
