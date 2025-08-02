"use server";

import { createBooking } from "@/app/_api/data-service";
import { prepareReservationsData } from "@/app/_features/reservation/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReservations(formData) {
  const { bookingData } = await prepareReservationsData(formData);
  console.log(bookingData);
  await createBooking({
    ...bookingData,
    extrasPrice: 0,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  });
  revalidatePath("/");
  redirect("/cabins");
}
