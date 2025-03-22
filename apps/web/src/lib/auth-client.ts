import { auth } from "@repo/db/auth";
import { createAuthClient } from "better-auth/react";
import { headers } from "next/headers";

export const authClient = createAuthClient();

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
