"use client";

import { Button } from "@repo/ui/components/button";
import { loginWithGoogle } from "./actions";

export function LoginForm() {
  return (
    <form action={loginWithGoogle}>
      <div className="flex flex-col gap-3">
        <Button className="w-full" type="submit">
          Login with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
