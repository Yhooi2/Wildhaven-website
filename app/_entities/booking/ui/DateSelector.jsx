"use client";
import { useReservation } from "@/app/_features/reservation/context";
import {
  addMonths,
  differenceInDays,
  isBefore,
  isAfter,
  isSameDay,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import {
  DAY_PICKER_CLASS_NAMES,
  MODIFIERS_CLASS_NAMES,
} from "./DateSelector.styles";
import { PriceDisplay, BookingSummary } from "@/app/_entities/booking";
import { ClearButton } from "@/app/_features/reservation/components/ui";
import { calculatePricing } from "@/app/_entities/booking";

export function DateSelector({
  minBookingLength,
  maxBookingLength,
  bookedDates,
  cabin,
  booking,
}) {
  const { range, setRange, resetRange, setCabinId } = useReservation();
  let bookedDatesFiltered = bookedDates;

  if (booking) {
    bookedDatesFiltered = bookedDates.filter(
      (date) =>
        (isBefore(date, booking.startDate) &&
          !isSameDay(date, booking.startDate)) ||
        (isAfter(date, booking.endDate) && !isSameDay(date, booking.endDate))
    );
  }

  const numNights =
    range?.startDate && range?.endDate
      ? differenceInDays(range.endDate, range.startDate)
      : 0;
  const pricing = calculatePricing(cabin, numNights);

  const handleSelect = (range) => {
    setRange({
      startDate: range.from,
      endDate: range.to,
    });
    setCabinId(cabin.id);
  };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="px-2 pt-10"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        excludeDisabled={true}
        selected={{
          from: range.startDate,
          to: range.endDate,
        }}
        onSelect={handleSelect}
        disabled={[{ before: new Date() }, ...bookedDatesFiltered]}
        captionLayout="dropdown"
        numberOfMonths={2}
        hideNavigation
        startMonth={new Date()}
        endMonth={addMonths(new Date(), 12)}
        classNames={DAY_PICKER_CLASS_NAMES}
        modifiers={{
          booked: bookedDatesFiltered,
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
