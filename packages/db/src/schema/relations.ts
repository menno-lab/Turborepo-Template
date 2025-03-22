import { relations } from "drizzle-orm";
import { todos } from "./todos";
import { user } from "./auth";

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(user, {
    fields: [todos.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  todos: many(todos),
}));
