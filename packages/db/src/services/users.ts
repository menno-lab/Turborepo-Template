import { DB } from "..";
import { user } from "../schema";
import { eq } from "drizzle-orm";

export async function getUserById(db: DB, userId: string) {
  return await db.query.user.findFirst({
    where: eq(user.id, userId),
  });
}
