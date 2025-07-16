import { Suspense } from "react";
import Spinner from "./../_components/Spiner";
import CabinList from "./_components/CabinList";
import CabinFilter from "./_components/CabinFilter";

export const metadata = {
  title: "Cabins",
};

export const experimental_ppr = true;

async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams?.capacity || "all";

  return (
    <div>
      <h1 className="mb-5 text-center text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <CabinFilter filter={filter} />
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}

export default Page;
