"use server";

import { getCabin } from "@/app/_api/data-service";
import { validateGuest } from "@/app/_features/reservation/utils";
import { differenceInDays } from "date-fns";

export async function prepareReservationsData(
  formData,
  requireBookingId = false
) {
  // Authenticate user
  const guestId = Number(await validateGuest());
  // Extract form data
  const bookingId = formData.get("bookingId");
  const startDate = new Date(formData.get("startDate"));
  const endDate = new Date(formData.get("endDate"));
  const cabinId = formData.get("cabinId");
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  // Validate required fields
  const requiredFields = [startDate, endDate, cabinId, numGuests];
  if (requireBookingId) requiredFields.push(bookingId);
  if (requiredFields.some((field) => !field)) {
    throw new Error("All required fields must be provided");
  }

  // Fetch cabin and calculate booking details
  const cabin = await getCabin(cabinId);
  const numNights = differenceInDays(new Date(endDate), new Date(startDate));
  const { regularPrice: cabinPrice } = cabin;
  const totalPrice = cabinPrice * numNights;

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
      cabinPrice,
    },
    bookingId,
  };
}
