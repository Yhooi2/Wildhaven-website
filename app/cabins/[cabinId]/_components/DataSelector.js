"use client";
import { isWithinInterval } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ minBookingLength, maxBookingLength, bookedDates }) {
  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;
  const [range, setRange] = useState({ from: null, to: null });

  const resetRange = () => {
    setRange({ from: null, to: null });
  };

  const classNames = {
    day: "text-center text-primary-300",
    day_button:
      "hover:bg-accent-600 hover:rounded-full  hover:text-primary-800 text-primary-300 w-8 h-8",
    selected: "bg-accent-500 rounded-full text-primary-800",
    disabled: "text-accent-600 opacity-50 cursor-not-allowed",
    range_start: "bg-accent-600 text-primary-800 rounded-full",
    range_end: "bg-accent-600 text-primary-800 rounded-full",
    range_middle: "bg-accent-500",
    month_caption: "font-bold text-lg text-primary-200 text-center mb-3",
    month_grid: "",
    chevron: "fill-primary-200",
    today: "font-bold text-accent-600",
    root: "flex flex-col lg:flex-row min-w-max",
    months: "flex flex-col lg:flex-row gap-4",
  };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-10"
        mode="range"
        selected={range}
        onSelect={setRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        disabled={[{ before: new Date() }]}
        captionLayout="dropdown"
        hideNavigation
        numberOfMonths={2}
        classNames={classNames}
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
