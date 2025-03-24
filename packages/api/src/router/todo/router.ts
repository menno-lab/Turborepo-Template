import { z } from "zod";
import { createTRPCRouter } from "../../init";
import { protectedProcedure } from "../../procedures";
import { todoSchema, todoUpdateSchema } from "@repo/db/schema";
import {
  createTodo,
  deleteTodo,
  getTodo,
  listTodos,
  updateTodo,
} from "./services";

export const todoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(todoSchema)
    .mutation(async ({ ctx, input }) => {
      const payload = {
        ...input,
        userId: ctx.user.id,
      };
      return await createTodo(ctx.db, payload);
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;

    return await listTodos(ctx.db, userId);
  }),
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await getTodo(ctx.db, userId, input.id);
    }),
  update: protectedProcedure
    .input(todoUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await updateTodo(ctx.db, userId, input.id, input.values);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await deleteTodo(ctx.db, userId, input.id);
    }),
});
