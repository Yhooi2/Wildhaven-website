import { Container } from "@/app/_components/ui";
import { getBookedDatesByCabinId, getSettings } from "@/app/_api/data-service";
import { DateSelector } from "@/app/_entities/booking";
import { ReservationForm } from "./ReservationForm";
import { Protected } from "../../auth";

export async function ReservationWidget({ cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  return (
    <Container className="grid min-h-96 grid-cols-1 lg:grid-cols-2 ">
      <DateSelector
        minBookingLength={settings.minBookingLength}
        maxBookingLength={settings.maxBookingLength}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <Protected>
        <ReservationForm maxCapacity={cabin.maxCapacity} />
      </Protected>
    </Container>
  );
}
