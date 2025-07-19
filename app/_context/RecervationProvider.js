"use client";
import { createContext, useContext } from "react";
import { useState } from "react";

const ReservationContext = createContext();

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

export function useReservation() {
  return useContext(ReservationContext);
}
