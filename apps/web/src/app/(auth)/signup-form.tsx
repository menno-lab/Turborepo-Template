"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { AlertCircle } from "lucide-react";
import { Label } from "@repo/ui/components/label";
import { startTransition, useActionState, useRef } from "react";
import { signupWithEmail } from "./actions";
import { useForm } from "react-hook-form";
import { SignupFormData, signupSchema } from "./schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/form";

export function SignupForm() {
  const [state, submitAction, isPending] = useActionState(signupWithEmail, {
    message: "",
  });

  const form = useForm<SignupFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      ...(state?.fields ?? {}),
    },
    resolver: zodResolver(signupSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const validationErrors = Object.values(form.formState.errors).flatMap(
    (error) => error?.message
  );

  const errors = [validationErrors, ...(state.message ?? [])];

  console.log(errors);

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

        <FormField
          control={form.control}
          name="confirmPassword"
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
          Sign up
        </Button>
      </form>
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errors.join(", ")}</AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
