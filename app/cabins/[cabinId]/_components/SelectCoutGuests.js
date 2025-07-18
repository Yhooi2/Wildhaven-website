function SelectCoutGuests() {
  const maxCapacity = 10;
  return (
    <div className="space-y-2">
      <label htmlFor="numGuests">How many guests?</label>
      <select
        name="numGuests"
        id="numGuests"
        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        required
      >
        <option value="" key="">
          Select number of guests...
        </option>
        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
          <option value={x} key={x}>
            {x} {x === 1 ? "guest" : "guests"}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCoutGuests;
