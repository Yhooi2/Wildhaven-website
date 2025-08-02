import { Container } from "@/app/_components/ui";
import { isPast } from "date-fns";
import Image from "next/image";
import { ReservationDate } from "@/app/_features/reservation/components/ReservationDate";
import { ReservationDetails } from "@/app/_features/reservation/components/ReservationDetails";
import { ReservationStatus } from "@/app/_entities/reservation";
import { ReservationButtonEdit } from "@/app/_features/reservation/components/ReservationButtonEdit";
import { ReservationButtonDelete } from "@/app/_features/reservation/components/ReservationButtonDelete";

export function ReservationCard({ reservation, onDelete }) {
  const {
    id,
    cabins,
    numNights,
    startDate,
    endDate,
    totalPrice,
    numGuests,
    created_at,
  } = reservation;
  const status = isPast(new Date(startDate)) ? "Past" : "Upcoming";
  return (
    <Container className="flex">
      <div className="relative w-32">
        <Image
          src={cabins.image}
          alt={cabins.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="border-r border-primary-800 object-cover"
        />
      </div>
      <div className="flex grow flex-col gap-3 p-3 px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {cabins.name}
          </h3>
          <ReservationStatus status={status} />
        </div>
        <ReservationDate startDate={startDate} endDate={endDate} />
        <ReservationDetails
          totalPrice={totalPrice}
          numGuests={numGuests}
          created_at={created_at}
        />
      </div>
      <div className="flex w-[100px] flex-col border-l border-primary-800">
        {!isPast(new Date(startDate)) && (
          <>
            <ReservationButtonEdit id={id} />
            <ReservationButtonDelete id={id} onDelete={onDelete} />
          </>
        )}
      </div>
    </Container>
  );
}
