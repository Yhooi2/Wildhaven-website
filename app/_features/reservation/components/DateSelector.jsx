"use client";
import { useReservation } from "@/app/_context/RecervationProvider";
import { differenceInDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import {
  DAY_PICKER_CLASS_NAMES,
  MODIFIERS_CLASS_NAMES,
} from "./DateSelector.styles";
import { PriceDisplay, BookingSummary, ClearButton } from "./ui";
import { calculatePricing } from "../utils";

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
