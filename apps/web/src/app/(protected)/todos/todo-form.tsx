"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { X } from "lucide-react";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { Todo, todoSchema } from "@repo/db/schema";
import { createTodo } from "./actions";

export function TodoForm() {
  const [state, submitAction, isPending] = useActionState(createTodo, {
    message: "",
  });

  const form = useForm<Todo>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      ...(state?.fields ?? {}),
    },
  });

  return (
    <Form {...form}>
      {state?.message !== "" && !state.issues && (
        <div className="text-red-500">{state.message}</div>
      )}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                <X fill="red" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form className="space-y-8" action={submitAction}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
