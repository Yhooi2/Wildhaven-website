"use server";

import { signIn } from "@/app/_api/auth";

export async function signInWithProvider(formData) {
  console.log(formData);
  await signIn(formData.get("providerName").toLowerCase(), {
    redirectTo: "/account",
  });
}
