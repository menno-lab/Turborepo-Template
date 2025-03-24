"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { loginWithEmail } from "./actions";
import { LoginFormData, loginSchema } from "./schema";

export function LoginForm() {
  const [state, submitAction, isPending] = useActionState(loginWithEmail, {
    message: "",
    success: false,
  });

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="space-y-4"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Sign in
        </Button>
        {state?.message && <p className="text-red-500">{state.message}</p>}
      </form>
    </Form>
  );
}
