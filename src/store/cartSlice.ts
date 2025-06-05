import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Tipo de producto en el carrito
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Estado global del carrito
interface CartState {
  products: CartItem[];
}

// Estado inicial vacío
const initialState: CartState = {
  products: [],
};

// Slice de Redux Toolkit para manejar acciones del carrito
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Agregar producto al carrito (o aumentar cantidad si ya existe)
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.products.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    // Aumentar cantidad de un producto
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.products.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    // Disminuir cantidad (mínimo 1)
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.products.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    // Eliminar producto del carrito
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(item => item.id !== action.payload);
    },

    // Vaciar completamente el carrito (opcional)
    clearCart: (state) => {
      state.products = [];
    },
  },
});

// Exportar acciones
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// Exportar reducer
export default cartSlice.reducer;
