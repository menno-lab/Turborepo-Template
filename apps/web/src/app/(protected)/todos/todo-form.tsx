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
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Todo, TodoInsert, todoSchema } from "@repo/db/schema";
import { TodoFormAction } from "./actions";

interface TodoFormProps {
  formAction: TodoFormAction;
  defaultValues?: Todo;
}

export function TodoForm({ formAction, defaultValues }: TodoFormProps) {
  const [state, submitAction, isPending] = useActionState(formAction, {
    message: "",
  });

  const form = useForm<TodoInsert>({
    defaultValues: defaultValues ?? {
      title: "",
      ...(state?.fields ?? {}),
    },
    resolver: zodResolver(todoSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

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
      <form
        ref={formRef}
        className="space-y-8"
        action={submitAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            startTransition(() => submitAction(new FormData(formRef.current!)));
          })(evt);
        }}
      >
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
          {isPending ? "Submitting..." : "Create Todo"}
        </Button>
      </form>
    </Form>
  );
}
