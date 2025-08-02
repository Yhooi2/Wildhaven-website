import { SectionHeading, Spinner } from "@/app/_components/ui";
import { ReservationsList } from "@/app/_entities/reservation";
import { Suspense } from "react";
import { auth } from "@/app/_api/auth";
import { getBookings } from "@/app/_api/data-service";
export const metadata = {
  title: "Resrvations",
};

async function page() {
  const session = await auth();
  const reservations = await getBookings(session.user.id);

  return (
    <div>
      <SectionHeading>You reservations</SectionHeading>
      <Suspense fallback={<Spinner />}>
        <ReservationsList reservations={reservations} />
      </Suspense>
    </div>
  );
}

export default page;
