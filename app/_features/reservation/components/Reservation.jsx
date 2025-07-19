import { Container } from "@/app/_components/ui";
import { getBookedDatesByCabinId, getSettings } from "@/app/_api/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  return (
    <Container className="grid min-h-96 grid-cols-2 ">
      <DateSelector
        minBookingLength={settings.minBookingLength}
        maxBookingLength={settings.maxBookingLength}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm maxCapacity={cabin.maxCapacity} />
    </Container>
  );
}

export default Reservation;
