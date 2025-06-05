  // cuando queramos obtener la session llamemos setLoading
  // AppDispatch es el tipo de dispatch de Redux, lo importas desde tu store
  // Ejemplo de definición en tu store (src/redux/store.ts):
  import { configureStore } from '@reduxjs/toolkit';
  import authReducer from './authSlice';
  
  export const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
  
  export type AppDispatch = typeof store.dispatch;