import { user } from "@repo/db/schema";
import { DB } from "@repo/db";
import { eq } from "drizzle-orm";

export async function getUserById(db: DB, id: string) {
  return db.query.user.findFirst({
    where: eq(user.id, id),
  });
}
