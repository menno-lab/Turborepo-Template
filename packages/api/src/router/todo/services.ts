import { DB } from "@repo/db";
import { Todo, TodoInsert, todos } from "@repo/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function createTodo(db: DB, values: TodoInsert) {
  const created = await db.insert(todos).values(values).returning();
  const res = created[0];
  if (!res) {
    throw new Error("Failed to create project");
  }
  return res;
}

export async function listTodos(db: DB, userId: string) {
  return await db.query.todos.findMany({
    where: eq(todos.userId, userId),
    orderBy: [desc(todos.createdAt)],
  });
}

export async function getTodo(db: DB, userId: string, id: number) {
  return await db.query.todos.findFirst({
    where: and(eq(todos.id, id), eq(todos.userId, userId)),
  });
}

export async function updateTodo(
  db: DB,
  userId: string,
  id: number,
  values: Partial<Todo>
) {
  return await db
    .update(todos)
    .set(values)
    .where(and(eq(todos.id, id), eq(todos.userId, userId)))
    .returning();
}

export async function deleteTodo(db: DB, userId: string, id: number) {
  return await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, userId)));
}
