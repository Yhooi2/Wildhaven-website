export function BookingSummary({ numNights, totalPrice }) {
  if (!numNights) return null;

  return (
    <>
      <p className="bg-accent-600 px-3 py-2 text-2xl">
        <span>&times;</span> <span>{numNights}</span>
      </p>
      <p>
        <span className="text-lg font-bold uppercase">Total</span>{" "}
        <span className="text-2xl font-semibold">${totalPrice}</span>
      </p>
    </>
  );
}
