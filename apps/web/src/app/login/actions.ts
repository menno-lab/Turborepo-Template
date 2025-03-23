"use server";

import { auth } from "@repo/db/auth";
import { redirect } from "next/navigation";

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
