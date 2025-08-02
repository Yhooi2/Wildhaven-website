import { Container } from "@/app/_components/ui";
import { getBookedDatesByCabinId, getSettings } from "@/app/_api/data-service";
import { DateSelector } from "@/app/_entities/booking";
import { ReservationForm } from "@/app/_features/reservation/components/ReservationForm";
import { Protected } from "@/app/_features/auth";

export async function ReservationWidget({ cabin, booking }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  return (
    <Container
      style={{ containerType: "inline-size" }}
      className="grid min-h-96 grid-cols-1 @container xl:max-w-none"
    >
      <div className="grid  grid-cols-1 gap-4 @4xl:grid-cols-2">
        <DateSelector
          minBookingLength={settings.minBookingLength}
          maxBookingLength={settings.maxBookingLength}
          bookedDates={bookedDates}
          cabin={cabin}
          booking={booking}
        />
        <Protected>
          <ReservationForm
            maxCapacity={cabin.maxCapacity}
            booking={booking}
            cabinId={cabin.id}
          />
        </Protected>
      </div>
    </Container>
  );
}
