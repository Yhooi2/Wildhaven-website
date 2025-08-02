"use server";

import { auth } from "@/app/_api/auth";
import { getCabin } from "@/app/_api/data-service";
import { calculatePricing } from "@/app/_entities/booking/model/booking-utils";
import { differenceInDays } from "date-fns";

export async function prepareReservationsData(
  formData,
  requireBookingId = false
) {
  // Authenticate user
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  // Extract form data
  const bookingId = formData.get("bookingId");
  const startDate = new Date(formData.get("startDate"));
  const endDate = new Date(formData.get("endDate"));
  const cabinId = formData.get("cabinId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const guestId = Number(session.user.id);

  // Validate required fields
  const requiredFields = [startDate, endDate, cabinId, numGuests];
  if (requireBookingId) requiredFields.push(bookingId);
  if (requiredFields.some((field) => !field)) {
    throw new Error("All required fields must be provided");
  }

  // Fetch cabin and calculate booking details
  const cabin = await getCabin(cabinId);
  const numNights = differenceInDays(new Date(endDate), new Date(startDate));
  const { totalPrice } = calculatePricing(cabin, numNights);

  // Return booking data
  return {
    bookingData: {
      startDate,
      endDate,
      cabinId,
      numGuests,
      observations,
      guestId,
      totalPrice,
      numNights,
    },
    bookingId,
  };
}
