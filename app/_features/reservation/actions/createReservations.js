"use server";

import { auth } from "@/app/_api/auth";
import { createBooking, getGuest } from "@/app/_api/data-service";

export async function createReservations(formData) {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");
  const guest = await getGuest(session.user.email);
  if (!guest) throw new Error("You must be a guest to create a booking");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const cabinId = formData.get("cabinId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const guestId = Number(session.user.id);
  if (!cabinId || !startDate || !endDate || !guestId) {
    throw new Error("Missing required booking data");
  }

  await createBooking({
    startDate,
    endDate,
    cabinId,
    numGuests,
    observations,
    guestId,
  });
}
