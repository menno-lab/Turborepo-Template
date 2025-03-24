import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { z } from "zod";

export const todos = pgTable("todos", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  userId: text("user_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const todoSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const todoUpdateSchema = z.object({
  id: z.number(),
  values: todoSchema.partial().extend({
    completed: z.boolean().optional(),
  }),
});

export type TodoInsert = z.infer<typeof todoSchema>;
export type Todo = typeof todos.$inferSelect;
