import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/cartSlice"; // Asegúrate que el path sea correcto

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Debe llamarse "cart" para que RootState.cart.products funcione
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
