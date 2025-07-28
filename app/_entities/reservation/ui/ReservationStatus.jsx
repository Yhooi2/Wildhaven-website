export function ReservationStatus({ status }) {
  const colorClasses = {
    Past: "bg-yellow-800 text-yellow-200",
    Default: "bg-green-800 text-green-200",
  };

  const style = `flex h-7 items-center rounded-sm px-3 text-xs font-bold uppercase ${
    colorClasses[status] || colorClasses.Default
  }`;
  return <span className={style}>{status}</span>;
}
