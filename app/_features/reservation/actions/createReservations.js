"use server";

import { auth } from "@/app/_api/auth";
import { createBooking, getGuest } from "@/app/_api/data-service";
import { prepareReservationsData } from "@/app/_features/reservation/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReservations(formData) {
  const { bookingData } = await prepareReservationsData(formData);
  const session = await auth();

  const guest = await getGuest(session.user.email);
  if (!guest) throw new Error("You must be a guest to create a booking");

  await createBooking(bookingData);
  revalidatePath("/");
  redirect("/cabins");
}
