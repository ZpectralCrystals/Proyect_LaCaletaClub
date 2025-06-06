import { useMemo } from "react";
import type { CartItem } from "@/redux/cartSlice";

export function useCartTotals(cartItems: CartItem[]) {
  const totalUnits = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );
  return { totalUnits, subtotal };
}