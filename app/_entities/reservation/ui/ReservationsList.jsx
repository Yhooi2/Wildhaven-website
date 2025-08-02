"use client";
import { ReservationCard } from "@/app/_entities/reservation";
import { Text } from "@/app/_components/ui";
import { deleteReservation } from "@/app/_features/reservation/actions";
import { useOptimistic } from "react";

export function ReservationsList({ reservations }) {
  const [optimisticList, setOptimisticList] = useOptimistic(
    reservations,
    (list, id) => {
      return list.filter((reservation) => reservation.id !== id);
    }
  );

  if (optimisticList.length === 0) {
    return <Text>You don&apos;t have any reservations yet</Text>;
  }

  async function handleDelete(id) {
    setOptimisticList(id);
    await deleteReservation(id);
  }

  return (
    <ul className="flex max-w-screen-md flex-col gap-6">
      {optimisticList.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
