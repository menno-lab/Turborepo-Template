import { Separator } from "@repo/ui/components/separator";
import Link from "next/link";
import { LoginWithGoogleButton } from "../login-google-form";
import { SignupForm } from "../signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign in
            </Link>
          </p>
        </div>
        <div className="mt-8 space-y-6 bg-muted p-6 rounded-lg shadow-md">
          <SignupForm />
          <Separator className="my-4" />
          <LoginWithGoogleButton />
        </div>
      </div>
    </div>
  );
}
