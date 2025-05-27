import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { supabase } from "@/services/supabase";
import App from "./App";
import "./App.css";
import { setUser } from "@/redux/authSlice";
import type { Session } from "@supabase/supabase-js"; // Tipado para la sesión

// Listener de Supabase con tipado correcto
supabase.auth.onAuthStateChange((event: string, session: Session | null) => {
  store.dispatch(setUser(session?.user || null));
});

// Aseguramos que el elemento root existe
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("No se encontró el elemento #root");

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
