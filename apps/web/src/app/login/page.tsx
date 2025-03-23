import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to your account with Google
            </p>
          </div>
          <div className="space-y-4">
            <LoginForm />
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account? Sign in with Google to create one.
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
