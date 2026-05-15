import { createContext, useContext, useState, type ReactNode } from "react";

const Ctx = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
  openBooking: () => void;
}>({
  open: false,
  setOpen: () => {},
  openBooking: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ open, setOpen, openBooking: () => setOpen(true) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useBooking = () => useContext(Ctx);
