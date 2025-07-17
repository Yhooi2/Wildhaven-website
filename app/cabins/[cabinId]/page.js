import { getCabin, getCabins } from "@/app/_lib/data-service";

import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";
import { Icon, Container } from "@/app/_components/ui";

const styleLi = "flex items-center gap-3";

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
      <Container className="mb-24 grid grid-cols-[3fr_4fr] gap-20 border-l-0 p-10 py-3 text-lg">
        <div className="relative -translate-x-3 scale-110 ">
          <Image
            src={cabin.image}
            alt={`${cabin.name} image`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <h3 className="w-[150%] -translate-x-64 bg-primary-950 p-6 pb-1 text-7xl text-accent-100">{`Cabin ${cabin.name}`}</h3>
          <p className="mb-10 text-primary-300">
            <TextExpander>{cabin.description}</TextExpander>
          </p>
          <ul className="flex flex-col gap-4">
            <li className={styleLi}>
              <Icon as={UsersIcon} />
              <span>For up to </span>
              <span className="font-bold">{cabin.maxCapacity} </span>
              <span>guests.</span>
            </li>
            <li className={styleLi}>
              <Icon as={MapPinIcon} />
              <span>
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className={styleLi}>
              <Icon as={EyeSlashIcon} />
              <span>
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div>
        <h2 className="text-center text-5xl font-semibold">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}

export default Page;
