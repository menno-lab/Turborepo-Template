import { expect, test } from "@playwright/test";
import { todos, user } from "@repo/db/schema";
import { db } from "@repo/db";
import { auth } from "@repo/db/auth";
import { eq } from "drizzle-orm";

test("cleanup db", async ({ page }) => {
  const storageState = await page.context().storageState();
  const headers = new Headers();
  storageState.cookies.forEach((cookie) => {
    headers.append("Cookie", cookie.name + "=" + cookie.value);
  });
  const session = await auth.api.getSession({
    headers,
  });

  expect(session).toBeDefined();

  const dbUser = await db.query.user.findFirst({
    where: eq(user.id, session!.user.id),
  });

  expect(dbUser).toBeDefined();

  await db.delete(todos).where(eq(todos.userId, dbUser!.id));
  await db.delete(user).where(eq(user.id, session!.user.id));
});
