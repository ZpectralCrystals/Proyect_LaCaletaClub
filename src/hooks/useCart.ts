import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "@/redux/cartSlice";
import type { CartItem } from "@/redux/cartSlice";

export function useCart() {
  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.products);

  const handleIncrement = (id: number) => dispatch(incrementQuantity(id));
  const handleDecrement = (id: number) => dispatch(decrementQuantity(id));
  const handleRemove = (id: number) => dispatch(removeFromCart(id));

  return {
    cartItems,
    handleIncrement,
    handleDecrement,
    handleRemove,
  };
}