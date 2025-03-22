import { z } from "zod";
import { createTodo, getTodo, listTodos, updateTodo } from "@repo/db/services";
import { createTRPCRouter } from "../../init";
import { protectedProcedure } from "../../procedures";
import { todoSchema } from "@repo/db/schema";

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
    .input(z.object({ id: z.number(), values: todoSchema.partial() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await updateTodo(ctx.db, userId, input.id, input.values);
    }),
});
