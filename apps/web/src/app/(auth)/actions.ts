"use server";

import { auth } from "@repo/db/auth";
import { redirect } from "next/navigation";
import { loginSchema, signupSchema } from "./schema";

export type FormState = {
  message?: string;
  success?: boolean;
};

const loginCallbackURL = "/dashboard";
const newUserCallbackURL = `${loginCallbackURL}?onboarding=true`;

async function tryAwait<T>(
  promise: Promise<T>
): Promise<[T | null, string | null]> {
  try {
    const res = await promise;
    return [res, null];
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return [null, message];
  }
}

export async function loginWithGoogle() {
  const { url } = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: loginCallbackURL,
      errorCallbackURL: "/login?error=true",
      newUserCallbackURL,
    },
  });

  if (!url) {
    throw new Error("No URL returned from signInSocial");
  }

  redirect(url);
}

export async function signupWithEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { name, email, password } = signupSchema.parse(
    Object.fromEntries(formData)
  );

  const [_res, error] = await tryAwait(
    auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    })
  );

  if (error) {
    return { message: error };
  }

  return { success: true, message: "Signup successful" };
}

export async function loginWithEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { email, password } = loginSchema.parse(Object.fromEntries(formData));
  const [_res, error] = await tryAwait(
    auth.api.signInEmail({ body: { email, password } })
  );

  if (error) {
    return { message: error };
  }

  redirect(loginCallbackURL);
}
