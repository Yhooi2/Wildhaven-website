"use server";

import { getBookings, updateBooking } from "@/app/_api/data-service";
import { prepareReservationsData } from "@/app/_features/reservation/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateReservations(formData) {
  const { bookingData, bookingId } = await prepareReservationsData(
    formData,
    true
  );

  const bookings = await getBookings(bookingData.guestId);
  const bookingToUpdate = bookings.find(
    (booking) => booking.id === Number(bookingId)
  );
  if (!bookingToUpdate)
    throw new Error("You can only update your own bookings");

  await updateBooking(bookingId, bookingData);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}
