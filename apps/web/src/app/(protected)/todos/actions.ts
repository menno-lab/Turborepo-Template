"use server";

import { trpc } from "@/lib/trpc";
import { todoSchema } from "@repo/db/schema";
import { revalidatePath } from "next/cache";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function createTodo(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  try {
    const parsed = todoSchema.parse(formData);
    await trpc.todo.create(parsed);
    revalidatePath("/todos");
    return { message: "Todo created" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create todo" };
  }
}
