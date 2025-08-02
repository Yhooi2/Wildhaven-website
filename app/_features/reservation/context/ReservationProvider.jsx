"use client";
import { createContext } from "react";
import { useState } from "react";

export const ReservationContext = createContext();

const initialState = {
  startDate: undefined,
  endDate: undefined,
};

export function ReservationProvider({ children, initialBooking = {} }) {
  const [range, setRange] = useState(
    initialBooking && initialBooking.startDate && initialBooking.endDate
      ? initialBooking
      : initialState
  );
  const [cabinId, setCabinId] = useState(null);
  const resetRange = () => {
    setRange(initialState);
    setCabinId(null);
  };

  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
        cabinId,
        setCabinId,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
