import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store"; // ✅ Tipado del estado global de Redux
import { JSX } from "react/jsx-runtime";

/**
 * 🔐 Componente que protege rutas para usuarios autenticados.
 * Si el usuario no está logueado, se redirige automáticamente a /login.
 */
const AuthRoute = (): JSX.Element => {
  // 🔍 Obtenemos el usuario desde Redux (null si no está logueado)
  const user = useSelector((state: RootState) => state.auth.user);

  // ❌ Si no hay usuario autenticado, redirigimos al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Si el usuario está autenticado, se permite acceder a la ruta protegida
  return <Outlet />;
};

export default AuthRoute;
