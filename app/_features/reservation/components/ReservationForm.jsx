import { GuestSelector } from "@/app/_entities/booking";
import { AuthHeader } from "@/app/_features/auth";
import {
  createReservations,
  updateReservations,
} from "@/app/_features/reservation/actions";
import { ReservationFormSubmit } from "./ReservationFormSubmit";

export function ReservationForm({ maxCapacity, booking, cabinId }) {
  const isEdit = !!booking;
  return (
    <div>
      <div className="flex items-center justify-between gap-4 bg-primary-800 px-16 py-3 text-primary-300">
        <p>Logged in as</p>
        <AuthHeader withName={true} />
      </div>

      <form
        action={isEdit ? updateReservations : createReservations}
        className="flex flex-col justify-between gap-5 bg-primary-900 px-16 py-10"
      >
        <GuestSelector
          maxCapacity={maxCapacity}
          numGuests={booking?.numGuests}
        />
        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={isEdit ? booking.observations : ""}
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <ReservationFormSubmit
            bookingId={isEdit ? booking.id : null}
            cabinId={cabinId}
          />
        </div>
      </form>
    </div>
  );
}
