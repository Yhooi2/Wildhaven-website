import { format } from "date-fns";

export function ReservationDetails({ totalPrice, numGuests, created_at }) {
  return (
    <div className="mt-auto flex items-baseline gap-5">
      <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
      <p className="text-primary-300">&bull;</p>
      <p className="text-lg text-primary-300">
        {numGuests} guest{numGuests > 1 && "s"}
      </p>
      <p className="ml-auto text-sm text-primary-400">
        Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
      </p>
    </div>
  );
}
