"use client";
import { SubmitFormButton } from "@/app/_components/ui/SubmitFormButton";
import { useReservation } from "@/app/_features/reservation/context/useReservation";

export function ReservationFormSubmit({ bookingId, cabinId }) {
  const { range, setCabinId } = useReservation();

  if (!range || !range.startDate || !range.endDate) {
    return (
      <p className="text-base text-primary-300">Start by selecting dates</p>
    );
  }
  return (
    <>
      <input type="hidden" name="startDate" value={range.startDate} />
      <input type="hidden" name="endDate" value={range.endDate} />
      <input type="hidden" name="cabinId" value={cabinId} />
      {bookingId && <input type="hidden" name="bookingId" value={bookingId} />}
      <SubmitFormButton
        onClick={() => {
          setCabinId(null);
        }}
        pendingLabel={
          bookingId ? (
            <div className="flex items-center gap-4 px-4">
              <div className="size-4 animate-spin rounded-full border-y-2 border-primary-300"></div>
              <span>Updating...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <div className="size-4 animate-spin rounded-full border-y-2 border-primary-300"></div>
              <span>Reserving...</span>
            </div>
          )
        }
      >
        {bookingId ? "Update reservation" : "Reserve now"}
      </SubmitFormButton>
    </>
  );
}
