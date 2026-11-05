import React, { createContext, useContext, useMemo, useState } from "react";
import { mockBookings } from "../assets/mockData";
import { Booking } from "../types";

interface BookingContextValue {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: React.PropsWithChildren) {
  const [bookings, setBookings] = useState(mockBookings);
  const value = useMemo(
    () => ({
      bookings,
      addBooking: (booking: Booking) => setBookings((previous) => [booking, ...previous]),
      cancelBooking: (bookingId: string) =>
        setBookings((previous) => previous.map((booking) => booking.id === bookingId
          ? { ...booking, status: "cancelled" }
          : booking)),
    }),
    [bookings],
  );
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBookings phải được dùng bên trong BookingProvider");
  return context;
}
