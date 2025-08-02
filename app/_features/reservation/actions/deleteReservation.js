"use server";

import { deleteBooking, getBookings } from "@/app/_api/data-service";
import { validateGuest } from "@/app/_features/reservation/utils";
import { revalidatePath } from "next/cache";

export async function deleteReservation(id) {
  const guestId = await validateGuest();
  const bookings = await getBookings(guestId);
  const booking = bookings.find((booking) => booking.id === id);
  if (!booking) throw new Error("Booking not found");
  await deleteBooking(id);
  revalidatePath("/account/reservations");
}
