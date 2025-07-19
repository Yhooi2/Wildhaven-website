import { getCabin, getCabins } from "@/app/_api/data-service";

import { SectionHeading, Spinner } from "@/app/_components/ui";
import { Suspense } from "react";
import { Cabin } from "./_components";
import { Reservation } from "@/app/_features/reservation";

export const experimental_ppr = true;
export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  return {
    title: `${cabin.name} - Cabin`,
    description: cabin.description,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
}

async function Page({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />
      <div>
        <SectionHeading className="text-center !text-5xl">
          Reserve {cabin.name} today. Pay on arrival.
        </SectionHeading>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
