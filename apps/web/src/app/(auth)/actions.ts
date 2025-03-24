"use server";

import { auth } from "@repo/db/auth";
import { redirect } from "next/navigation";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function loginWithGoogle() {
  const { url } = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/login?error=true",
      newUserCallbackURL: "/dashboard?onboarding=true",
    },
  });
  if (!url) {
    throw new Error("No URL returned from signInSocial");
  }

  redirect(url);
}

export async function signupWithEmail(
  _prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  console.log(formData);
  return { message: "Signup successful" };
}
