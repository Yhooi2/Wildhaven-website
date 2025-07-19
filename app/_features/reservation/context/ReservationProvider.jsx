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

  return (
    <ReservationContext.Provider value={{ range, setRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
