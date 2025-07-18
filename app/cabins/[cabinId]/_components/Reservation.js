import { Container } from "@/app/_components/ui";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import DataSelector from "./DataSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  return (
    <Container className="grid min-h-96 grid-cols-2 ">
      <DataSelector
        minBookingLength={settings.minBookingLength}
        maxBookingLength={settings.maxBookingLength}
        bookedDates={bookedDates}
      />
      <ReservationForm maxCapacity={cabin.maxCapacity} />
    </Container>
  );
}

export default Reservation;
