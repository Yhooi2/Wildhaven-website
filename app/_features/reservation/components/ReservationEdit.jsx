import { getBooking, getCabin } from "@/app/_api/data-service";
import {
  ReservationProvider,
  ReservationWidget,
} from "@/app/_features/reservation";

export async function ReservationEdit({ bookingId }) {
  const booking = await getBooking(bookingId);
  const cabin = await getCabin(booking.cabinId);
  return (
    <ReservationProvider
      initialBooking={{
        startDate: booking.startDate,
        endDate: booking.endDate,
      }}
    >
      <ReservationWidget cabin={cabin} booking={booking} />
    </ReservationProvider>
  );
}
