import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // tu slice de auth
import cartReducer from './cartSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
