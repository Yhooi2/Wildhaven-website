"use server";

import { createBooking } from "@/app/_api/data-service";
import { prepareReservationsData } from "@/app/_features/reservation/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReservations(formData) {
  const { bookingData } = await prepareReservationsData(formData);
  await createBooking(bookingData);
  revalidatePath("/");
  redirect("/cabins");
}
