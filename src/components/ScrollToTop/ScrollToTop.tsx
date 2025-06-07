import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 📦 Componente que fuerza el scroll al tope de la página 
 * cada vez que cambia la ruta (`pathname`).
 */
const ScrollToTop = () => {
  // 🔍 Hook de React Router que proporciona la ruta actual
  const { pathname } = useLocation();

  useEffect(() => {
    // 🧭 Al cambiar la ruta, se hace scroll automático al tope
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); // ✅ Se ejecuta cada vez que `pathname` cambia

  // ❌ No renderiza ningún elemento en pantalla
  return null;
};

export default ScrollToTop;
