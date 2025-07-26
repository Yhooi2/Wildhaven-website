"use server";

import { signIn, signOut } from "@/app/_api/auth";

export async function signInWithProvider(formData) {
  await signIn(formData.get("providerName"), {
    redirectTo: "/account",
  });
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}
