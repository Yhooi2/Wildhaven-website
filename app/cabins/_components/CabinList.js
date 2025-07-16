import { getCabins } from "../../_lib/data-service";
import CabinCard from "./CabinCard";
// import { unstable_noStore } from "next/cache";

async function CabinList({ filter }) {
  // unstable_noStore();

  let cabins = await getCabins();

  if (filter !== "all") {
    switch (filter) {
      case "3":
        cabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
        break;
      case "6":
        cabins = cabins.filter(
          (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 6
        );
        break;
      case "12":
        cabins = cabins.filter((cabin) => cabin.maxCapacity >= 7);
        break;
    }
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
export default CabinList;
