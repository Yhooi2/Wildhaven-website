"use server";

import { auth } from "@/app/_api/auth";
import { getBookings, getCabin, updateBooking } from "@/app/_api/data-service";
import { calculatePricing } from "@/app/_entities/booking/model/booking-utils";
import { differenceInDays } from "date-fns";

export async function updateReservations(formData) {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");
  const bookingId = formData.get("bookingId");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const cabinId = formData.get("cabinId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const guestId = Number(session.user.id);

  if (!bookingId || !startDate || !endDate || !cabinId || !numGuests)
    throw new Error("All fields are required");

  const [bookings, cabin] = await Promise.all([
    getBookings(guestId),
    getCabin(cabinId),
  ]);

  const bookingToUpdate = bookings.find(
    (booking) => booking.id === Number(bookingId)
  );
  if (!bookingToUpdate)
    throw new Error("You can only update your own bookings");

  const numNights = differenceInDays(new Date(endDate), new Date(startDate));
  const { totalPrice } = calculatePricing(cabin, numNights);

  await updateBooking(bookingId, {
    totalPrice,
    numNights,
    startDate,
    endDate,
    cabinId,
    numGuests,
    observations,
  });
}
