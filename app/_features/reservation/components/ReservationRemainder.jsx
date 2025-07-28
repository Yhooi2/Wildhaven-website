"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useReservation } from "@/app/_features/reservation/context/useReservation";
import { format } from "date-fns";
import { Icon } from "@/app/_components/ui";
import Link from "next/link";

export function ReservationRemainder() {
  const { range, resetRange, cabinId } = useReservation();
  const { to, from } = range;

  if (!from || !to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-8 rounded-full bg-accent-400 px-8 py-5 text-lg font-semibold text-primary-800 shadow-xl shadow-slate-900">
      <Link className="whitespace-nowrap" href={`/cabins/${cabinId}`}>
        <span>👋 </span>
        <span>Dont forget to reserve your dates</span>
        <br />
        from: {format(from, "MMM dd, yyyy")} to: {format(to, "MMM dd, yyyy")}
      </Link>
      <button onClick={resetRange}>
        <Icon as={XMarkIcon} />
      </button>
    </div>
  );
}
