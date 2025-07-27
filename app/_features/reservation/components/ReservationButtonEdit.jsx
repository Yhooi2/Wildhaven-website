import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export function ReservationButtonEdit({ id }) {
  return (
    <Link
      href={`/account/reservations/edit/${id}`}
      className="group flex grow items-center gap-2 border-b border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
    >
      <PencilSquareIcon className="size-5 text-primary-600 transition-colors group-hover:text-primary-800" />
      <span className="mt-1">Edit</span>
    </Link>
  );
}
