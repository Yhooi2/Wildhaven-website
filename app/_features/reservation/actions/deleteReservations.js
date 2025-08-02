"use server";

import { auth } from "@/app/_api/auth";
import { deleteBooking, getBookings } from "@/app/_api/data-service";
import { revalidatePath } from "next/cache";

export async function deleteReservations(id) {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");
  const bookings = await getBookings(session.user.id);
  const booking = bookings.find((booking) => booking.id === id);
  if (!booking) throw new Error("Booking not found");
  await deleteBooking(id);
  revalidatePath("/account/reservations");
}
