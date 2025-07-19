"use client";
import { createContext } from "react";
import { useState } from "react";

export const ReservationContext = createContext();

const initialState = {
  from: undefined,
  to: undefined,
};

export default function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const [cabinId, setCabinId] = useState(null);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider
      value={{ range, setRange, resetRange, cabinId, setCabinId }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
