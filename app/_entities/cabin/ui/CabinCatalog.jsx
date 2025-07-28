import { Suspense } from "react";
import { Spinner } from "@/app/_components/ui";
import { CabinFilter } from "@/app/cabins/_components/CabinFilter";
import { CabinList } from "@/app/cabins/_components/CabinList";
import { ReservationRemainder } from "@/app/_features/reservation/components";

export function CabinCatalog({ filter }) {
  return (
    <div>
      <CabinFilter filter={filter} />
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationRemainder />
      </Suspense>
    </div>
  );
}
