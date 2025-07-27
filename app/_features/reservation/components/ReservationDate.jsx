import { format, isToday, parseISO, formatDistance } from "date-fns";

const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export function ReservationDate({ startDate, endDate }) {
  return (
    <p className="text-lg text-primary-300">
      {format(new Date(startDate), "EEE, MMM dd yyyy")} (
      {isToday(new Date(startDate))
        ? "Today"
        : formatDistanceFromNow(startDate)}
      ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
    </p>
  );
}
