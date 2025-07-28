import { getCabins } from "@/app/_api/data-service";

export const revalidate = 3600; // 1 hour

async function CabinsCounter() {
  const counts = await getCabins();
  return <span>{counts.length}</span>;
}

export { CabinsCounter };
