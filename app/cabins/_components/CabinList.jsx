import { getCabins } from "../../_api/data-service";
import { CabinCard } from "@/app/_entities/cabin";
import { filterCabins } from "@/app/_entities/cabin";
// import { unstable_noStore } from "next/cache";

export async function CabinList({ filter }) {
  // unstable_noStore();

  let cabins = await getCabins();

  if (filter !== "all") {
    const filterCriteria = {};

    switch (filter) {
      case "small":
        filterCriteria.maxCapacity = 3;
        break;
      case "medium":
        filterCriteria.minCapacity = 4;
        filterCriteria.maxCapacity = 6;
        break;
      case "large":
        filterCriteria.minCapacity = 7;
        break;
    }

    cabins = filterCabins(cabins, filterCriteria);
  }

  if (!cabins.length) return null;
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-16">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
