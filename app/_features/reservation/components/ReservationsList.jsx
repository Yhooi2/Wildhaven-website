import { auth } from "@/app/_api/auth";
import { getBookings } from "@/app/_api/data-service";
import { SectionHeading } from "@/app/_components/ui";
import { ReservationCard } from "./";

export async function ReservationsList() {
  const session = await auth();
  const reservations = await getBookings(session.user.id);
  if (reservations.length === 0) {
    return <SectionHeading>You have no reservations</SectionHeading>;
  }
  return (
    <div className="flex flex-col gap-6">
      {reservations.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
}
