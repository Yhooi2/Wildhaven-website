"use client";
import { useReservation } from "@/app/_context/RecervationProvider";
import { differenceInDays, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

// Constants
const DAY_PICKER_CLASS_NAMES = {
  day: "text-center text-primary-100",
  day_button:
    "hover:bg-accent-600 hover:rounded-full hover:text-primary-800 text-primary-200 w-8 h-8",
  selected: "bg-accent-500 rounded-full text-primary-800",
  disabled: "text-accent-600 opacity-50 cursor-not-allowed",
  month_caption: "font-bold text-lg text-primary-100 text-center mb-3",
  month_grid: "",
  chevron: "fill-primary-100",
  root: "flex flex-col lg:flex-row min-w-max",
  months: "flex flex-col lg:flex-row gap-2",
};

const MODIFIERS_CLASS_NAMES = {
  booked:
    "!bg-red-500/20 !text-red-300 rounded-full line-through cursor-not-allowed",
  range_start:
    "!bg-accent-500 !text-primary-800 !rounded-l-full !rounded-r-none hover:!text-primary-800 focus:!text-primary-800",
  range_end:
    "!bg-accent-500 !text-primary-800 !rounded-r-full !rounded-l-none hover:!text-primary-800 focus:!text-primary-800",
  range_middle:
    "!bg-accent-500 !text-primary-800 !rounded-none hover:!text-primary-800 focus:!text-primary-800",
};

// Helper functions
function isRangeOverlappingBookedDates(range, bookedDates) {
  return (
    range.from &&
    range.to &&
    bookedDates.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function calculatePricing(cabin, numNights) {
  console.log("numNights", numNights);
  console.log("cabin", cabin);
  const regularPrice = cabin?.regularPrice || 0;
  const discount = cabin?.discount || 0;
  const nightlyPrice = regularPrice - discount;
  const totalPrice = numNights * nightlyPrice;

  return {
    regularPrice,
    discount,
    nightlyPrice,
    totalPrice,
  };
}

// Components
function PriceDisplay({ regularPrice, discount, nightlyPrice }) {
  return (
    <p className="flex items-baseline gap-2">
      {discount > 0 ? (
        <>
          <span className="text-2xl">${nightlyPrice}</span>
          <span className="font-semibold text-primary-700 line-through">
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className="text-2xl">${regularPrice}</span>
      )}
      <span>/night</span>
    </p>
  );
}

function BookingSummary({ numNights, totalPrice }) {
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

function ClearButton({ range, onClear }) {
  if (!range.from && !range.to) return null;

  return (
    <button
      className="border border-primary-800 px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary-800 hover:text-accent-500"
      onClick={onClear}
    >
      Clear
    </button>
  );
}

// Main component
function DateSelector({
  minBookingLength,
  maxBookingLength,
  bookedDates,
  cabin,
}) {
  const { range, setRange } = useReservation();

  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const pricing = calculatePricing(cabin, numNights);

  const handleClearRange = () => {
    setRange({ from: undefined, to: undefined });
  };

  return (
    <div className="flex flex-col justify-between">
      {/* Calendar */}
      <DayPicker
        className="place-self-center pt-10"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        excludeDisabled={true}
        selected={range}
        onSelect={setRange}
        disabled={[{ before: new Date() }, ...bookedDates]}
        captionLayout="dropdown"
        numberOfMonths={2}
        classNames={DAY_PICKER_CLASS_NAMES}
        modifiers={{
          booked: bookedDates,
        }}
        modifiersClassNames={MODIFIERS_CLASS_NAMES}
      />

      {/* Pricing Summary */}
      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <PriceDisplay
            regularPrice={pricing.regularPrice}
            discount={pricing.discount}
            nightlyPrice={pricing.nightlyPrice}
          />

          <BookingSummary
            numNights={numNights}
            totalPrice={pricing.totalPrice}
          />
        </div>

        <ClearButton range={range} onClear={handleClearRange} />
      </div>
    </div>
  );
}

export default DateSelector;
