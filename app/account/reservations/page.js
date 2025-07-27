import { SectionHeading, Spinner } from "@/app/_components/ui";
import { ReservationsList } from "@/app/_features/reservation/components";
import { Suspense } from "react";

export const metadata = {
  title: "Resrvations",
};

async function page() {
  return (
    <div>
      <SectionHeading>You reservations</SectionHeading>
      <Suspense fallback={<Spinner />}>
        <ReservationsList />
      </Suspense>
    </div>
  );
}

export default page;
