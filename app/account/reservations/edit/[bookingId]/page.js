import { SectionHeading, Spinner } from "@/app/_components/ui";
import { ReservationEdit } from "@/app/_features/reservation";
import { Suspense } from "react";

export const metadata = {
  title: "Edit reservation",
};

export const experimental_ppr = true;

async function Page({ params }) {
  const { bookingId } = await params;

  return (
    <div className="max-w-xl xl:max-w-none">
      <SectionHeading>Edit reservation #{bookingId}</SectionHeading>
      <Suspense fallback={<Spinner />}>
        <ReservationEdit bookingId={bookingId} />
      </Suspense>
    </div>
  );
}

export default Page;
