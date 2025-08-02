"use client";
import { Button } from "@/app/_components/ui";
import { useReservation } from "@/app/_features/reservation/context/useReservation";
import { useState } from "react";

export function ReservationFormSubmit({ bookingId, cabinId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { range, setIsUpdating } = useReservation();

  if (!range || !range.startDate || !range.endDate) {
    return (
      <p className="text-base text-primary-300">Start by selecting dates</p>
    );
  }
  const handleSubmit = () => {
    setTimeout(() => {
      setIsSubmitting(true);
      setIsUpdating(true);
    }, 50);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 10000);
  };
  return (
    <>
      <input type="hidden" name="startDate" value={range.startDate} />
      <input type="hidden" name="endDate" value={range.endDate} />
      <input type="hidden" name="cabinId" value={cabinId} />
      {bookingId && <input type="hidden" name="bookingId" value={bookingId} />}
      <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
        {isSubmitting ? (
          bookingId ? (
            <div className="flex items-center gap-4 px-4">
              <div className="size-4 animate-spin rounded-full border-y-2 border-primary-300"></div>
              <span>Updating...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="size-4 animate-spin rounded-full border-y-2 border-primary-300"></div>
              <span>Reserving...</span>
            </div>
          )
        ) : bookingId ? (
          "Update reservation"
        ) : (
          "Reserve now"
        )}
      </Button>
    </>
  );
}
