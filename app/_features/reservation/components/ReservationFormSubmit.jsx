"use client";
import { Button, SpinnerMini } from "@/app/_components/ui";
import { useReservation } from "@/app/_features/reservation/context/useReservation";
import { useFormStatus } from "react-dom";

export function ReservationFormSubmit({ bookingId, cabinId }) {
  const { isPending } = useFormStatus();
  const { range } = useReservation();
  if (!range || !range.startDate || !range.endDate) {
    return (
      <p className="text-base text-primary-300">Start by selecting dates</p>
    );
  }
  return (
    <>
      <input type="hidden" name="startDate" value={range.startDate.toISOString()} />
      <input type="hidden" name="endDate" value={range.endDate.toISOString()} />
      <input type="hidden" name="cabinId" value={cabinId} />
      {bookingId && <input type="hidden" name="bookingId" value={bookingId} />}
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <span className="mx-auto">
            <SpinnerMini />
          </span>
        ) : bookingId ? (
          "Update reservation"
        ) : (
          "Reserve now"
        )}
      </Button>
    </>
  );
}
