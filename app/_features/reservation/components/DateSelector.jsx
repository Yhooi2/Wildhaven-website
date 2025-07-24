"use client";
import { useReservation } from "../context";
import { differenceInDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import {
  DAY_PICKER_CLASS_NAMES,
  MODIFIERS_CLASS_NAMES,
} from "./DateSelector.styles";
import { PriceDisplay, BookingSummary, ClearButton } from "./ui";
import { calculatePricing } from "../utils";

function DateSelector({
  minBookingLength,
  maxBookingLength,
  bookedDates,
  cabin,
}) {
  const { range, setRange, resetRange, setCabinId } = useReservation();

  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const pricing = calculatePricing(cabin, numNights);

  const handleSelect = (range) => {
    setRange(range);
    setCabinId(cabin.id);
  };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-10"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        excludeDisabled={true}
        selected={range}
        onSelect={handleSelect}
        disabled={[{ before: new Date() }, ...bookedDates]}
        captionLayout="dropdown"
        numberOfMonths={2}
        hideNavigation
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

        <ClearButton range={range} onClear={resetRange} />
      </div>
    </div>
  );
}

export default DateSelector;
