import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Container, Text, Icon } from "../../_components/ui";

export function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <Container className="flex">
      <div className="relative flex-1">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="border-r border-primary-800 object-cover"
        />
      </div>
      <div className="grow">
        <div className="bg-primary-950 px-7 pb-4 pt-5">
          <h3 className="mb-3 text-2xl font-semibold text-accent-500">
            Cabin {name}
          </h3>
          <div className="mb-2 flex items-center gap-2">
            <Icon as={UsersIcon} />
            <Text>
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </Text>
          </div>
          <p className="flex items-baseline justify-end gap-3">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>
        <div className="border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="inline-block border-l border-primary-800 px-6 py-4 transition-colors hover:bg-accent-600 hover:text-primary-900"
          >
            Details & reservation &rarr;{" "}
          </Link>
        </div>
      </div>
    </Container>
  );
}
