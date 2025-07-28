"use server";

import { auth } from "@/app/_api/auth";
import { updateGuest } from "@/app/_api/data-service";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData) {
  const session = await auth();
  const arr = formData.get("nationality").split("%");
  const [nationality, countryFlag] = arr.length === 2 ? arr : ["", ""];
  const nationalID = formData.get("nationalID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("National ID number must be 6-12 characters long");
  }
  if (nationality || countryFlag || nationalID) {
    await updateGuest(session.user.id, {
      nationality,
      countryFlag,
      nationalID,
    });
  }
  revalidatePath("/account/profile");
}
