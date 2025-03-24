"use server";

import { trpc } from "@/lib/trpc";
import { Todo, todoSchema, todoUpdateSchema } from "@repo/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function createTodoFormAction(
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
  } finally {
    redirect("/todos");
  }
}

export async function updateTodoFormAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  try {
    const parsed = todoUpdateSchema.parse(formData);
    await trpc.todo.update(parsed);
    revalidatePath("/todos");
    return { message: "Todo updated" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create todo" };
  } finally {
    redirect("/todos");
  }
}

export async function toggleTodoDone(todo: Todo) {
  await trpc.todo.update({
    id: todo.id,
    values: {
      completed: !todo.completed,
    },
  });
  revalidatePath("/todos");
}

export async function deleteTodo(todo: Todo) {
  await trpc.todo.delete({
    id: todo.id,
  });
  revalidatePath("/todos");
}
