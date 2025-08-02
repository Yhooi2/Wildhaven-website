"use client";

import { SpinnerMini } from "@/app/_components/ui";
import { deleteReservations } from "@/app/_features/reservation/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";

export function ReservationButtonDelete({ id }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Please confirm deletion")) return;
    startTransition(() => deleteReservations(id));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
    >
      {isPending ? (
        <div className="mx-auto flex items-center justify-center">
          <div className="size-6 animate-spin rounded-full border-y-2 border-primary-300"></div>
        </div>
      ) : (
        <>
          <TrashIcon className="size-5 text-primary-600 transition-colors group-hover:text-primary-800" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}
